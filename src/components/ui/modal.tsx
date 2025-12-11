import { type ReactNode } from "react";

import {
  Modal as ModalDialog,
  ModalHeader,
  ModalTitle,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalClose,
  ModalCloseIconButton,
  ModalTrigger,
} from "@hdc-ui/components/ui/modal";

import { Button } from "@hdc-ui/components/ui/button";

export default function Modal(props: {
  children?: ReactNode;
  title: string;
  description: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  actions?: {
    primary: {
      title: string;
      onClick: () => void;
    };
  };
}) {
  return (
    <ModalDialog open={props.open} onOpenChange={props.onOpenChange}>
      {props.children && <ModalTrigger asChild>{props.children}</ModalTrigger>}
      <ModalContent>
        <ModalHeader>
          <ModalTitle>{props.title}</ModalTitle>
          <ModalCloseIconButton />
        </ModalHeader>
        <ModalDescription>{props.description}</ModalDescription>
        <ModalFooter>
          <ModalClose asChild>
            <Button type="button" color="outlined">
              닫기
            </Button>
          </ModalClose>
          {props.actions?.primary && (
            <ModalClose asChild>
              <Button
                type="button"
                color="gray"
                onClick={props.actions.primary.onClick}
              >
                {props.actions.primary.title}
              </Button>
            </ModalClose>
          )}
        </ModalFooter>
      </ModalContent>
    </ModalDialog>
  );
}
