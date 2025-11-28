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
        "heading04B mb-4 flex items-center justify-between text-gray-900",
        className,
      )}
      {...props}
    >
      {children}
    </h2>
  );
}

export function SectionBreadcrumb({
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

export function ContentRender(props: {
  isLoading: boolean;
  isEmpty?: boolean;
  children: React.ReactNode;
}) {
  if (props.isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (props.isEmpty) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Empty size="lg" icon="warning" description="데이터가 없습니다." />
      </div>
    );
  }

  return props.children;
}
