import { IconButton } from "@hdc-ui/components/ui/icon-button";

import { SidebarTrigger } from "@/components/sidebar";

export default async function Header() {
  return (
    <header className="flex h-20 w-full items-center border-b border-gray-200 pr-[35px] pl-8">
      <SidebarTrigger />
      <ul className="ml-auto flex h-10 items-center gap-x-2">
        <li className="flex items-center gap-x-2">
          <IconButton icon="User" size="md" />
          <span className="body02M text-gray-900">Profile</span>
        </li>
        <li>
          <IconButton icon="Bell" size="md" />
        </li>
      </ul>
    </header>
  );
}
