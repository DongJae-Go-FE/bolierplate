import { IconButton } from "@hdc-ui/components/ui/icon-button";

import { SidebarTrigger } from "@/components/sidebar";

export default async function Header() {
  return (
    <header className="flex h-20 w-full items-center justify-between border-b border-gray-200 px-2">
      <SidebarTrigger />

      <IconButton icon="Bell" size="md" />
    </header>
  );
}
