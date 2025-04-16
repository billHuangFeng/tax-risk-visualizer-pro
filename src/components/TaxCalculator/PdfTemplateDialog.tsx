
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DEFAULT_TEMPLATES } from "@/constants/pdfTemplates";
import { PdfTemplate } from "@/types/pdfTemplates";
import { Download, ArrowLeft } from "lucide-react";
import { TemplateGrid } from './PdfTemplateComponents/TemplateGrid';
import { ViewToggleButtons } from './PdfTemplateComponents/ViewToggleButtons';
import { PdfTemplateEditor } from './PdfTemplateEditor';
import { PdfTemplatePreview } from './PdfTemplatePreview';
import { PdfCanvasEditor } from './PdfCanvasEditor';
import { PdfDesigner } from './PdfDesigner';

interface PdfTemplateDialogProps {
  open: boolean;
  onClose: () => void;
  onExport: (template: PdfTemplate) => void;
}

type ViewState = 'select' | 'edit' | 'preview' | 'layout' | 'designer';

export const PdfTemplateDialog: React.FC<PdfTemplateDialogProps> = ({ 
  open, 
  onClose, 
  onExport 
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState<PdfTemplate>(DEFAULT_TEMPLATES[0]);
  const [view, setView] = useState<ViewState>('select');
  
  const handleSelectTemplate = (template: PdfTemplate) => {
    setSelectedTemplate(template);
  };
  
  const handleSaveTemplate = (template: PdfTemplate) => {
    setSelectedTemplate(template);
    setView('select');
  };
  
  const handleExport = () => {
    onExport(selectedTemplate);
    onClose();
  };

  const handleBack = () => {
    setView('select');
  };

  const handleViewChange = (newView: 'preview' | 'edit' | 'layout' | 'designer') => {
    setView(newView);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="relative">
          {view !== 'select' && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-0 top-0"
              onClick={handleBack}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
          <DialogTitle>PDF模板设计器</DialogTitle>
          <DialogDescription>
            {view === 'select' 
              ? '选择导出PDF的模板样式或自定义设计' 
              : view === 'designer'
                ? '设计模板布局和字段'
                : view === 'edit' 
                  ? '自定义模板样式' 
                  : view === 'layout'
                    ? '设计页面布局'
                    : '预览模板效果'}
          </DialogDescription>
        </DialogHeader>
        
        {view === 'select' && (
          <>
            <ViewToggleButtons
              activeView={view === 'select' ? 'preview' : view}
              onViewChange={handleViewChange}
            />
            
            <TemplateGrid
              templates={DEFAULT_TEMPLATES}
              selectedTemplate={selectedTemplate}
              onSelectTemplate={handleSelectTemplate}
            />
          </>
        )}
        
        {view === 'edit' && (
          <PdfTemplateEditor 
            template={selectedTemplate} 
            onSave={handleSaveTemplate}
            onCancel={() => setView('select')}
          />
        )}
        
        {view === 'preview' && (
          <PdfTemplatePreview 
            template={selectedTemplate}
            onBack={() => setView('select')}
          />
        )}
        
        {view === 'layout' && (
          <PdfCanvasEditor
            template={selectedTemplate}
            onUpdate={handleSaveTemplate}
          />
        )}
        
        {view === 'designer' && (
          <PdfDesigner
            template={selectedTemplate}
            onUpdate={handleSaveTemplate}
          />
        )}
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            取消
          </Button>
          <Button variant="default" onClick={handleExport} className="gap-2">
            <Download className="h-4 w-4" />
            使用此模板导出
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
