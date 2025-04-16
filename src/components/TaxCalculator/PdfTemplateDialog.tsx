
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { PdfTemplate } from '@/types/pdfTemplates';
import { DEFAULT_TEMPLATES } from '@/constants/pdfTemplates';
import { Button } from '@/components/ui/button';
import { PdfTemplateEditor } from './PdfTemplateEditor';
import { TemplateGrid } from './PdfTemplateComponents/TemplateGrid';
import { PdfTemplatePreview } from './PdfTemplatePreview';

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
  const [selectedTemplate, setSelectedTemplate] = useState<PdfTemplate>(DEFAULT_TEMPLATES[0]);
  const [isEditing, setIsEditing] = useState(false);
  const [isPreview, setIsPreview] = useState(false);

  const handleTemplateSelect = (template: PdfTemplate) => {
    setSelectedTemplate(template);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handlePreview = () => {
    setIsPreview(true);
  };

  const handleSave = (updatedTemplate: PdfTemplate) => {
    setSelectedTemplate(updatedTemplate);
    setIsEditing(false);
  };

  const handleBack = () => {
    setIsEditing(false);
    setIsPreview(false);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "修改PDF模板" : "选择PDF模板"}</DialogTitle>
        </DialogHeader>

        {isEditing ? (
          <PdfTemplateEditor
            template={selectedTemplate}
            onSave={handleSave}
            onCancel={handleBack}
          />
        ) : isPreview ? (
          <PdfTemplatePreview
            template={selectedTemplate}
            onBack={handleBack}
          />
        ) : (
          <div className="space-y-4">
            <TemplateGrid
              templates={DEFAULT_TEMPLATES}
              selectedTemplate={selectedTemplate}
              onSelectTemplate={handleTemplateSelect}
            />
            
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={handlePreview}>
                预览模板
              </Button>
              <Button variant="outline" onClick={handleEdit}>
                修改模板
              </Button>
              <Button 
                onClick={() => {
                  onExport(selectedTemplate);
                  onClose();
                }}
              >
                使用此模板
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
