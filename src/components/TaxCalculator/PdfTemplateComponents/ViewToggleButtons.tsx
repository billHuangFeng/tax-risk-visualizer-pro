
import React from 'react';
import { Toggle } from "@/components/ui/toggle";
import { Eye, Layout, Paintbrush, Columns } from "lucide-react";

interface ViewToggleButtonsProps {
  activeView: 'preview' | 'edit' | 'layout' | 'designer';
  onViewChange: (view: 'preview' | 'edit' | 'layout' | 'designer') => void;
}

export const ViewToggleButtons: React.FC<ViewToggleButtonsProps> = ({
  activeView,
  onViewChange
}) => {
  return (
    <div className="flex items-center justify-end space-x-2 mb-4">
      <Toggle 
        pressed={activeView === 'preview'} 
        onPressedChange={() => onViewChange('preview')}
        aria-label="预览模板"
      >
        <Eye className="h-4 w-4 mr-2" />
        预览
      </Toggle>
      <Toggle 
        pressed={activeView === 'layout'}
        onPressedChange={() => onViewChange('layout')}
        aria-label="页面布局"
      >
        <Layout className="h-4 w-4 mr-2" />
        布局
      </Toggle>
      <Toggle 
        pressed={activeView === 'designer'}
        onPressedChange={() => onViewChange('designer')}
        aria-label="设计器"
      >
        <Columns className="h-4 w-4 mr-2" />
        设计器
      </Toggle>
      <Toggle 
        pressed={activeView === 'edit'} 
        onPressedChange={() => onViewChange('edit')}
        aria-label="编辑模板"
      >
        <Paintbrush className="h-4 w-4 mr-2" />
        样式
      </Toggle>
    </div>
  );
};
