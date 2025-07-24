import ActionButton from "@/components/ActionButton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";

interface ConfirmationDialogProps {
  handleValidate: () => void;
  actionButtonText?: string;
  open: boolean;
  setOpen: (value: boolean) => void;
  confirmationMessage?: string;
  loading?: boolean;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  handleValidate,
  actionButtonText,
  open,
  setOpen,
  confirmationMessage,
  loading,
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmation</DialogTitle>
          <DialogDescription>
            {confirmationMessage || "Êtes-vous sûr de vouloir continuer ?"}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
          <Button
            variant="outline"
            className="mr-2"
            onClick={() => setOpen(false)}
          >
            Annuler
          </Button>
          <ActionButton
            label={actionButtonText || "Confirmer"}
            action={handleValidate}
            loading={loading || false}
            disabled={false}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationDialog;
