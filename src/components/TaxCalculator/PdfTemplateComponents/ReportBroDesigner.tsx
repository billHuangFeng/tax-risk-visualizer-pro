
import React, { useEffect, useRef, useState } from 'react';
import { loadReportBroLibraries } from '@/utils/reportbro-loader';

interface ReportBroDesignerProps {
  onSave: (reportDefinition: any) => void;
  initialReport?: any;
}

export const ReportBroDesigner: React.FC<ReportBroDesignerProps> = ({ 
  onSave, 
  initialReport 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [designer, setDesigner] = useState<any>(null);

  useEffect(() => {
    const init = async () => {
      try {
        // 加载ReportBro相关库
        await loadReportBroLibraries();
        setIsLoaded(true);
      } catch (error) {
        console.error("Failed to load ReportBro:", error);
      }
    };

    init();
  }, []);

  useEffect(() => {
    // 当库加载完成且DOM准备好时，初始化设计器
    if (isLoaded && containerRef.current && window.ReportBroDesigner) {
      try {
        // 基本配置
        const reportBroConfig = {
          // 设计器基本设置
          elementProperties: {
            // 调整为中文界面
            labelTop: '顶部',
            labelBottom: '底部',
            labelLeft: '左侧',
            labelRight: '右侧',
          },
          // 可以添加更多配置...
        };
        
        // 创建设计器实例
        const rbDesigner = new window.ReportBroDesigner(
          containerRef.current, 
          reportBroConfig,
          initialReport || null
        );
        
        setDesigner(rbDesigner);
        
        // 暴露到全局便于调试
        (window as any).reportBroDesigner = rbDesigner;
        
        // 清理函数
        return () => {
          if (rbDesigner) {
            try {
              rbDesigner.destroy();
            } catch (e) {
              console.error("Error destroying ReportBro designer", e);
            }
          }
        };
      } catch (error) {
        console.error("Error initializing ReportBro designer:", error);
      }
    }
  }, [isLoaded, initialReport]);

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
      {!isLoaded && (
        <div className="flex items-center justify-center h-64">
          <p>正在加载ReportBro设计器...</p>
        </div>
      )}
      
      <div className="flex justify-end mb-4">
        <button 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleSave}
        >
          保存模板
        </button>
      </div>
      
      <div 
        ref={containerRef} 
        className="w-full border border-gray-300 rounded" 
        style={{ height: '600px', minHeight: '600px' }}
      />
    </div>
  );
};
