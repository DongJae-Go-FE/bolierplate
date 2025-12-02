import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
} from "@hdc-ui/components/ui/alert-dialog";

import { Button } from "@hdc-ui/components/ui/button";

export default function Alert(props: {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title: string;
  description: string;
  onClick?: () => void;
}) {
  return (
    <AlertDialog open={props.open} onOpenChange={props.onOpenChange}>
      <AlertDialogContent>
        <AlertDialogTitle>{props.title}</AlertDialogTitle>
        <AlertDialogDescription>{props.description}</AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogAction asChild>
            <Button
              className="w-30"
              color="outlined"
              autoFocus
              onClick={() => {
                if (props.onClick) {
                  props.onClick();
                }
              }}
            >
              확인
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
