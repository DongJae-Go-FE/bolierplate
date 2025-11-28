import { type ComponentProps } from "react";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@hdc-ui/components/ui/select";

import { IconButton } from "@hdc-ui/components/ui/icon-button";

import { cn } from "@hdc-ui/utils";

export function Filter({
  className,
  children,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "mb-4 flex h-10 w-full items-center justify-between",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function FilterContainer({
  className,
  children,
  ...props
}: ComponentProps<"div">) {
  return (
    <div className={cn("flex gap-x-1", className)} {...props}>
      {children}
    </div>
  );
}

export function FilterReset({
  className,
  ...props
}: ComponentProps<typeof IconButton>) {
  return (
    <IconButton
      className={cn(
        "rounded-md border border-gray-200 [&_svg]:size-4",
        className,
      )}
      size="md"
      icon="RotateCcw"
      {...props}
    />
  );
}

export function CommonFilter(props: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <Select
      value={props.value}
      onValueChange={(value) => {
        props.onChange(value);
      }}
    >
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="전체">전체</SelectItem>
        <SelectItem value="제목">제목</SelectItem>
        <SelectItem value="내용">내용</SelectItem>
      </SelectContent>
    </Select>
  );
}

export function SampleFirstFilter(props: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <Select
      value={props.value}
      onValueChange={(value) => {
        props.onChange(value);
      }}
    >
      <SelectTrigger className="w-50">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="샘플1">샘플1</SelectItem>
        <SelectItem value="제목">제목</SelectItem>
        <SelectItem value="내용">내용</SelectItem>
      </SelectContent>
    </Select>
  );
}
