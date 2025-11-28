import Link from "next/link";

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
        "body02R flex items-center justify-center gap-x-1 text-gray-900",
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
        "body02R flex items-center justify-center gap-x-0.5",
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

function TableLinkText({
  className,
  children,
  ...props
}: ComponentProps<typeof Link>) {
  return (
    <Link
      className={cn("underline-offset-4 hover:underline", className)}
      {...props}
    >
      {children}
    </Link>
  );
}

function TableToggleButton({
  className,
  children,
  state,
  ...props
}: ComponentProps<"button"> & {
  state: "asc" | "desc";
}) {
  return (
    <button
      className={cn(
        "body02M flex w-full justify-center gap-x-2 text-gray-900",
        className,
      )}
      {...props}
    >
      {children}
      <span className="flex flex-col">
        <ArrowUp state={state} />
        <ArrowDown state={state} />
      </span>
    </button>
  );
}

export { TableToggleButton };

export { TableStatusText, TableStatusUpDownText, TableLinkText };

type SvgType = { state: "asc" | "desc" };

function ArrowUp({ state }: SvgType) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
    >
      <path
        d="M2.5 6.04169L5 3.54169L7.5 6.04169H2.5Z"
        fill={state === "asc" ? "#EEEEEE" : "#999999"}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.70536 3.24704C4.86808 3.08432 5.1319 3.08432 5.29462 3.24704L7.79462 5.74704C7.91379 5.8662 7.94943 6.04542 7.88494 6.20112C7.82045 6.35682 7.66852 6.45833 7.49999 6.45833H2.49999C2.33147 6.45833 2.17953 6.35682 2.11504 6.20112C2.05055 6.04542 2.0862 5.8662 2.20536 5.74704L4.70536 3.24704ZM3.50591 5.625H6.49407L4.99999 4.13092L3.50591 5.625Z"
        fill={state === "asc" ? "#EEEEEE" : "#999999"}
      />
    </svg>
  );
}

function ArrowDown({ state }: SvgType) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
    >
      <path
        d="M7.5 3.95831L5 6.45831L2.5 3.95831H7.5Z"
        fill={state === "desc" ? "#EEEEEE" : "#999999"}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.11504 3.7989C2.17953 3.6432 2.33147 3.54169 2.49999 3.54169H7.49999C7.66852 3.54169 7.82045 3.6432 7.88494 3.7989C7.94943 3.9546 7.91379 4.13382 7.79462 4.25298L5.29462 6.75298C5.1319 6.9157 4.86808 6.9157 4.70536 6.75298L2.20536 4.25298C2.0862 4.13382 2.05055 3.9546 2.11504 3.7989ZM3.50591 4.37502L4.99999 5.8691L6.49407 4.37502H3.50591Z"
        fill={state === "desc" ? "#EEEEEE" : "#999999"}
      />
    </svg>
  );
}
