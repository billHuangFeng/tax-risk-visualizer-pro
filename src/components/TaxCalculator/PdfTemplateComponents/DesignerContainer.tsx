
import React, { useEffect } from 'react';

interface DesignerContainerProps {
  containerRef: React.RefObject<HTMLDivElement>;
}

export const DesignerContainer = ({ containerRef }: DesignerContainerProps) => {
  useEffect(() => {
    // 确保容器元素始终可见
    if (containerRef.current) {
      containerRef.current.style.display = 'block';
      containerRef.current.style.visibility = 'visible';
      
      // 模拟DOM重绘以确保容器准备就绪
      const element = containerRef.current;
      
      // 强制浏览器重绘
      window.requestAnimationFrame(() => {
        element.classList.add('ready-for-designer');
        
        // 记录容器状态
        console.log('设计器容器已准备就绪', {
          width: element.offsetWidth,
          height: element.offsetHeight,
          display: getComputedStyle(element).display,
          visibility: getComputedStyle(element).visibility
        });
      });
    }
  }, [containerRef]);

  return (
    <div 
      ref={containerRef} 
      className="w-full border border-gray-200 rounded-md flex-grow designer-container"
      style={{ 
        height: '600px', 
        minHeight: '600px', 
        display: 'block', 
        position: 'relative',
        backgroundColor: '#f9f9f9',
        visibility: 'visible'
      }}
      data-testid="designer-container"
    />
  );
};
