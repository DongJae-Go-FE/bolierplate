import * as React from "react";

import { Form as FormPrimitive } from "radix-ui";

import { cn } from "@hdc-ui/utils";

export function FormRoot({
  className,
  ...props
}: React.ComponentProps<typeof FormPrimitive.Root>) {
  return <FormPrimitive.Root className={cn(className)} {...props} />;
}

export function FormField({
  className,
  ...props
}: React.ComponentProps<typeof FormPrimitive.Field>) {
  return (
    <FormPrimitive.Field
      className={cn("flex flex-col gap-y-1 not-last-of-type:mb-2", className)}
      {...props}
    />
  );
}

export function FormLabel({
  className,
  ...props
}: React.ComponentProps<typeof FormPrimitive.Label>) {
  return (
    <FormPrimitive.Label
      className={cn("body02R text-gray-500", className)}
      {...props}
    />
  );
}

export function FormControl({
  className,
  ...props
}: React.ComponentProps<typeof FormPrimitive.Control>) {
  return <FormPrimitive.Control className={cn(className)} {...props} />;
}

export function FormMessage({
  className,
  ...props
}: React.ComponentProps<typeof FormPrimitive.Message>) {
  return (
    <FormPrimitive.Message
      className={cn("body02R text-red-500", className)}
      {...props}
    />
  );
}

export function FormSubmit({
  className,
  ...props
}: React.ComponentProps<typeof FormPrimitive.Submit>) {
  return <FormPrimitive.Submit className={cn(className)} {...props} />;
}
