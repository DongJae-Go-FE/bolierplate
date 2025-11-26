"use client";

import { SidebarFooter, useSidebar } from "@/components/sidebar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/dropdown-menu";

import { IconButton } from "@hdc-ui/components/ui/icon-button";

import { User } from "lucide-react";

export default function SidebarUser() {
  const { isMobile } = useSidebar();

  return (
    <SidebarFooter>
      <div className="flex size-8 items-center justify-center rounded-full bg-gray-200">
        <User className="size-5" />
      </div>
      <div className="body03M">
        <p>작업자(id)</p>
        <p className="block max-w-[150px] truncate">anonymous@hdc-labs.com</p>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <IconButton icon="EllipsisVertical" size="xs" />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
          side={isMobile ? "bottom" : "right"}
          align="end"
          sideOffset={4}
        >
          <DropdownMenuLabel>
            <div className="body03M">
              <p>작업자</p>
              <p>anonymous@hdc-labs.com</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>Account</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Notifications</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarFooter>
  );
}
