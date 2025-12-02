"use client";

import DOMPurify from "dompurify";
import { useMemo } from "react";
import { cn } from "@/lib/utils";

type SafeHtmlProps = {
  html: string;
  className?: string;
};

export default function SafeHtml({ html, className }: SafeHtmlProps) {
  const cleanHtml = useMemo(() => {
    return DOMPurify.sanitize(html, {
      USE_PROFILES: { html: true },
    });
  }, [html]);

  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center",
        className,
      )}
      dangerouslySetInnerHTML={{ __html: cleanHtml }}
    />
  );
}
