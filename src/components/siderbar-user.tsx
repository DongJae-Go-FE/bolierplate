"use client";

import { useRouter } from "next/navigation";

import { SidebarFooter, useSidebar } from "@/components/sidebar";
import { useAuth } from "@/components/common-provider";

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
  const { replace } = useRouter();

  const { isMobile } = useSidebar();
  const { logout, user } = useAuth();

  return (
    <SidebarFooter>
      <div className="flex size-8 items-center justify-center rounded-full bg-gray-200">
        <User className="size-5" />
      </div>
      <div className="body03M">
        <p>
          {user?.name}({user?.userId})
        </p>
        <p className="block max-w-[150px] truncate">{user?.email}</p>
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
              <p>
                {user?.name}({user?.userId})
              </p>
              <p>{user?.email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>탭1</DropdownMenuItem>
            <DropdownMenuItem>탭2</DropdownMenuItem>
            <DropdownMenuItem>탭3</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={async () => {
              await logout();
              replace("/login");
            }}
          >
            로그아웃
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarFooter>
  );
}
