
import React, { useState, useEffect } from 'react';
import { Loader2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DesignerLoadingProps {
  timeout?: number;
  onRetry?: () => void;
}

export const DesignerLoading: React.FC<DesignerLoadingProps> = ({ 
  timeout = 3, // 更短的超时时间
  onRetry 
}) => {
  const [seconds, setSeconds] = useState(0);
  const [showRetry, setShowRetry] = useState(false);
  
  useEffect(() => {
    console.log("DesignerLoading: 开始计时", { timeout });
    const timer = setInterval(() => {
      setSeconds(prev => {
        const newValue = prev + 1;
        if (newValue >= timeout) {
          console.log("DesignerLoading: 达到超时时间，显示重试按钮");
          setShowRetry(true);
          clearInterval(timer);
        }
        return newValue;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [timeout]);
  
  const handleRetry = () => {
    console.log("DesignerLoading: 用户点击重试");
    setSeconds(0);
    setShowRetry(false);
    
    if (onRetry) {
      onRetry();
    } else {
      // 备用重试方法
      window.location.reload();
    }
  };
  
  return (
    <div className="flex items-center justify-center h-96 p-8">
      <div className="flex flex-col items-center space-y-4 max-w-md text-center">
        {!showRetry && (
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        )}
        
        <p className="text-lg font-medium">
          {showRetry ? "加载超时" : "正在加载设计器，请稍候..."}
        </p>
        
        {seconds > 0 && !showRetry && (
          <p className="text-sm text-gray-500">
            已等待 {seconds} 秒 (最多 {timeout} 秒)
          </p>
        )}
        
        {showRetry && (
          <div className="space-y-3 border border-amber-200 bg-amber-50 p-4 rounded-md mt-2">
            <p className="text-sm text-amber-700 font-medium">
              PDF设计器加载失败，可能原因：
            </p>
            <ul className="text-xs text-gray-600 list-disc pl-5 text-left space-y-1">
              <li>浏览器兼容性问题</li>
              <li>网络连接问题</li>
              <li>设计器库加载错误</li>
            </ul>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRetry}
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              刷新重试
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
