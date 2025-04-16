
import React, { useEffect, useRef, useState } from 'react';
import { loadReportBroLibraries } from '@/utils/reportbro-loader';
import { useToast } from '@/hooks/use-toast';
import { DesignerLoading } from './DesignerLoading';
import { DesignerToolbar } from './DesignerToolbar';
import { DesignerContainer } from './DesignerContainer';

interface ReportBroDesignerProps {
  onSave: (reportDefinition: any) => void;
  initialReport?: any;
}

export const ReportBroDesigner: React.FC<ReportBroDesignerProps> = ({ 
  onSave, 
  initialReport 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [designer, setDesigner] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    let isMounted = true;
    
    const initDesigner = async () => {
      try {
        if (!containerRef.current) {
          console.log("设计器容器未准备好，等待DOM加载");
          return;
        }

        setIsLoading(true);
        console.log("开始加载PDF设计器库");
        await loadReportBroLibraries();
        
        if (!isMounted) return;
        
        if (!containerRef.current || !document.body.contains(containerRef.current)) {
          console.log("初始化时设计器容器已被移除");
          return;
        }
        
        console.log("创建设计器实例");
        const rbDesigner = new window.ReportBroDesigner(
          containerRef.current, 
          {},
          initialReport || null
        );
        
        setDesigner(rbDesigner);
        setIsLoading(false);
        console.log("PDF设计器初始化完成");
      } catch (error) {
        console.error("PDF设计器初始化失败:", error);
        if (isMounted) {
          setIsLoading(false);
          toast({
            title: "初始化错误",
            description: "PDF设计器初始化失败，请尝试刷新页面",
            variant: "destructive",
          });
        }
      }
    };

    const timer = setTimeout(() => {
      initDesigner();
    }, 100);
    
    return () => {
      isMounted = false;
      clearTimeout(timer);
      
      if (designer) {
        try {
          designer.destroy();
        } catch (e) {
          console.error("销毁设计器时出错", e);
        }
      }
    };
  }, [initialReport, toast]);

  const handleSave = () => {
    if (designer) {
      try {
        const reportDefinition = designer.getReport();
        onSave(reportDefinition);
        
        toast({
          title: "保存成功",
          description: "PDF模板已成功保存",
        });
      } catch (error) {
        console.error("保存报表时出错:", error);
        toast({
          title: "保存失败",
          description: "无法保存PDF模板，请稍后重试",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="flex flex-col h-full">
      {isLoading ? (
        <DesignerLoading />
      ) : (
        <>
          <DesignerToolbar onSave={handleSave} />
          <DesignerContainer containerRef={containerRef} />
        </>
      )}
    </div>
  );
};
