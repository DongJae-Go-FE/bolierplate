import * as fs from "fs";
import path from "path";

interface SwagerAPISchema {
  type?: string;
  format?: string;
  properties?: Record<string, SwagerAPISchema>;
  items?: SwagerAPISchema;
  $ref?: string;
  required?: string[];
  nullable?: boolean;
}

interface SwagerAPIResponse {
  description?: string;
  content?: Record<string, { schema?: SwagerAPISchema }>;
}

interface SwagerAPIOperation {
  tags?: string[];
  requestBody?: {
    content?: Record<string, { schema?: SwagerAPISchema }>;
  };
  responses?: Record<string, SwagerAPIResponse>;
  parameters?: Array<{ schema?: SwagerAPISchema }>;
}

interface SwagerAPIPath {
  get?: SwagerAPIOperation;
  post?: SwagerAPIOperation;
  put?: SwagerAPIOperation;
  patch?: SwagerAPIOperation;
  delete?: SwagerAPIOperation;
}

interface SwagerAPIDoc {
  tags?: Array<{ name: string }>;
  paths?: Record<string, SwagerAPIPath>;
  components?: {
    schemas?: Record<string, SwagerAPISchema>;
  };
}

function getAllRefs(
  schema: SwagerAPISchema | undefined,
  refs: Set<string> = new Set(),
): Set<string> {
  if (!schema) return refs;

  if (schema.$ref) {
    const refName = schema.$ref.split("/").pop()!;
    refs.add(refName);
  }
  if (schema.properties) {
    Object.values(schema.properties).forEach((prop) => getAllRefs(prop, refs));
  }
  if (schema.items) {
    getAllRefs(schema.items, refs);
  }
  return refs;
}

function getRefsFromOperation(
  operation: SwagerAPIOperation | undefined,
): Set<string> {
  const refs = new Set<string>();
  if (!operation) return refs;

  if (operation.requestBody?.content) {
    Object.values(operation.requestBody.content).forEach((content) => {
      getAllRefs(content.schema, refs);
    });
  }

  if (operation.responses) {
    Object.values(operation.responses).forEach((response) => {
      if (response.content) {
        Object.values(response.content).forEach((content) => {
          getAllRefs(content.schema, refs);
        });
      }
    });
  }

  if (operation.parameters) {
    operation.parameters.forEach((param) => {
      getAllRefs(param.schema, refs);
    });
  }

  return refs;
}

function mapSchemasToTags(doc: SwagerAPIDoc): Map<string, Set<string>> {
  const tagSchemaMap = new Map<string, Set<string>>();
  const schemas = doc.components?.schemas || {};

  doc.tags?.forEach((tag) => {
    tagSchemaMap.set(tag.name.toLowerCase(), new Set());
  });

  if (doc.paths) {
    for (const pathItem of Object.values(doc.paths)) {
      const methods: (keyof SwagerAPIPath)[] = [
        "get",
        "post",
        "put",
        "patch",
        "delete",
      ];

      for (const method of methods) {
        const operation = pathItem[method];
        if (!operation) continue;

        const tags = operation.tags || ["default"];
        const directRefs = getRefsFromOperation(operation);

        const allRefs = new Set<string>();
        directRefs.forEach((ref) => {
          allRefs.add(ref);

          const schema = schemas[ref];
          if (schema) {
            getAllRefs(schema, allRefs);
          }
        });

        tags.forEach((tag) => {
          const tagKey = tag.toLowerCase();
          if (!tagSchemaMap.has(tagKey)) {
            tagSchemaMap.set(tagKey, new Set());
          }
          allRefs.forEach((ref) => tagSchemaMap.get(tagKey)!.add(ref));
        });
      }
    }
  }

  return tagSchemaMap;
}

function collectAllDependencies(
  schemaNames: Set<string>,
  allSchemas: Record<string, SwagerAPISchema>,
): Set<string> {
  const result = new Set<string>(schemaNames);
  const queue = [...schemaNames];

  while (queue.length > 0) {
    const name = queue.shift()!;
    const schema = allSchemas[name];
    if (!schema) continue;

    const deps = getAllRefs(schema);
    for (const dep of deps) {
      if (!result.has(dep) && allSchemas[dep]) {
        result.add(dep);
        queue.push(dep);
      }
    }
  }

  return result;
}

function topologicalSort(
  schemaNames: Set<string>,
  allSchemas: Record<string, SwagerAPISchema>,
): [string, SwagerAPISchema][] {
  const visited = new Set<string>();
  const result: [string, SwagerAPISchema][] = [];

  function visit(name: string) {
    if (visited.has(name)) return;
    if (!schemaNames.has(name)) return;

    visited.add(name);

    const schema = allSchemas[name];
    if (!schema) return;

    const deps = getAllRefs(schema);
    for (const dep of deps) {
      visit(dep);
    }

    result.push([name, schema]);
  }

  for (const name of schemaNames) {
    visit(name);
  }

  return result;
}

function SwagerAPIToZod(
  schema: SwagerAPISchema,
  schemas: Record<string, SwagerAPISchema>,
  indent = 0,
): string {
  const pad = "  ".repeat(indent);
  const padInner = "  ".repeat(indent + 1);

  if (schema.$ref) {
    const refName = schema.$ref.split("/").pop()!;
    return `${refName}Schema`;
  }

  switch (schema.type) {
    case "string": {
      let strType = "z.string()";
      if (schema.format === "date-time") strType = "z.string().datetime()";
      else if (schema.format === "date") strType = "z.string().date()";
      else if (schema.format === "email") strType = "z.string().email()";
      else if (schema.format === "uri") strType = "z.string().url()";
      else if (schema.format === "uuid") strType = "z.string().uuid()";
      return schema.nullable ? `${strType}.nullable()` : strType;
    }

    case "integer":
      return schema.nullable
        ? "z.number().int().nullable()"
        : "z.number().int()";

    case "number":
      return schema.nullable ? "z.number().nullable()" : "z.number()";

    case "boolean":
      return schema.nullable ? "z.boolean().nullable()" : "z.boolean()";

    case "array": {
      const itemType = schema.items
        ? SwagerAPIToZod(schema.items, schemas, indent)
        : "z.unknown()";
      return schema.nullable
        ? `z.array(${itemType}).nullable()`
        : `z.array(${itemType})`;
    }

    case "object": {
      if (!schema.properties) {
        return schema.nullable
          ? "z.record(z.string(), z.unknown()).nullable()"
          : "z.record(z.string(), z.unknown())";
      }

      const required = new Set(schema.required || []);
      const props = Object.entries(schema.properties)
        .map(([key, prop]) => {
          const propType = SwagerAPIToZod(prop, schemas, indent + 1);
          const isOptional = !required.has(key);
          return `${padInner}${key}: ${propType}${isOptional ? ".optional()" : ""}`;
        })
        .join(",\n");

      const obj = `z.object({\n${props}\n${pad}})`;
      return schema.nullable ? `${obj}.nullable()` : obj;
    }

    default:
      return "z.unknown()";
  }
}

function generateZodSchemasForTag(
  schemaNames: Set<string>,
  allSchemas: Record<string, SwagerAPISchema>,
): string {
  const allNeededSchemas = collectAllDependencies(schemaNames, allSchemas);
  const sorted = topologicalSort(allNeededSchemas, allSchemas);

  const lines: string[] = ['import { z } from "zod";', ""];

  for (const [name, schema] of sorted) {
    const zodSchema = SwagerAPIToZod(schema, allSchemas);
    lines.push(`export const ${name}Schema = ${zodSchema};`);
    lines.push("");
  }

  for (const [name] of sorted) {
    lines.push(`export type ${name} = z.infer<typeof ${name}Schema>;`);
  }
  lines.push("");

  return lines.join("\n");
}

async function ZodGenerator() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/v3/api-docs`,
  );
  const doc: SwagerAPIDoc = await res.json();

  const schemas = doc.components?.schemas || {};
  const tagSchemaMap = mapSchemasToTags(doc);

  const apiFolder = "./src/api";
  if (fs.existsSync(apiFolder)) {
    fs.rmSync(apiFolder, { recursive: true });
  }
  fs.mkdirSync(apiFolder, { recursive: true });

  for (const [tag, schemaNames] of tagSchemaMap) {
    if (schemaNames.size === 0) continue;

    const folderPath = `./src/api/${tag}`;
    const filePath = path.join(folderPath, "schemas.ts");

    fs.mkdirSync(folderPath, { recursive: true });

    const content = generateZodSchemasForTag(schemaNames, schemas);
    fs.writeFileSync(filePath, content);
  }
}

ZodGenerator();
