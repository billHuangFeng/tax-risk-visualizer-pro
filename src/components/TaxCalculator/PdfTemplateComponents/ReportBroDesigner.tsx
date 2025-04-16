
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
  const initAttemptsRef = useRef(0);
  const maxInitAttempts = 5;
  const isFirstRender = useRef(true);

  // 确保设计器库已加载
  useEffect(() => {
    let mounted = true;
    
    const loadLibraries = async () => {
      try {
        await loadReportBroLibraries();
        if (mounted) {
          console.log("PDF设计器库加载成功");
          // 库加载成功后，给DOM有时间完全渲染
          setTimeout(() => {
            if (mounted) initializeDesigner();
          }, 300);
        }
      } catch (error) {
        console.error("PDF设计器库加载失败:", error);
        if (mounted) {
          setIsLoading(false);
          toast({
            title: "加载失败",
            description: "无法加载PDF设计器库，请刷新页面重试",
            variant: "destructive",
          });
        }
      }
    };

    if (isFirstRender.current) {
      isFirstRender.current = false;
      loadLibraries();
    }
    
    return () => {
      mounted = false;
    };
  }, [toast]);
  
  // 初始化设计器实例
  const initializeDesigner = () => {
    if (designerInitializedRef.current) {
      console.log("设计器已初始化，跳过");
      setIsLoading(false);
      return;
    }

    initAttemptsRef.current += 1;
    
    if (!containerRef.current || !document.body.contains(containerRef.current)) {
      console.log(`容器元素未就绪，尝试 ${initAttemptsRef.current}/${maxInitAttempts}`);
      
      if (initAttemptsRef.current >= maxInitAttempts) {
        console.error("初始化尝试次数过多，放弃");
        setIsLoading(false);
        toast({
          title: "加载失败",
          description: "无法初始化设计器，请刷新页面重试",
          variant: "destructive",
        });
        return;
      }
      
      // 稍后重试
      setTimeout(initializeDesigner, 500);
      return;
    }
    
    try {
      console.log("开始初始化设计器，容器:", containerRef.current);
      
      if (!window.ReportBroDesigner) {
        throw new Error("ReportBro设计器库未加载");
      }
      
      // 确保容器是可见的
      if (containerRef.current) {
        containerRef.current.style.display = 'block';
        containerRef.current.style.visibility = 'visible';
      }
      
      // 使用简单的空报表定义来初始化
      const emptyReport = initialReport || { 
        docElements: [], 
        parameters: [], 
        styles: [],
        version: "1.0"
      };
      
      const rbDesigner = new window.ReportBroDesigner(
        containerRef.current, 
        {}, // 空选项
        emptyReport
      );
      
      designerInitializedRef.current = true;
      setDesigner(rbDesigner);
      setIsLoading(false);
      console.log("设计器实例创建成功");
    } catch (error) {
      console.error("设计器初始化失败:", error);
      setIsLoading(false);
      toast({
        title: "初始化错误",
        description: "PDF设计器初始化失败：" + (error instanceof Error ? error.message : "未知错误"),
        variant: "destructive",
      });
    }
  };

  // 在组件卸载时清理
  useEffect(() => {
    return () => {
      if (designer) {
        try {
          designer.destroy();
        } catch (e) {
          console.error("销毁设计器时出错", e);
        }
      }
    };
  }, [designer]);

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
