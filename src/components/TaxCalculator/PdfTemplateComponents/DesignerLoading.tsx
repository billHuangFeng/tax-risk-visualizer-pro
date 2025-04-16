
import React, { useState, useEffect } from 'react';
import { Loader2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DesignerLoadingProps {
  timeout?: number;
  onRetry?: () => void;
}

export const DesignerLoading: React.FC<DesignerLoadingProps> = ({ 
  timeout = 5, // 更短的超时时间，提高用户体验
  onRetry 
}) => {
  const [seconds, setSeconds] = useState(0);
  const [showRetry, setShowRetry] = useState(false);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prev => {
        const newValue = prev + 1;
        if (newValue >= timeout) {
          setShowRetry(true);
          clearInterval(timer); // 到达超时时停止计时
        }
        return newValue;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [timeout]);
  
  const handleRetry = () => {
    setSeconds(0);
    setShowRetry(false);
    
    if (onRetry) {
      onRetry();
    } else {
      // 刷新页面是次要备用方案
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
        
        {seconds >= 2 && !showRetry && (
          <p className="text-sm text-amber-600">
            加载时间超过预期，请检查网络或浏览器兼容性...
          </p>
        )}
        
        {showRetry && (
          <div className="space-y-3 border border-amber-200 bg-amber-50 p-4 rounded-md mt-2">
            <p className="text-sm text-amber-700 font-medium">
              加载时间过长，设计器可能遇到了问题
            </p>
            <p className="text-xs text-gray-600">
              这可能是由于浏览器兼容性问题或网络连接问题导致的。您可以尝试刷新重试，或切换到简化模式。
            </p>
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
