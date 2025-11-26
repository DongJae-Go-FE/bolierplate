import Link from "next/link";

import { Sidebar, SidebarHeader } from "@/components/sidebar";

import { FlaskConical } from "lucide-react";

import SidebarContent from "../sidebar-content";
import SidebarFooter from "../siderbar-user";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <h1 className="size-full">
          <Link
            href="/"
            className="flex h-full w-full cursor-pointer items-center justify-center gap-x-1 px-8"
          >
            <FlaskConical className="size-5" />
            로고
          </Link>
        </h1>
      </SidebarHeader>
      <SidebarContent />
      <SidebarFooter />
    </Sidebar>
  );
}
