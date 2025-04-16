
import React, { useEffect, useRef } from 'react';

interface DesignerContainerProps {
  containerRef: React.RefObject<HTMLDivElement>;
}

export const DesignerContainer = ({ containerRef }: DesignerContainerProps) => {
  // 使用一个本地ref来确保我们可以跟踪初始化状态
  const isInitialized = useRef(false);

  useEffect(() => {
    if (!containerRef.current || isInitialized.current) return;
    
    // 标记已初始化
    isInitialized.current = true;
    
    // 确保容器元素有明确的尺寸和可见性
    const element = containerRef.current;
    
    // 应用必要的样式
    element.style.display = 'block';
    element.style.visibility = 'visible';
    element.style.width = '100%';
    element.style.minHeight = '600px';
    element.style.backgroundColor = '#f9f9f9';
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    
    // 记录容器状态
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
