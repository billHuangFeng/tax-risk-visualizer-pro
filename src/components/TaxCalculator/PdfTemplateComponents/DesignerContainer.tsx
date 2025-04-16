
import React, { useEffect, useRef } from 'react';

interface DesignerContainerProps {
  containerRef: React.RefObject<HTMLDivElement>;
}

export const DesignerContainer = ({ containerRef }: DesignerContainerProps) => {
  // 使用一个本地ref来确保我们可以跟踪初始化状态
  const initializeAttempted = useRef(false);

  useEffect(() => {
    if (!containerRef.current || initializeAttempted.current) return;
    
    // 标记已尝试初始化
    initializeAttempted.current = true;
    
    // 确保容器元素可见且尺寸合适
    const element = containerRef.current;
    element.style.display = 'block';
    element.style.visibility = 'visible';
    element.style.width = '100%';
    element.style.minHeight = '600px';
    element.style.backgroundColor = '#f9f9f9';
    
    // 强制浏览器重绘以确保容器准备就绪
    setTimeout(() => {
      if (element && document.body.contains(element)) {
        element.classList.add('ready-for-designer');
        
        // 记录容器状态
        console.log('设计器容器已准备就绪', {
          width: element.offsetWidth,
          height: element.offsetHeight,
          display: getComputedStyle(element).display,
          visibility: getComputedStyle(element).visibility,
          inDOM: document.body.contains(element)
        });
      }
    }, 100);
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
