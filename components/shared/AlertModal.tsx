"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/AlertDialog";

type AlertModalProps = {
  isOpen: boolean;
  disabled?: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const AlertModal = ({
  isOpen,
  disabled,
  onClose,
  onConfirm,
}: AlertModalProps) => {
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogTrigger></AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            selected item and remove it from servers.
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onConfirm} disabled={disabled}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertModal;
