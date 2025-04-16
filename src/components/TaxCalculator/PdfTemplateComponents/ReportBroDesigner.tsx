
import React, { useEffect, useRef, useState } from 'react';
import { loadReportBroLibraries } from '@/utils/reportbro-loader';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

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
  const [fallbackMode, setFallbackMode] = useState(false);

  // 立即检查容器是否准备好
  useEffect(() => {
    if (containerRef.current) {
      setContainerReady(true);
      
      // 预先设置容器样式，确保可见性
      const container = containerRef.current;
      container.style.display = 'block';
      container.style.height = '600px';
      container.style.minHeight = '600px';
      container.style.width = '100%';
      container.style.position = 'relative';
      container.style.visibility = 'visible';
      container.style.border = '1px solid #e5e7eb';
      container.style.borderRadius = '0.375rem';
      container.style.padding = '1rem';
    }
  }, []);

  // 创建简易设计器界面（回退模式）
  const createFallbackDesigner = () => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    
    // 创建简易设计器界面
    const fallbackUI = document.createElement('div');
    fallbackUI.className = 'p-4 space-y-4';
    fallbackUI.innerHTML = `
      <div class="text-lg font-semibold">简易PDF模板设计器</div>
      <div class="grid grid-cols-2 gap-4">
        <div class="border p-2 rounded">
          <div class="font-medium mb-2">页面设置</div>
          <div class="flex flex-col gap-2">
            <label class="text-sm">
              页面大小
              <select class="w-full p-1 border rounded text-sm">
                <option>A4</option>
                <option>Letter</option>
              </select>
            </label>
            <label class="text-sm">
              方向
              <select class="w-full p-1 border rounded text-sm">
                <option>纵向</option>
                <option>横向</option>
              </select>
            </label>
          </div>
        </div>
        <div class="border p-2 rounded">
          <div class="font-medium mb-2">内容元素</div>
          <div class="flex flex-col gap-2">
            <button class="p-1 border rounded text-sm bg-gray-50">添加文本</button>
            <button class="p-1 border rounded text-sm bg-gray-50">添加表格</button>
            <button class="p-1 border rounded text-sm bg-gray-50">添加图片</button>
          </div>
        </div>
      </div>
      <div class="border rounded p-2">
        <div class="font-medium mb-2">预览区域</div>
        <div class="h-40 bg-gray-50 flex items-center justify-center">
          <span class="text-gray-400">PDF模板预览</span>
        </div>
      </div>
    `;
    
    container.appendChild(fallbackUI);
  };

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
        
        // 设置加载超时
        const loadTimeout = setTimeout(() => {
          if (isMounted) {
            console.log("ReportBro loading timeout, switching to fallback mode");
            setFallbackMode(true);
            setIsLoading(false);
            createFallbackDesigner();
          }
        }, 8000); // 8秒后切换到回退模式
        
        // 加载ReportBro相关库
        await loadReportBroLibraries();
        
        // 清除加载超时
        clearTimeout(loadTimeout);
        
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
            setFallbackMode(false);
            
            // 暴露到全局便于调试
            (window as any).reportBroDesigner = rbDesigner;
            
            console.log("ReportBro designer initialized successfully");
          } catch (err) {
            console.error("Error initializing ReportBro designer:", err);
            if (isMounted) {
              setLoadError(`ReportBro 设计器初始化失败: ${err instanceof Error ? err.message : String(err)}`);
              setIsLoading(false);
              
              // 如果尝试次数小于3次，则重试
              if (retryCount < 2) {
                setRetryCount(prev => prev + 1);
                // 延迟重试，给DOM更多时间准备
                setTimeout(() => {
                  if (isMounted) initReportBro();
                }, 2000); // 增加延迟时间
              } else {
                // 尝试3次后切换到回退模式
                console.log("Max retries reached, switching to fallback mode");
                setFallbackMode(true);
                createFallbackDesigner();
              }
            }
          }
        }, 1000); // 增加延迟，确保DOM完全渲染
      } catch (error) {
        console.error("Error loading ReportBro:", error);
        if (isMounted) {
          setLoadError(`ReportBro 加载失败: ${error instanceof Error ? error.message : String(error)}`);
          setIsLoading(false);
          // 出错时切换到回退模式
          setFallbackMode(true);
          createFallbackDesigner();
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
    } else if (fallbackMode) {
      // 在回退模式下使用简单的报表定义
      const fallbackReport = {
        version: "1.0",
        styles: [],
        parameters: [],
        docElements: [
          {
            id: "text1", 
            type: "text",
            x: 0, 
            y: 0,
            width: 100,
            height: 20,
            content: "示例PDF模板"
          }
        ]
      };
      onSave(fallbackReport);
    }
  };

  // 手动重试加载
  const handleRetry = () => {
    setFallbackMode(false);
    setRetryCount(0);
    setIsLoading(true);
    
    // 短暂延迟后重试
    setTimeout(() => {
      setRetryCount(prev => prev + 1);
    }, 500);
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
      
      {loadError && !fallbackMode && (
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
                onClick={() => {
                  setFallbackMode(true);
                  createFallbackDesigner();
                }}
                className="mt-2"
              >
                使用简易设计器
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {!isLoading && (
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
