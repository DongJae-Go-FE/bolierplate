"use client";

import { ReactNode } from "react";

import { QueryClientProvider } from "@tanstack/react-query";

import getQueryClient from "@/lib/network/get-query-client";

export default function ReactQueryProvider({
  children,
}: {
  children: ReactNode;
}) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
