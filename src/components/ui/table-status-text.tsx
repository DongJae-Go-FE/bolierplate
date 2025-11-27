import { type ComponentProps } from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@hdc-ui/utils";

const tableStatusTextCircleVariants = cva(cn("size-2 rounded-full"), {
  variants: {
    color: {
      green: "bg-green-500",
      red: "bg-red-500",
      orange: "bg-orange-500",
    },
  },
  defaultVariants: {
    color: "green",
  },
});

interface TableStatusTextProps
  extends Omit<ComponentProps<"div">, "color">,
    VariantProps<typeof tableStatusTextCircleVariants> {}

function TableStatusText({
  className,
  children,
  color,
  ...props
}: TableStatusTextProps) {
  return (
    <div
      className={cn(
        "body02R flex items-center gap-x-1 text-gray-900",
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          tableStatusTextCircleVariants({
            color,
          }),
        )}
      />
      {children}
    </div>
  );
}

function TableStatusUpDownText({
  className,
  children,
  status,
  ...props
}: ComponentProps<"div"> & {
  status: "up" | "down";
}) {
  return (
    <div
      className={cn(
        "body02R flex items-center gap-x-0.5",
        status === "up" ? "text-plus-500" : "text-minus-500",
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "h-[5px] w-1.5",
          status === "up"
            ? "bg-plus-500 [clip-path:polygon(50%_0%,100%_100%,0%_100%)]"
            : "bg-minus-500 [clip-path:polygon(0%_0%,100%_0%,50%_100%)]",
        )}
      />
      {children}
    </div>
  );
}

export { TableStatusText, TableStatusUpDownText };
