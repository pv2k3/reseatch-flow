
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { PaperData } from "@/types/paper";
import { generatePaperHTML } from "@/utils/paperUtils";

interface PaperPreviewProps {
  paperData: PaperData;
}

export const PaperPreview = ({ paperData }: PaperPreviewProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Eye className="h-4 w-4 mr-2" />
          Preview
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Paper Preview</DialogTitle>
        </DialogHeader>
        <div 
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: generatePaperHTML(paperData) }}
        />
      </DialogContent>
    </Dialog>
  );
};
