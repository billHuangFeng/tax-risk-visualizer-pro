
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
  const maxInitAttempts = 10;

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
    let initTimer: NodeJS.Timeout;
    
    const initDesigner = async () => {
      // 增加重试计数
      initAttemptsRef.current += 1;
      
      // 防止重复初始化
      if (designerInitializedRef.current) {
        console.log("设计器已初始化，跳过");
        setIsLoading(false);
        return;
      }
      
      // 检查容器
      if (!containerRef.current || !document.body.contains(containerRef.current)) {
        console.log(`容器元素未就绪或不在DOM中，尝试 ${initAttemptsRef.current}/${maxInitAttempts}`);
        
        // 如果超过最大尝试次数，显示错误
        if (initAttemptsRef.current >= maxInitAttempts) {
          console.error("初始化尝试次数过多，放弃");
          if (isMounted) {
            setIsLoading(false);
            toast({
              title: "加载失败",
              description: "无法初始化设计器，请刷新页面重试",
              variant: "destructive",
            });
          }
          return;
        }
        
        // 稍后重试
        initTimer = setTimeout(initDesigner, 100 * Math.min(initAttemptsRef.current, 5));
        return;
      }
      
      try {
        console.log("开始初始化设计器", containerRef.current);
        
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
        
        // 确保容器是可见的
        if (containerRef.current) {
          containerRef.current.style.display = 'block';
        }
        
        // 短暂延迟以确保DOM完全就绪
        await new Promise(resolve => setTimeout(resolve, 50));
        
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

    // 添加一个延迟以确保DOM已准备好
    const timer = setTimeout(() => {
      initDesigner();
    }, 300);
    
    return () => {
      isMounted = false;
      clearTimeout(timer);
      clearTimeout(initTimer);
      
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
