import Link from "next/link";

import { Fragment, type ComponentProps } from "react";

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@hdc-ui/components/ui/breadcrumb";

import { Spinner } from "@hdc-ui/components/ui/spinner";
import { Empty } from "@hdc-ui/components/ui/empty";

import { House } from "lucide-react";

import { cn } from "@hdc-ui/utils";

export function PageContainer({
  className,
  children,
  ...props
}: ComponentProps<"div">) {
  return (
    <div className={cn("flex w-full flex-col", className)} {...props}>
      {children}
    </div>
  );
}

export function PageTitle({
  className,
  children,
  ...props
}: ComponentProps<"h2">) {
  return (
    <h2
      className={cn(
        "heading04B mb-4 flex items-center justify-between text-gray-900",
        className,
      )}
      {...props}
    >
      {children}
    </h2>
  );
}

export function PageBreadcrumb({
  className,
  children,
  items,
  ...props
}: ComponentProps<"nav"> & {
  items: {
    title: string;
    href: string;
  }[];
}) {
  return (
    <Breadcrumb className={cn(className)} {...props}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">
              <House className="size-3.5" />
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {items.map(({ title, href }, index) => {
          if (index === items.length - 1) {
            return (
              <BreadcrumbItem key={index}>
                <BreadcrumbLink asChild>
                  <Link href={href} title={title}>
                    {title}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            );
          }
          return (
            <Fragment key={index}>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={href} title={title}>
                    {title}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </Fragment>
          );
        })}
        {children}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export function SectionContainer({
  className,
  children,
  ...props
}: ComponentProps<"section">) {
  return (
    <section
      className={cn(
        "flex w-full flex-col gap-y-4 bg-white not-last-of-type:mb-4",
        className,
      )}
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
}: ComponentProps<"h3">) {
  return (
    <h3 className={cn("body01B text-gray-900", className)} {...props}>
      {children}
    </h3>
  );
}

export function SectionContent({
  className,
  children,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn("flex min-h-160 w-full flex-col text-gray-900", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function BtnArea({
  className,
  children,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex w-full items-center justify-end gap-x-1 border-t border-gray-200 py-2",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function LinkButton({
  className,
  color = "gray",
  children,
  ...props
}: ComponentProps<typeof Link> & {
  color?: "gray" | "outlined";
}) {
  return (
    <Link
      className={cn(
        "body02M inline-flex h-10 cursor-pointer items-center rounded-sm px-6",
        color === "gray"
          ? "bg-gray-900 text-white"
          : "border border-gray-200 bg-white text-gray-900",
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}

export function ContentRender(props: {
  isLoading: boolean;
  isEmpty?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  if (props.isLoading) {
    return (
      <div
        className={cn(
          "flex h-full w-full items-center justify-center",
          props.className,
        )}
      >
        <Spinner size="lg" />
      </div>
    );
  }

  if (props.isEmpty) {
    return (
      <div
        className={cn(
          "flex h-full w-full items-center justify-center",
          props.className,
        )}
      >
        <Empty size="lg" icon="warning" description="데이터가 없습니다." />
      </div>
    );
  }

  return props.children;
}
