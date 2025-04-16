
import React from 'react';
import { Toggle } from "@/components/ui/toggle";
import { Eye, Settings, FileText } from "lucide-react";

interface PdfToolbarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

export const PdfToolbar: React.FC<PdfToolbarProps> = ({
  activeView,
  onViewChange
}) => {
  return (
    <div className="flex items-center justify-end space-x-2 mb-4">
      <Toggle 
        pressed={activeView === 'select'} 
        onPressedChange={() => onViewChange('select')}
        aria-label="选择模板"
      >
        <FileText className="h-4 w-4 mr-2" />
        模板
      </Toggle>
      <Toggle 
        pressed={activeView === 'preview'}
        onPressedChange={() => onViewChange('preview')}
        aria-label="预览"
      >
        <Eye className="h-4 w-4 mr-2" />
        预览
      </Toggle>
      <Toggle 
        pressed={activeView === 'format'}
        onPressedChange={() => onViewChange('format')}
        aria-label="页面格式"
      >
        <Settings className="h-4 w-4 mr-2" />
        格式
      </Toggle>
    </div>
  );
};
