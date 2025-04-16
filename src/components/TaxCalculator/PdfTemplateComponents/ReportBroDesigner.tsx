
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
  const mountedRef = useRef(true);
  const [initError, setInitError] = useState<string | null>(null);
  const [containerReady, setContainerReady] = useState(false);
  const initAttemptsRef = useRef(0);
  const maxInitAttempts = 3;

  // 组件挂载状态跟踪
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      
      // 清理设计器实例
      if (designer) {
        try {
          console.log("清理设计器实例");
          designer.destroy();
        } catch (e) {
          console.error("销毁设计器时出错", e);
        }
      }
    };
  }, [designer]);

  // 通知容器已就绪
  const handleContainerReady = () => {
    console.log("设计器容器准备就绪，可以初始化设计器");
    setContainerReady(true);
  };

  // 初始化设计器
  const initializeDesigner = async () => {
    if (!mountedRef.current || designerInitializedRef.current) return;
    if (initAttemptsRef.current >= maxInitAttempts) {
      setInitError(`多次初始化失败(${initAttemptsRef.current}/${maxInitAttempts})，请刷新页面重试`);
      setIsLoading(false);
      return;
    }

    initAttemptsRef.current += 1;
    console.log(`尝试初始化设计器 (${initAttemptsRef.current}/${maxInitAttempts})`);
    
    try {
      // 确保库已加载
      await loadReportBroLibraries();
      
      if (!mountedRef.current) return;
      
      // 验证容器元素
      if (!containerRef.current) {
        throw new Error("容器引用未设置");
      }
      
      if (!document.body.contains(containerRef.current)) {
        throw new Error("容器元素不在DOM树中");
      }
      
      // 确保容器已就绪且可见
      const containerElement = containerRef.current;
      const computedStyle = getComputedStyle(containerElement);
      
      console.log("容器状态:", {
        width: containerElement.offsetWidth,
        height: containerElement.offsetHeight,
        display: computedStyle.display,
        visibility: computedStyle.visibility,
        position: computedStyle.position,
        zIndex: computedStyle.zIndex,
        opacity: computedStyle.opacity
      });

      if (
        containerElement.offsetWidth === 0 || 
        containerElement.offsetHeight === 0 ||
        computedStyle.display === 'none' ||
        computedStyle.visibility === 'hidden' ||
        parseFloat(computedStyle.opacity) === 0
      ) {
        throw new Error("容器元素不可见或尺寸为零");
      }
      
      // 确保ReportBro库已正确加载
      if (!window.ReportBroDesigner) {
        throw new Error("ReportBro设计器库未加载");
      }
      
      // 创建简单的报表定义对象
      const reportDef = initialReport || { 
        docElements: [], 
        parameters: [], 
        styles: [],
        version: "1.0"
      };

      console.log("创建设计器实例...");
      
      // 给DOM一点时间完全准备好
      setTimeout(() => {
        try {
          if (!mountedRef.current) return;
          
          if (!containerRef.current || !document.body.contains(containerRef.current)) {
            throw new Error("延迟初始化时容器已不存在");
          }
          
          // 创建设计器实例
          const rbDesigner = new window.ReportBroDesigner(
            containerRef.current, 
            {}, 
            reportDef
          );
          
          // 更新状态
          designerInitializedRef.current = true;
          setDesigner(rbDesigner);
          setIsLoading(false);
          setInitError(null);
          
          console.log("设计器实例创建成功");
          
          toast({
            title: "设计器已就绪",
            description: "PDF模板设计器已成功加载",
          });
        } catch (delayedError) {
          if (!mountedRef.current) return;
          
          console.error("延迟初始化设计器失败:", delayedError);
          setInitError(delayedError instanceof Error ? delayedError.message : "创建设计器实例失败");
          setIsLoading(false);
          
          toast({
            title: "初始化错误",
            description: "无法创建设计器实例，请稍后重试",
            variant: "destructive",
          });
        }
      }, 300);
      
    } catch (error) {
      if (!mountedRef.current) return;
      
      console.error("设计器初始化时发生错误:", error);
      setInitError(error instanceof Error ? error.message : "初始化过程中发生错误");
      setIsLoading(false);
      
      toast({
        title: "初始化错误",
        description: `PDF设计器加载失败: ${error instanceof Error ? error.message : "未知错误"}`,
        variant: "destructive",
      });
    }
  };

  // 容器就绪后初始化设计器
  useEffect(() => {
    if (containerReady && !designerInitializedRef.current && mountedRef.current) {
      // 延迟初始化，确保DOM已完全渲染
      const timer = setTimeout(() => {
        initializeDesigner();
      }, 200);
      
      return () => {
        clearTimeout(timer);
      };
    }
  }, [containerReady]);

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

  const handleRetry = () => {
    setIsLoading(true);
    setInitError(null);
    designerInitializedRef.current = false;
    // 重置容器状态
    setContainerReady(false);
    
    // 给DOM一些时间重置
    setTimeout(() => {
      if (!mountedRef.current) return;
      setContainerReady(true);
    }, 300);
  };

  return (
    <div className="flex flex-col h-full border border-gray-200 rounded-md">
      {isLoading ? (
        <DesignerLoading />
      ) : initError ? (
        <div className="p-4 h-96 flex flex-col items-center justify-center">
          <div className="bg-red-100 border border-red-300 text-red-700 p-4 rounded-md mb-4 max-w-md">
            <h3 className="font-bold mb-2">初始化错误</h3>
            <p className="mb-2">{initError}</p>
            <p className="text-xs text-red-500">
              尝试次数: {initAttemptsRef.current}/{maxInitAttempts}
            </p>
          </div>
          <button 
            onClick={handleRetry}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            重试加载
          </button>
        </div>
      ) : (
        <>
          <DesignerToolbar onSave={handleSave} />
          <DesignerContainer containerRef={containerRef} onReady={handleContainerReady} />
        </>
      )}
    </div>
  );
};
