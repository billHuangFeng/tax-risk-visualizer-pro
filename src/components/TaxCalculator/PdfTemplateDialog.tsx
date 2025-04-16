
import React, { useState, useEffect, useCallback } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DEFAULT_TEMPLATES } from "@/constants/pdfTemplates";
import { PdfTemplate } from "@/types/pdfTemplates";
import { Download } from "lucide-react";
import { TemplateGrid } from './PdfTemplateComponents/TemplateGrid';
import { PageFormatSettings } from './PdfTemplateComponents/PageFormatSettings';
import { PdfToolbar } from './PdfTemplateComponents/PdfToolbar';
import { PdfTemplatePreview } from './PdfTemplatePreview';
import { ReportBroDesigner } from './PdfTemplateComponents/ReportBroDesigner';
import { loadReportBroLibraries } from '@/utils/reportbro-loader';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

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
  const [designerLoaded, setDesignerLoaded] = useState(false);
  const [isPreloading, setIsPreloading] = useState(false);
  const { toast } = useToast();
  
  // 预加载设计器库函数
  const preloadDesignerLibraries = useCallback(async () => {
    if (designerLoaded) return true;
    
    setIsPreloading(true);
    console.log("开始预加载PDF设计器库");
    
    try {
      await loadReportBroLibraries();
      console.log("PDF设计器库预加载成功");
      setDesignerLoaded(true);
      setIsPreloading(false);
      return true;
    } catch (error) {
      console.error("PDF设计器库预加载失败:", error);
      setIsPreloading(false);
      return false;
    }
  }, [designerLoaded]);
  
  // 对话框打开时预加载库
  useEffect(() => {
    if (open) {
      preloadDesignerLibraries();
    }
    
    // 对话框关闭时重置视图到选择模式
    if (!open && view !== 'select') {
      setView('select');
    }
  }, [open, preloadDesignerLibraries, view]);
  
  const handleSelectTemplate = (template: PdfTemplate) => {
    setSelectedTemplate(template);
  };

  const handleSaveReport = (definition: any) => {
    setReportDefinition(definition);
    // 将报表定义保存到模板中
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

  const handleViewChange = async (newView: string) => {
    // 处理从设计器视图切换出去的情况
    if (view === 'designer' && newView !== 'designer' && reportDefinition) {
      const updatedTemplate = {
        ...selectedTemplate,
        reportDefinition: reportDefinition
      };
      setSelectedTemplate(updatedTemplate);
    }
    
    // 处理切换到设计器视图的情况
    if (newView === 'designer') {
      toast({
        title: "正在准备",
        description: "PDF设计器正在加载中，请稍候",
      });
      
      const loaded = await preloadDesignerLibraries();
      
      if (loaded) {
        setView('designer' as ViewState);
      } else {
        toast({
          title: "加载错误",
          description: "无法加载PDF设计器，请刷新页面后重试",
          variant: "destructive",
        });
      }
    } else {
      // 切换到其他视图
      setView(newView as ViewState);
    }
  };

  // 渲染设计器视图
  const renderDesignerView = () => {
    if (isPreloading) {
      return (
        <div className="p-4 h-96 space-y-4">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-96 w-full" />
        </div>
      );
    }
    
    return (
      <ReportBroDesigner
        onSave={handleSaveReport}
        initialReport={selectedTemplate.reportDefinition}
      />
    );
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
          
          {view === 'designer' && renderDesignerView()}
          
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
