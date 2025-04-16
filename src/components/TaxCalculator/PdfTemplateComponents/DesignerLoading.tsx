
import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

interface DesignerLoadingProps {
  timeout?: number;
}

export const DesignerLoading: React.FC<DesignerLoadingProps> = ({ timeout = 15 }) => {
  const [seconds, setSeconds] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prev => {
        if (prev < timeout) return prev + 1;
        return prev;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [timeout]);
  
  return (
    <div className="flex items-center justify-center h-64">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-center">正在加载设计器，请稍候...</p>
        {seconds >= 3 && (
          <p className="text-sm text-gray-500">
            {seconds >= timeout 
              ? "加载时间超过预期，可能需要刷新页面" 
              : `已等待 ${seconds} 秒`}
          </p>
        )}
      </div>
    </div>
  );
};
