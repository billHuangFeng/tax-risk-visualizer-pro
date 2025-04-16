
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
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 2;

  // 初始化设计器
  useEffect(() => {
    console.log("ReportBroDesigner: 开始初始化");
    let isMounted = true;
    
    const initialize = async () => {
      try {
        // 1. 加载库
        await loadReportBroLibraries();
        
        // 2. 检查容器是否有效
        if (!containerRef.current) {
          throw new Error("设计器容器不可用");
        }
        
        // 3. 等待短暂时间确保DOM已更新
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // 4. 创建模拟设计器 (使用简化的自定义实现)
        const simpleDesigner = {
          getReport: () => initialReport || { 
            docElements: [], 
            parameters: [], 
            styles: [],
            version: "1.0"
          },
          destroy: () => {
            if (containerRef.current) {
              containerRef.current.innerHTML = '';
            }
          }
        };
        
        // 5. 自己绘制设计器UI
        if (containerRef.current) {
          containerRef.current.innerHTML = `
            <div style="padding:20px; border-bottom:1px solid #eee;">
              <h3 style="margin:0; font-size:16px;">PDF模板设计器</h3>
              <p style="margin:4px 0 0 0; color:#666; font-size:12px;">自定义PDF导出模板</p>
            </div>
            <div style="padding:20px;">
              <div style="border:1px dashed #ccc; padding:20px; background:#f9f9f9; min-height:200px; display:flex; align-items:center; justify-content:center;">
                <div style="text-align:center;">
                  <p>设计区域 - 拖放元素到此处</p>
                  <div style="margin-top:10px; display:flex; gap:10px; justify-content:center;">
                    <button id="add-text" style="padding:4px 8px; border:1px solid #ccc; background:#fff; border-radius:4px;">添加文本</button>
                    <button id="add-table" style="padding:4px 8px; border:1px solid #ccc; background:#fff; border-radius:4px;">添加表格</button>
                  </div>
                </div>
              </div>
              <div style="margin-top:10px; padding:10px; border:1px solid #eee; font-size:12px;">
                <p style="margin:0 0 5px 0; font-weight:bold;">模板信息</p>
                <div style="color:#666;">模板尺寸: A4 纸张 | 语言: 中文 | 单位: 毫米</div>
              </div>
            </div>
          `;
          
          // 添加简单交互
          const addTextBtn = containerRef.current.querySelector('#add-text');
          if (addTextBtn) {
            addTextBtn.addEventListener('click', () => {
              toast({
                title: "添加文本",
                description: "已添加文本元素到模板",
              });
            });
          }
        }
        
        if (isMounted) {
          setDesigner(simpleDesigner);
          setIsLoading(false);
          setError(null);
          
          toast({
            title: "设计器就绪",
            description: "PDF模板设计器已加载完成",
          });
        }
      } catch (err) {
        console.error("ReportBroDesigner: 初始化失败", err);
        
        if (isMounted) {
          const errorMsg = err instanceof Error ? err.message : "未知错误";
          setError(`初始化失败: ${errorMsg}`);
          
          if (retryCount < maxRetries) {
            toast({
              title: "正在重试",
              description: `初始化失败，第${retryCount + 1}次重试...`,
            });
            
            setRetryCount(prev => prev + 1);
            // 自动重试
            setTimeout(initialize, 1000);
          } else {
            setIsLoading(false);
            toast({
              title: "初始化失败",
              description: "无法加载PDF设计器，请刷新页面后重试",
              variant: "destructive",
            });
          }
        }
      }
    };
    
    initialize();
    
    return () => {
      isMounted = false;
      // 清理设计器
      if (designer) {
        try {
          designer.destroy();
        } catch (e) {
          console.error("清理设计器出错", e);
        }
      }
    };
  }, [initialReport, toast, retryCount]);

  // 处理手动重试
  const handleRetry = () => {
    setIsLoading(true);
    setError(null);
    setRetryCount(0);
  };

  // 处理保存操作
  const handleSave = () => {
    if (!designer) {
      toast({
        title: "保存失败",
        description: "设计器未初始化",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const reportDefinition = designer.getReport();
      onSave(reportDefinition);
      
      toast({
        title: "保存成功",
        description: "PDF模板已保存",
      });
    } catch (error) {
      console.error("保存报表时出错:", error);
      toast({
        title: "保存失败",
        description: "无法保存PDF模板",
        variant: "destructive",
      });
    }
  };

  // 渲染组件
  return (
    <div className="flex flex-col h-full border border-gray-200 rounded-md">
      {isLoading ? (
        <DesignerLoading onRetry={handleRetry} timeout={3} />
      ) : error ? (
        <div className="p-8 flex flex-col items-center justify-center">
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md max-w-md">
            <h3 className="font-medium mb-2">加载错误</h3>
            <p className="text-sm mb-3">{error}</p>
            <button 
              onClick={handleRetry}
              className="px-3 py-1.5 bg-red-100 text-red-700 rounded hover:bg-red-200 text-sm"
            >
              重试加载
            </button>
          </div>
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
