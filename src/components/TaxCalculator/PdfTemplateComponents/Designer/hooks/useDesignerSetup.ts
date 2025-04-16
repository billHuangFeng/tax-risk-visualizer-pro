
import { useEffect, useRef, useState } from 'react';
import { loadReportBroLibraries } from '@/utils/reportbro-loader';
import { useToast } from '@/hooks/use-toast';

export const useDesignerSetup = (initialReport?: any) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 2;

  useEffect(() => {
    let isMounted = true;
    
    const initialize = async () => {
      try {
        await loadReportBroLibraries();
        
        if (!containerRef.current) {
          throw new Error("设计器容器不可用");
        }
        
        if (isMounted) {
          setError(null);
          toast({
            title: "设计器就绪",
            description: "PDF模板设计器已加载完成",
          });
        }
      } catch (err) {
        if (isMounted) {
          const errorMsg = err instanceof Error ? err.message : "未知错误";
          setError(`初始化失败: ${errorMsg}`);
          
          if (retryCount < maxRetries) {
            setRetryCount(prev => prev + 1);
          }
        }
      }
    };
    
    initialize();
    
    return () => {
      isMounted = false;
    };
  }, [toast, retryCount, initialReport]);

  return { containerRef, error, retryCount };
};
