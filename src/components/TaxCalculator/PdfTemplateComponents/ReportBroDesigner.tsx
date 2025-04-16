
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

  // 组件挂载状态跟踪
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      
      // 清理设计器实例
      if (designer) {
        try {
          designer.destroy();
        } catch (e) {
          console.error("销毁设计器时出错", e);
        }
      }
    };
  }, [designer]);

  // 初始化设计器 - 使用延迟确保DOM完全渲染
  useEffect(() => {
    let initTimer: NodeJS.Timeout;
    
    const initializeDesigner = async () => {
      // 如果已初始化或组件已卸载，则不执行
      if (designerInitializedRef.current || !mountedRef.current) return;
      
      try {
        // 确保库已加载
        await loadReportBroLibraries();
        
        if (!mountedRef.current) return;
        
        // 重要：延迟初始化以确保DOM已完全渲染
        initTimer = setTimeout(async () => {
          try {
            // 二次检查组件是否仍然挂载
            if (!mountedRef.current) return;
            
            // 验证容器是否准备就绪
            if (!containerRef.current || !document.body.contains(containerRef.current)) {
              throw new Error("容器元素未就绪，无法初始化设计器");
            }
            
            // 确保ReportBro库已正确加载
            if (!window.ReportBroDesigner) {
              throw new Error("ReportBro设计器库未加载");
            }
            
            console.log("容器状态检查:", containerRef.current ? {
              width: containerRef.current.offsetWidth,
              height: containerRef.current.offsetHeight,
              visibility: getComputedStyle(containerRef.current).visibility,
              display: getComputedStyle(containerRef.current).display
            } : "容器不存在");
            
            // 使用简单的报表定义初始化
            const reportDef = initialReport || { 
              docElements: [], 
              parameters: [], 
              styles: [],
              version: "1.0"
            };
            
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
          } catch (error) {
            if (!mountedRef.current) return;
            
            console.error("设计器实例创建失败:", error);
            setIsLoading(false);
            setInitError(error instanceof Error ? error.message : "未知错误");
            
            toast({
              title: "初始化错误",
              description: "无法创建设计器实例: " + (error instanceof Error ? error.message : "未知错误"),
              variant: "destructive",
            });
          }
        }, 500); // 增加延迟以确保DOM渲染
        
      } catch (error) {
        if (!mountedRef.current) return;
        
        console.error("设计器初始化库加载失败:", error);
        setIsLoading(false);
        setInitError(error instanceof Error ? error.message : "未知错误");
        
        toast({
          title: "初始化错误",
          description: "PDF设计器初始化失败: " + (error instanceof Error ? error.message : "未知错误"),
          variant: "destructive",
        });
      }
    };
    
    // 开始初始化流程 - 小延迟确保DOM已渲染
    setTimeout(initializeDesigner, 100);
    
    // 清理函数
    return () => {
      clearTimeout(initTimer);
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

  const handleRetry = () => {
    setIsLoading(true);
    setInitError(null);
    designerInitializedRef.current = false;
    // 延迟一点重新渲染DOM
    setTimeout(() => {
      if (!mountedRef.current) return;
      // 触发重新渲染以重置容器
      setIsLoading(true);
    }, 100);
  };

  return (
    <div className="flex flex-col h-full border border-gray-200 rounded-md">
      {isLoading ? (
        <DesignerLoading />
      ) : initError ? (
        <div className="p-4 h-96 flex flex-col items-center justify-center">
          <div className="bg-red-100 border border-red-300 text-red-700 p-4 rounded-md mb-4 max-w-md">
            <h3 className="font-bold mb-2">初始化错误</h3>
            <p>{initError}</p>
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
          <DesignerContainer containerRef={containerRef} />
        </>
      )}
    </div>
  );
};
