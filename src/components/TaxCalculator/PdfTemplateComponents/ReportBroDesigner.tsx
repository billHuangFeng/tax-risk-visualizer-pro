
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

  // 加载设计器库并初始化设计器
  useEffect(() => {
    let mounted = true;
    let initTimer: NodeJS.Timeout;
    
    const initializeDesigner = async () => {
      if (designerInitializedRef.current || !mounted) return;
      
      try {
        console.log("开始初始化设计器");
        
        // 确保库已加载
        await loadReportBroLibraries();
        
        if (!mounted) return;
        
        // 验证DOM容器是否有效
        if (!containerRef.current || !document.body.contains(containerRef.current)) {
          initAttemptsRef.current += 1;
          if (initAttemptsRef.current < maxInitAttempts) {
            console.log(`容器元素未就绪，尝试 ${initAttemptsRef.current}/${maxInitAttempts}`);
            // 稍后重试
            initTimer = setTimeout(initializeDesigner, 300);
            return;
          } else {
            throw new Error("容器元素未就绪，初始化失败");
          }
        }
        
        // 确保ReportBro库已加载并可用
        if (!window.ReportBroDesigner) {
          throw new Error("ReportBro设计器库未加载");
        }
        
        // 创建设计器实例
        const container = containerRef.current;
        console.log("设计器容器就绪", container, {
          width: container.offsetWidth,
          height: container.offsetHeight,
          display: getComputedStyle(container).display,
          visibility: getComputedStyle(container).visibility
        });
        
        // 使用简单的空报表定义来初始化
        const reportDef = initialReport || { 
          docElements: [], 
          parameters: [], 
          styles: [],
          version: "1.0"
        };
        
        // 延迟一点再初始化，确保DOM已经完全渲染
        setTimeout(() => {
          if (!mounted) return;
          
          try {
            const rbDesigner = new window.ReportBroDesigner(container, {}, reportDef);
            
            designerInitializedRef.current = true;
            console.log("设计器实例创建成功");
            
            setDesigner(rbDesigner);
            setIsLoading(false);
          } catch (error) {
            console.error("设计器实例创建失败:", error);
            setIsLoading(false);
            toast({
              title: "初始化错误",
              description: "无法创建设计器实例，请刷新页面重试",
              variant: "destructive",
            });
          }
        }, 500);
        
      } catch (error) {
        if (!mounted) return;
        
        console.error("设计器初始化过程出错:", error);
        setIsLoading(false);
        toast({
          title: "初始化错误",
          description: "PDF设计器初始化失败：" + (error instanceof Error ? error.message : "未知错误"),
          variant: "destructive",
        });
      }
    };
    
    // 开始初始化流程
    initializeDesigner();
    
    // 清理函数
    return () => {
      mounted = false;
      clearTimeout(initTimer);
      
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
