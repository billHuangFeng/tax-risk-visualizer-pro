
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { PdfTemplate } from '@/types/pdfTemplates';
import { DEFAULT_TEMPLATES } from '@/constants/pdfTemplates';
import { Button } from '@/components/ui/button';

interface PdfTemplateDialogProps {
  open: boolean;
  onClose: () => void;
  onExport: (template: PdfTemplate) => void;
}

export const PdfTemplateDialog: React.FC<PdfTemplateDialogProps> = ({
  open,
  onClose,
  onExport
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>选择PDF模板</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {DEFAULT_TEMPLATES.map((template) => (
            <div 
              key={template.id} 
              className="border rounded-lg p-4 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                onExport(template);
                onClose();
              }}
            >
              <h3 className="text-lg font-semibold">{template.name}</h3>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
