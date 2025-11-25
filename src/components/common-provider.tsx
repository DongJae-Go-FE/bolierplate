"use client";

import { ReactNode, createContext } from "react";

//사용자 정보 및 인증 상태만

export const Common = createContext("");

export default function CommonProvider({
  children,
  value = "",
}: {
  children: ReactNode;
  value?: string;
}) {
  return <Common value={value}>{children}</Common>;
}
