
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

  useEffect(() => {
    let isMounted = true;
    
    const initReportBro = async () => {
      try {
        setIsLoading(true);
        setLoadError(null);
        
        // 加载ReportBro相关库
        await loadReportBroLibraries();
        
        if (!isMounted) return;
        
        // 确保库已加载
        if (!window.ReportBroDesigner || !window.$) {
          throw new Error('ReportBro 库未正确加载');
        }
        
        console.log("ReportBro libraries loaded successfully, initializing designer");
        
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
              // 更多中文翻译...
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
        
        // 检查DOM是否已准备好
        if (!containerRef.current) {
          throw new Error('设计器容器未准备好');
        }
        
        // 等待浏览器渲染循环
        setTimeout(() => {
          try {
            if (!isMounted) return;
            
            // 创建设计器实例
            console.log("Creating ReportBro designer instance");
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
            }
          }
        }, 100);
      } catch (error) {
        console.error("Error loading ReportBro:", error);
        if (isMounted) {
          setLoadError(`ReportBro 加载失败: ${error instanceof Error ? error.message : String(error)}`);
          setIsLoading(false);
        }
      }
    };

    initReportBro();
    
    // 清理函数
    return () => {
      isMounted = false;
      if (designer) {
        try {
          designer.destroy();
        } catch (e) {
          console.error("Error destroying ReportBro designer", e);
        }
      }
    };
  }, [initialReport]);

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
            <Button 
              variant="outline" 
              onClick={() => window.location.reload()}
              className="mt-2"
            >
              重新加载页面
            </Button>
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
            className="w-full border border-gray-300 rounded" 
            style={{ height: '600px', minHeight: '600px' }}
          />
        </>
      )}
    </div>
  );
};
