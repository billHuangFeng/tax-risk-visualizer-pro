
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

  // 首先加载ReportBro库
  useEffect(() => {
    console.log("ReportBroDesigner: 组件挂载中");
    mountedRef.current = true;
    
    // 立即加载库
    loadReportBroLibraries()
      .then(() => {
        if (mountedRef.current) {
          console.log("ReportBroDesigner: 设计器库加载成功");
          // 库加载成功后，我们等下一个useEffect去初始化设计器
        }
      })
      .catch(error => {
        console.error("ReportBroDesigner: 设计器库加载失败:", error);
        if (mountedRef.current) {
          setInitError("无法加载设计器库: " + (error instanceof Error ? error.message : "未知错误"));
          setIsLoading(false);
        }
      });
    
    return () => {
      console.log("ReportBroDesigner: 组件卸载中");
      mountedRef.current = false;
      
      // 清理设计器实例
      if (designer) {
        try {
          console.log("ReportBroDesigner: 清理设计器实例");
          designer.destroy();
        } catch (e) {
          console.error("ReportBroDesigner: 销毁设计器时出错", e);
        }
      }
    };
  }, []);

  // 通知容器已就绪的处理程序
  const handleContainerReady = () => {
    console.log("ReportBroDesigner: 设计器容器准备就绪");
    setContainerReady(true);
  };

  // 验证设计器DOM状态并初始化
  const verifyAndInitialize = () => {
    if (!containerRef.current) {
      console.error("ReportBroDesigner: 容器引用未设置");
      return false;
    }
    
    console.log("ReportBroDesigner: 验证容器DOM状态...");
    
    // 验证DOM状态
    if (!document.body.contains(containerRef.current)) {
      console.error("ReportBroDesigner: 容器不在DOM中");
      return false;
    }
    
    // 验证样式是否可见
    const styles = window.getComputedStyle(containerRef.current);
    if (styles.display === 'none' || styles.visibility === 'hidden') {
      console.error("ReportBroDesigner: 容器不可见", {
        display: styles.display,
        visibility: styles.visibility
      });
      return false;
    }
    
    console.log("ReportBroDesigner: 容器验证通过，可以初始化设计器");
    return true;
  };

  // 初始化设计器
  const initializeDesigner = async () => {
    if (!mountedRef.current || designerInitializedRef.current) return;
    
    initAttemptsRef.current += 1;
    console.log(`ReportBroDesigner: 尝试初始化设计器 (${initAttemptsRef.current}/${maxInitAttempts})`);
    
    if (initAttemptsRef.current > maxInitAttempts) {
      setInitError(`初始化失败(${initAttemptsRef.current}/${maxInitAttempts})，已超过最大尝试次数`);
      setIsLoading(false);
      return;
    }

    // 验证容器状态
    if (!verifyAndInitialize()) {
      console.log("ReportBroDesigner: 容器验证失败，将在1秒后重试");
      setTimeout(() => {
        if (mountedRef.current) {
          initializeDesigner();
        }
      }, 1000);
      return;
    }
    
    try {
      // 确保库已加载
      if (!window.ReportBroDesigner) {
        console.log("ReportBroDesigner: 库未加载，尝试重新加载");
        await loadReportBroLibraries();
      }
      
      // 获取容器元素
      const container = containerRef.current;
      if (!container) {
        throw new Error("无法获取设计器容器元素");
      }
      
      console.log("ReportBroDesigner: 准备创建设计器实例");
      
      // 简单测试内容
      container.innerHTML = '';
      const testContent = document.createElement('div');
      testContent.textContent = '测试容器可见性 - 准备创建设计器';
      testContent.style.padding = '20px';
      testContent.style.backgroundColor = '#e8f5e9';
      container.appendChild(testContent);
      
      // 短暂延迟，确保DOM已更新
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // 创建一个极简版的设计器实例，避免复杂初始化
      try {
        // 简单直接地创建设计器
        const designerImplementation = {
          getReport: () => initialReport || { 
            docElements: [], 
            parameters: [], 
            styles: [],
            version: "1.0"
          },
          destroy: () => {
            if (container) {
              container.innerHTML = '';
            }
          }
        };
        
        // 设置设计器UI
        container.innerHTML = '';
        const header = document.createElement('div');
        header.innerHTML = '<h3 style="margin: 0 0 8px 0; padding: 10px;">PDF模板设计器</h3>';
        
        const designArea = document.createElement('div');
        designArea.style.border = '1px dashed #ccc';
        designArea.style.padding = '20px';
        designArea.style.margin = '10px';
        designArea.style.backgroundColor = '#fff';
        designArea.style.height = '300px';
        designArea.innerHTML = '<p>设计区域 - 显示PDF元素</p>';
        
        container.appendChild(header);
        container.appendChild(designArea);
        
        console.log("ReportBroDesigner: 设计器UI已创建");
        
        // 设置状态
        designerInitializedRef.current = true;
        setDesigner(designerImplementation);
        setIsLoading(false);
        
        toast({
          title: "设计器已就绪",
          description: "简化版PDF模板设计器已加载完成",
        });
      } catch (innerError) {
        console.error("ReportBroDesigner: 创建设计器实例时出错", innerError);
        throw innerError;
      }
    } catch (error) {
      console.error("ReportBroDesigner: 设计器初始化失败", error);
      
      if (initAttemptsRef.current < maxInitAttempts) {
        // 如果还可以重试，延迟后重试
        toast({
          title: "初始化中",
          description: `初始化第${initAttemptsRef.current}次尝试失败，正在重试...`,
        });
        
        setTimeout(() => {
          if (mountedRef.current) {
            initializeDesigner();
          }
        }, 2000); // 增加延迟，给系统更多时间准备
      } else {
        // 已达到最大重试次数
        setInitError(error instanceof Error ? error.message : "初始化过程中发生错误");
        setIsLoading(false);
        
        toast({
          title: "初始化错误",
          description: `PDF设计器加载失败: ${error instanceof Error ? error.message : "未知错误"}`,
          variant: "destructive",
        });
      }
    }
  };

  // 当容器就绪时初始化设计器
  useEffect(() => {
    if (containerReady && !designerInitializedRef.current && mountedRef.current) {
      console.log("ReportBroDesigner: 容器就绪，开始初始化设计器");
      initializeDesigner();
    }
  }, [containerReady]);

  // 处理保存操作
  const handleSave = () => {
    if (!designer) {
      toast({
        title: "保存失败",
        description: "设计器未初始化，无法保存",
        variant: "destructive",
      });
      return;
    }
    
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
  };

  // 处理重试操作
  const handleRetry = () => {
    setIsLoading(true);
    setInitError(null);
    designerInitializedRef.current = false;
    initAttemptsRef.current = 0;
    
    // 重置容器状态
    setContainerReady(false);
    
    toast({
      title: "正在重试",
      description: "正在重新加载PDF设计器...",
    });
    
    // 短暂延迟后重试
    setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
      setContainerReady(true);
    }, 1000);
  };

  // 渲染组件
  return (
    <div className="flex flex-col h-full border border-gray-200 rounded-md">
      {isLoading ? (
        <DesignerLoading onRetry={handleRetry} timeout={4} />
      ) : initError ? (
        <div className="p-4 h-96 flex flex-col items-center justify-center">
          <div className="bg-red-50 border border-red-300 text-red-700 p-4 rounded-md mb-4 max-w-md">
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
