
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
  const designerInitializedRef = useRef(false);

  // 确保设计器库已加载
  useEffect(() => {
    let isMounted = true;
    
    const preloadLibraries = async () => {
      try {
        await loadReportBroLibraries();
        console.log("PDF设计器库预加载成功");
      } catch (error) {
        console.error("PDF设计器库预加载失败:", error);
      }
    };

    preloadLibraries();
    
    return () => {
      isMounted = false;
    };
  }, []);
  
  // 初始化设计器实例
  useEffect(() => {
    let isMounted = true;
    let rbDesigner: any = null;
    
    const initDesigner = async () => {
      // 防止重复初始化
      if (designerInitializedRef.current) {
        console.log("设计器已初始化，跳过");
        return;
      }
      
      if (!containerRef.current) {
        console.log("容器元素未就绪，10ms后重试");
        setTimeout(initDesigner, 10);
        return;
      }
      
      try {
        setIsLoading(true);
        console.log("开始初始化设计器");
        
        // 确保设计器库已加载
        if (!window.ReportBroDesigner) {
          console.log("重新加载设计器库");
          await loadReportBroLibraries();
        }
        
        if (!isMounted) return;
        
        // 再次检查容器
        if (!containerRef.current || !document.body.contains(containerRef.current)) {
          console.error("容器已被移除或不在DOM中");
          return;
        }
        
        console.log("创建设计器实例，容器:", containerRef.current);
        rbDesigner = new window.ReportBroDesigner(
          containerRef.current, 
          {},
          initialReport || null
        );
        
        if (isMounted) {
          designerInitializedRef.current = true;
          setDesigner(rbDesigner);
          setIsLoading(false);
          console.log("设计器实例创建成功");
        }
      } catch (error) {
        console.error("设计器初始化失败:", error);
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

    // 延迟初始化以确保DOM已准备好
    const timer = setTimeout(() => {
      initDesigner();
    }, 300);
    
    return () => {
      isMounted = false;
      clearTimeout(timer);
      
      if (rbDesigner) {
        try {
          rbDesigner.destroy();
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
    <div className="flex flex-col h-full border border-gray-200 rounded-md">
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
