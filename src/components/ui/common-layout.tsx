import { cn } from "@hdc-ui/utils";
import { type ComponentProps } from "react";

export function Section({
  className,
  children,
  ...props
}: ComponentProps<"section">) {
  return (
    <section
      className={cn("flex h-full w-full flex-col", className)}
      {...props}
    >
      {children}
    </section>
  );
}

export function SectionTitle({
  className,
  children,
  ...props
}: ComponentProps<"h2">) {
  return (
    <h2
      className={cn(
        "heading03B mb-4 flex items-center justify-between text-gray-900",
        className,
      )}
      {...props}
    >
      {children}
    </h2>
  );
}
