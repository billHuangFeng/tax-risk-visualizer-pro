
import React, { useEffect, useRef, useState } from 'react';
import { loadReportBroLibraries } from '@/utils/reportbro-loader';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

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
  const [loadError, setLoadError] = useState<string | null>(null);
  const [designer, setDesigner] = useState<any>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [containerReady, setContainerReady] = useState(false);

  // First ensure the container is mounted and ready
  useEffect(() => {
    if (containerRef.current) {
      setContainerReady(true);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    let initTimeout: number | null = null;
    
    const initReportBro = async () => {
      try {
        if (!containerReady) {
          console.log("Container not ready yet, waiting...");
          return;
        }

        setIsLoading(true);
        setLoadError(null);
        
        // 加载ReportBro相关库
        await loadReportBroLibraries();
        
        if (!isMounted) return;
        
        // 确保库已加载
        if (!window.ReportBroDesigner || !window.$) {
          throw new Error('ReportBro 库未正确加载');
        }
        
        console.log("ReportBro libraries loaded successfully, waiting for DOM to be ready");
        
        // 增加一个较长的延迟，确保DOM完全准备好
        initTimeout = window.setTimeout(() => {
          try {
            if (!isMounted) return;
            
            // 额外检查容器是否已准备好
            if (!containerRef.current) {
              throw new Error('设计器容器未准备好');
            }
            
            // 确保容器有足够的尺寸和可见性
            const container = containerRef.current;
            container.style.display = 'block';
            container.style.height = '600px';
            container.style.minHeight = '600px';
            container.style.width = '100%';
            container.style.position = 'relative';
            container.style.visibility = 'visible';
            
            console.log("Creating ReportBro designer instance with container:", containerRef.current);
            
            // 基本配置
            const reportBroConfig = {
              // 设计器基本设置
              selectionColorLight: '#e0e0e0',
              selectionColor: '#cecece',
              initialReportZoom: 1,
              // 调整为中文界面
              locale: 'zh',
              localeStrings: {
                zh: {
                  ok: '确定',
                  cancel: '取消',
                  open: '打开',
                  save: '保存',
                  close: '关闭',
                  add: '添加',
                  delete: '删除',
                  edit: '编辑',
                  name: '名称',
                  type: '类型',
                  width: '宽度',
                  height: '高度'
                }
              }
            };
            
            // 创建设计器实例
            const rbDesigner = new window.ReportBroDesigner(
              containerRef.current, 
              reportBroConfig,
              initialReport || null
            );
            
            setDesigner(rbDesigner);
            setIsLoading(false);
            
            // 暴露到全局便于调试
            (window as any).reportBroDesigner = rbDesigner;
            
            console.log("ReportBro designer initialized successfully");
          } catch (err) {
            console.error("Error initializing ReportBro designer:", err);
            if (isMounted) {
              setLoadError(`ReportBro 设计器初始化失败: ${err instanceof Error ? err.message : String(err)}`);
              setIsLoading(false);
              
              // 如果尝试次数小于3次，则重试
              if (retryCount < 3) {
                setRetryCount(prev => prev + 1);
                // 延迟重试，给DOM更多时间准备
                setTimeout(() => {
                  if (isMounted) initReportBro();
                }, 2000); // 增加延迟时间
              }
            }
          }
        }, 1000); // 增加延迟，确保DOM完全渲染
      } catch (error) {
        console.error("Error loading ReportBro:", error);
        if (isMounted) {
          setLoadError(`ReportBro 加载失败: ${error instanceof Error ? error.message : String(error)}`);
          setIsLoading(false);
        }
      }
    };

    // 只有当容器准备好后再初始化
    if (containerReady) {
      initReportBro();
    }
    
    // 清理函数
    return () => {
      isMounted = false;
      if (initTimeout) clearTimeout(initTimeout);
      if (designer) {
        try {
          designer.destroy();
        } catch (e) {
          console.error("Error destroying ReportBro designer", e);
        }
      }
    };
  }, [initialReport, retryCount, containerReady]);

  // 保存报表定义
  const handleSave = () => {
    if (designer) {
      try {
        // 获取报表定义
        const reportDefinition = designer.getReport();
        
        // 调用保存回调
        onSave(reportDefinition);
      } catch (error) {
        console.error("Error saving report:", error);
      }
    }
  };

  // 手动重试加载
  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
  };

  return (
    <div className="flex flex-col h-full">
      {isLoading && (
        <div className="flex items-center justify-center h-64">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-center">正在加载ReportBro设计器...</p>
          </div>
        </div>
      )}
      
      {loadError && (
        <div className="flex items-center justify-center h-64 border border-red-300 bg-red-50 rounded p-4">
          <div className="flex flex-col items-center space-y-4">
            <p className="text-red-600 text-center">{loadError}</p>
            <div className="flex space-x-4">
              <Button 
                variant="outline" 
                onClick={handleRetry}
                className="mt-2"
              >
                重试加载
              </Button>
              <Button 
                variant="outline" 
                onClick={() => window.location.reload()}
                className="mt-2"
              >
                重新加载页面
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {!isLoading && !loadError && (
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
            id="reportbro-designer-container"
            className="w-full border border-gray-300 rounded flex-grow" 
            style={{ height: '600px', minHeight: '600px', display: 'block', visibility: 'visible' }}
          />
        </>
      )}
    </div>
  );
};
