
import React, { useEffect, useLayoutEffect } from 'react';

interface DesignerContainerProps {
  containerRef: React.RefObject<HTMLDivElement>;
}

export const DesignerContainer = ({ containerRef }: DesignerContainerProps) => {
  // 使用useLayoutEffect确保DOM元素已渲染并可访问
  useLayoutEffect(() => {
    if (!containerRef.current) return;
    
    // 应用必要的样式确保可见性
    const element = containerRef.current;
    element.style.display = 'block';
    element.style.visibility = 'visible';
    element.style.width = '100%';
    element.style.minHeight = '600px';
    element.style.backgroundColor = '#f9f9f9';
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    
    // 记录容器状态用于调试
    console.log('设计器容器已准备就绪', {
      width: element.offsetWidth,
      height: element.offsetHeight,
      display: getComputedStyle(element).display,
      visibility: getComputedStyle(element).visibility,
      inDOM: document.body.contains(element)
    });
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
        visibility: 'visible',
        overflow: 'hidden'
      }}
      data-testid="designer-container"
    />
  );
};
