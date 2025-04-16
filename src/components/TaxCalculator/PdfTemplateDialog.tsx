
import React, { useState, useEffect } from 'react';
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
  const [isPreloading, setIsPreloading] = useState(true);
  const { toast } = useToast();
  
  // 对话框打开时立即开始预加载
  useEffect(() => {
    if (open) {
      setIsPreloading(true);
      
      // 启动预加载过程
      const preloadDesigner = async () => {
        try {
          await loadReportBroLibraries();
          console.log("PDF设计器库预加载成功");
          setDesignerLoaded(true);
        } catch (error) {
          console.error("PDF设计器库预加载失败:", error);
          toast({
            title: "加载错误",
            description: "无法加载PDF设计器，请刷新页面后重试",
            variant: "destructive",
          });
        } finally {
          setIsPreloading(false);
        }
      };
      
      preloadDesigner();
    }
  }, [open, toast]);
  
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

  const handleViewChange = (newView: string) => {
    // 如果用户想要打开设计器视图，但设计器尚未加载
    if (newView === 'designer' && !designerLoaded) {
      toast({
        title: "正在加载",
        description: "PDF设计器正在加载中，请稍候",
      });
      
      // 仍然切换视图，但显示加载状态
      setView(newView as ViewState);
      
      // 确保库加载
      loadReportBroLibraries()
        .then(() => {
          console.log("PDF设计器库加载成功");
          setDesignerLoaded(true);
        })
        .catch(error => {
          console.error("PDF设计器库加载失败:", error);
          toast({
            title: "加载错误",
            description: "无法加载PDF设计器，请刷新页面后重试",
            variant: "destructive",
          });
          // 如果加载失败，返回到选择视图
          setView('select');
        });
    } else {
      // 如果当前视图是设计器，并且用户选择了另一个视图，则保存当前设计
      if (view === 'designer' && reportDefinition && newView !== 'designer') {
        const updatedTemplate = {
          ...selectedTemplate,
          reportDefinition: reportDefinition
        };
        setSelectedTemplate(updatedTemplate);
      }
      
      // 切换视图
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
          
          {view === 'designer' && isPreloading && (
            <div className="p-4 h-96">
              <div className="space-y-4">
                <Skeleton className="h-8 w-40" />
                <Skeleton className="h-96 w-full" />
              </div>
            </div>
          )}
          
          {view === 'designer' && !isPreloading && (
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
