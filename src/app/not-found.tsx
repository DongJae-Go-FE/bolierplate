import { Empty } from "@hdc-ui/components/ui/empty";

export default function NotFound() {
  return (
    <div className="flex h-dvh w-dvw items-center justify-center bg-white">
      <Empty description="404 Not Found" />
    </div>
  );
}
