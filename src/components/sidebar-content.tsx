"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  SidebarContent as SidebarContentContainer,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/sidebar";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  ChevronDown,
} from "lucide-react";
import { cn } from "@hdc-ui/utils";

const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

const items2 = [
  {
    title: "메인",
    url: "/main",
    icon: Home,
  },
  {
    title: "테이블",
    url: "/table",
    icon: Inbox,
  },
  {
    title: "데이터 테이블",
    url: "/data-table",
    icon: Calendar,
  },
  {
    title: "로그인",
    url: "/login",
    icon: Search,
  },
  {
    title: "회원가입",
    url: "/sign",
    icon: Settings,
  },
];

export default function SidebarContent() {
  const pathname = usePathname();

  return (
    <SidebarContentContainer>
      <SidebarGroup>
        <SidebarGroupLabel>페이지</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {items2.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  className={cn(pathname.includes(item.url) && "text-gray-900")}
                  asChild
                >
                  <Link href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      <Collapsible defaultOpen className="group/collapsible">
        <SidebarGroup>
          <SidebarGroupLabel asChild>
            <CollapsibleTrigger>
              메뉴1
              <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
            </CollapsibleTrigger>
          </SidebarGroupLabel>
          <CollapsibleContent>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </CollapsibleContent>
        </SidebarGroup>
      </Collapsible>
    </SidebarContentContainer>
  );
}
