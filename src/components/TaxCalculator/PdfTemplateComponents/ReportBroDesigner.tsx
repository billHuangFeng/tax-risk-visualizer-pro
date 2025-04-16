
import React, { useEffect, useRef, useState } from 'react';
import { loadReportBroLibraries } from '@/utils/reportbro-loader';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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
        // 加载本地设计器库
        await loadReportBroLibraries();
        
        if (!isMounted) return;
        
        // 确保容器已准备好且依然在DOM中
        if (!containerRef.current || !document.body.contains(containerRef.current)) {
          console.log("初始化时设计器容器已被移除");
          return;
        }
        
        // 预先设置容器样式
        const container = containerRef.current;
        container.style.display = 'block';
        container.style.height = '600px';
        container.style.minHeight = '600px';
        container.style.width = '100%';
        container.style.position = 'relative';
        container.style.visibility = 'visible';
        container.style.border = '1px solid #e5e7eb';
        container.style.borderRadius = '0.375rem';
        
        console.log("创建设计器实例");
        
        // 创建设计器实例
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

    // 使用较短的延迟确保DOM已准备好
    const timer = setTimeout(() => {
      initDesigner();
    }, 100);
    
    return () => {
      isMounted = false;
      clearTimeout(timer);
      
      // 清理设计器实例
      if (designer) {
        try {
          designer.destroy();
        } catch (e) {
          console.error("销毁设计器时出错", e);
        }
      }
    };
  }, [initialReport, toast]);

  // 保存报表定义
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
        <div className="flex items-center justify-center h-64">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-center">正在加载设计器，请稍候...</p>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-end mb-4">
            <Button 
              onClick={handleSave}
              className="bg-primary text-white hover:bg-primary/90"
            >
              保存模板
            </Button>
          </div>
          
          <div 
            ref={containerRef} 
            className="w-full border border-gray-300 rounded-md flex-grow" 
            style={{ height: '600px', minHeight: '600px', display: 'block', position: 'relative' }}
          />
        </>
      )}
    </div>
  );
};
