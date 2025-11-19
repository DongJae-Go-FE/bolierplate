import {
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@hdc-ui/components/ui/dialog";
import { Button } from "@hdc-ui/components/ui/button";

import { cn } from "@hdc-ui/utils";

export default function Page() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>버튼</Button>
      </DialogTrigger>
      <DialogContent className={cn("w-100")}>
        <DialogHeader>
          <DialogTitle>타이틀</DialogTitle>
        </DialogHeader>
        <DialogDescription>설명</DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
