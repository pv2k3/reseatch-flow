
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface UnsavedChangesDialogProps {
  open: boolean;
  onSave: () => void;
  onDiscard: () => void;
  onCancel: () => void;
}

export const UnsavedChangesDialog = ({
  open,
  onSave,
  onDiscard,
  onCancel
}: UnsavedChangesDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
            <DialogTitle>Unsaved Changes</DialogTitle>
          </div>
          <DialogDescription>
            You have unsaved changes in this section. What would you like to do?
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end space-x-2 mt-4">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="outline" onClick={onDiscard} className="text-red-600 hover:text-red-700">
            Discard Changes
          </Button>
          <Button onClick={onSave} className="bg-blue-600 hover:bg-blue-700">
            Save & Continue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
