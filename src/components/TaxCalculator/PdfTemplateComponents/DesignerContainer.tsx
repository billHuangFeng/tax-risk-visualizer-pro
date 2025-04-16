
import React, { useEffect } from 'react';

interface DesignerContainerProps {
  containerRef: React.RefObject<HTMLDivElement>;
  onReady?: () => void;
}

export const DesignerContainer = ({ containerRef, onReady }: DesignerContainerProps) => {
  // 确保DOM挂载后执行ready回调
  useEffect(() => {
    if (containerRef.current && onReady) {
      // 使用短延迟确保DOM已完全渲染
      setTimeout(() => {
        onReady();
      }, 100);
    }
  }, [containerRef, onReady]);
  
  return (
    <div 
      ref={containerRef}
      className="w-full border border-gray-200 rounded-md bg-white" 
      style={{ 
        minHeight: '500px',
        height: '500px',
        position: 'relative',
        padding: '0',
        display: 'block',
        overflow: 'auto'
      }}
      data-testid="designer-container"
    />
  );
};
