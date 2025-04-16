
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DEFAULT_TEMPLATES } from "@/constants/pdfTemplates";
import { PdfTemplate } from "@/types/pdfTemplates";
import { Download, Loader2 } from "lucide-react";
import { TemplateGrid } from './PdfTemplateComponents/TemplateGrid';
import { PageFormatSettings } from './PdfTemplateComponents/PageFormatSettings';
import { PdfToolbar } from './PdfTemplateComponents/PdfToolbar';
import { PdfTemplatePreview } from './PdfTemplatePreview';
import { ReportBroDesigner } from './PdfTemplateComponents/ReportBroDesigner';
import { loadReportBroLibraries } from '@/utils/reportbro-loader';
import { useToast } from '@/hooks/use-toast';

interface PdfTemplateDialogProps {
  open: boolean;
  onClose: () => void;
  onExport: (template: PdfTemplate) => void;
}

type ViewState = 'select' | 'preview' | 'format' | 'designer';

export const PdfTemplateDialog: React.FC<PdfTemplateDialogProps> = ({ 
  open, 
  onClose, 
  onExport 
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState<PdfTemplate>(DEFAULT_TEMPLATES[0]);
  const [view, setView] = useState<ViewState>('select');
  const [reportDefinition, setReportDefinition] = useState<any>(null);
  const [isLibraryLoading, setIsLibraryLoading] = useState(false);
  const [libraryLoaded, setLibraryLoaded] = useState(false);
  const { toast } = useToast();
  
  // 预加载 ReportBro 库
  useEffect(() => {
    if (open) {
      // 只有当用户想要设计器视图时才加载
      if (view === 'designer' && !libraryLoaded) {
        setIsLibraryLoading(true);
        
        // 设置加载超时
        const loadTimeout = setTimeout(() => {
          setIsLibraryLoading(false);
          toast({
            title: "加载超时",
            description: "ReportBro设计器加载超时，请尝试刷新页面",
            variant: "destructive",
          });
        }, 15000);
        
        loadReportBroLibraries()
          .then(() => {
            console.log("ReportBro libraries loaded in PdfTemplateDialog");
            setIsLibraryLoading(false);
            setLibraryLoaded(true);
            clearTimeout(loadTimeout);
          })
          .catch(error => {
            console.error("Failed to load ReportBro libraries:", error);
            setIsLibraryLoading(false);
            clearTimeout(loadTimeout);
            toast({
              title: "加载错误",
              description: "无法加载 ReportBro 设计器，将使用简易模式",
              variant: "destructive",
            });
          });
      }
    }
  }, [open, view, libraryLoaded, toast]);
  
  const handleSelectTemplate = (template: PdfTemplate) => {
    setSelectedTemplate(template);
  };

  const handleSaveReport = (definition: any) => {
    setReportDefinition(definition);
    // 可以在这里将报表定义保存到模板中
    const updatedTemplate = {
      ...selectedTemplate,
      reportDefinition: definition
    };
    setSelectedTemplate(updatedTemplate);
    
    toast({
      title: "保存成功",
      description: "PDF模板定义已保存",
    });
  };

  const handleViewChange = (newView: string) => {
    // 如果当前视图是设计器，并且用户选择了另一个视图，则提示保存
    if (view === 'designer' && reportDefinition && newView !== 'designer') {
      const updatedTemplate = {
        ...selectedTemplate,
        reportDefinition: reportDefinition
      };
      setSelectedTemplate(updatedTemplate);
    }
    
    if (newView === 'designer' && !libraryLoaded) {
      setIsLibraryLoading(true);
      // 开始加载库
      loadReportBroLibraries()
        .then(() => {
          setIsLibraryLoading(false);
          setLibraryLoaded(true);
          setView(newView as ViewState);
        })
        .catch(error => {
          console.error("Failed to load ReportBro libraries:", error);
          setIsLibraryLoading(false);
          toast({
            title: "加载错误",
            description: "无法加载 ReportBro 设计器，将使用简易模式",
            variant: "destructive",
          });
          // 尽管出错，但仍然切换到设计器视图，因为有回退模式
          setView(newView as ViewState);
        });
    } else {
      setView(newView as ViewState);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>PDF模板设计器</DialogTitle>
          <DialogDescription>
            选择导出PDF的模板样式或自定义设计
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <PdfToolbar
            activeView={view}
            onViewChange={handleViewChange}
          />
          
          {view === 'select' && (
            <TemplateGrid
              templates={DEFAULT_TEMPLATES}
              selectedTemplate={selectedTemplate}
              onSelectTemplate={handleSelectTemplate}
            />
          )}
          
          {view === 'designer' && isLibraryLoading && (
            <div className="flex flex-col items-center justify-center h-64 p-8">
              <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
              <p className="text-center">正在加载设计器库，请稍候...</p>
              <p className="text-center text-sm text-muted-foreground mt-2">
                首次加载可能需要一些时间，请耐心等待
              </p>
            </div>
          )}
          
          {view === 'designer' && !isLibraryLoading && (
            <ReportBroDesigner
              onSave={handleSaveReport}
              initialReport={selectedTemplate.reportDefinition}
            />
          )}
          
          {view === 'preview' && (
            <PdfTemplatePreview 
              template={selectedTemplate}
              onBack={() => setView('select')}
            />
          )}
          
          {view === 'format' && (
            <PageFormatSettings
              template={selectedTemplate}
              onUpdate={(updated) => setSelectedTemplate(updated)}
            />
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            取消
          </Button>
          <Button variant="default" onClick={() => onExport(selectedTemplate)} className="gap-2">
            <Download className="h-4 w-4" />
            使用此模板导出
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
