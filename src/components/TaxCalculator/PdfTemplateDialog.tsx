
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toggle } from "@/components/ui/toggle";
import { DEFAULT_TEMPLATES } from "@/constants/pdfTemplates";
import { PdfTemplate } from "@/types/pdfTemplates";
import { Paintbrush, Eye, Download, Settings } from "lucide-react";
import { PdfTemplateEditor } from './PdfTemplateEditor';
import { PdfTemplatePreview } from './PdfTemplatePreview';

interface PdfTemplateDialogProps {
  open: boolean;
  onClose: () => void;
  onExport: (template: PdfTemplate) => void;
}

type ViewState = 'select' | 'edit' | 'preview';

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
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>PDF模板选择</DialogTitle>
          <DialogDescription>
            选择导出PDF的模板样式或自定义设计
          </DialogDescription>
        </DialogHeader>
        
        {view === 'select' && (
          <>
            <div className="flex items-center justify-end space-x-2 mb-4">
              <Toggle 
                pressed={view === 'preview'} 
                onPressedChange={() => setView('preview')}
                aria-label="预览模板"
              >
                <Eye className="h-4 w-4 mr-2" />
                预览
              </Toggle>
              <Toggle 
                pressed={view === 'edit'} 
                onPressedChange={() => setView('edit')}
                aria-label="编辑模板"
              >
                <Paintbrush className="h-4 w-4 mr-2" />
                设计
              </Toggle>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
              {DEFAULT_TEMPLATES.map((template) => (
                <div 
                  key={template.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedTemplate.id === template.id 
                      ? 'border-primary bg-primary/5 shadow-sm' 
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => handleSelectTemplate(template)}
                >
                  <h3 className="font-medium text-lg mb-2">{template.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{template.description}</p>
                  <div className="h-32 bg-accent/30 rounded flex items-center justify-center">
                    <div className="text-xs text-center p-4">
                      <div style={{ 
                        fontFamily: template.styles.fontFamily,
                        marginBottom: '8px'
                      }}>
                        <div style={{ 
                          fontSize: template.styles.headingStyle.fontSize,
                          fontWeight: template.styles.headingStyle.fontWeight,
                          color: template.styles.headingStyle.color,
                          borderBottom: template.styles.headingStyle.borderBottom,
                          paddingBottom: '4px',
                          marginBottom: '8px'
                        }}>
                          模板预览
                        </div>
                        
                        <div className="flex justify-between" style={{
                          marginBottom: '6px'
                        }}>
                          <span>字段名称：</span>
                          <span style={{
                            border: `1px solid ${template.styles.formFieldStyle.borderColor}`,
                            padding: '2px 4px',
                          }}>字段值</span>
                        </div>
                        
                        <div style={{
                          border: `1px solid ${template.styles.tableStyle.borderColor}`,
                          marginTop: '8px',
                          fontSize: '0.65rem'
                        }}>
                          <div style={{
                            backgroundColor: template.styles.tableStyle.headerBgColor,
                            padding: '2px 4px',
                            textAlign: 'center'
                          }}>
                            表格标题
                          </div>
                          <div style={{
                            display: 'flex',
                            borderTop: `1px solid ${template.styles.tableStyle.borderColor}`
                          }}>
                            <div style={{
                              padding: '2px 4px',
                              borderRight: `1px solid ${template.styles.tableStyle.borderColor}`,
                              width: '50%'
                            }}>
                              项目
                            </div>
                            <div style={{
                              padding: '2px 4px',
                              width: '50%',
                              textAlign: 'right'
                            }}>
                              金额
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
