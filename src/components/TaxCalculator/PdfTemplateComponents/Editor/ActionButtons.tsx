
import React from 'react';
import { Button } from "@/components/ui/button";
import { Save, ArrowLeft } from "lucide-react";
import { PdfTemplate } from '@/types/pdfTemplates';

interface ActionButtonsProps {
  onCancel: () => void;
  onSave: (template: PdfTemplate) => void;
  template: PdfTemplate;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  onCancel,
  onSave,
  template
}) => {
  return (
    <div className="pt-4 flex justify-end">
      <Button variant="outline" onClick={onCancel} className="mr-2">
        <ArrowLeft className="h-4 w-4 mr-2" />
        取消
      </Button>
      <Button onClick={() => onSave(template)}>
        <Save className="h-4 w-4 mr-2" />
        保存模板
      </Button>
    </div>
  );
};
