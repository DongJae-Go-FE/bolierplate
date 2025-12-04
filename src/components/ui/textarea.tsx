import { type ComponentProps } from "react";

import { cn } from "@/lib/utils";

export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "min-h-70 w-full rounded-md border border-gray-200 p-2",
        className,
      )}
      {...props}
    />
  );
}

export default { Textarea };
