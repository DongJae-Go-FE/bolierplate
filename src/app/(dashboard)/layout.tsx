import type { Metadata } from "next";

import Header from "@/components/ui/header";
import { SidebarProvider } from "@/components/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";

export const metadata: Metadata = {
  title: "대시보드",
  description: "로그인 정보가 있을 경우",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="h-dvh w-full">
        <Header />
        <main className="h-[calc(100%-80px)] overflow-y-auto p-4">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
