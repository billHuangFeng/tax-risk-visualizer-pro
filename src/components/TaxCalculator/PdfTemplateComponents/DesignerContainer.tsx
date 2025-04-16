
import React, { useEffect, useRef } from 'react';

interface DesignerContainerProps {
  containerRef: React.RefObject<HTMLDivElement>;
  onReady?: () => void;
}

export const DesignerContainer = ({ containerRef, onReady }: DesignerContainerProps) => {
  const localRef = useRef<HTMLDivElement>(null);
  
  // 使用useEffect而非useLayoutEffect，确保DOM完全渲染后再进行操作
  useEffect(() => {
    // 如果传入的ref未设置，使用本地ref
    const element = containerRef.current || localRef.current;
    if (!element) return;

    // 应用关键样式确保可见性
    element.style.display = 'block';
    element.style.visibility = 'visible';
    element.style.width = '100%';
    element.style.minHeight = '600px';
    element.style.backgroundColor = '#f9f9f9';
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    
    // 监控元素的DOM挂载状态
    const checkInterval = setInterval(() => {
      if (document.body.contains(element)) {
        clearInterval(checkInterval);
        console.log('设计器容器已挂载到DOM中', {
          width: element.offsetWidth,
          height: element.offsetHeight,
          display: getComputedStyle(element).display,
          visibility: getComputedStyle(element).visibility,
          inDOM: document.body.contains(element)
        });
        
        // 通知父组件容器已就绪
        if (onReady) {
          setTimeout(onReady, 100); // 给浏览器一点时间更新渲染
        }
      }
    }, 50);
    
    return () => {
      clearInterval(checkInterval);
    };
  }, [containerRef, onReady]);

  return (
    <div 
      ref={(node) => {
        // 同时设置两个ref确保一定有一个能工作
        if (containerRef && typeof containerRef === 'object') {
          (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
        if (localRef && typeof localRef === 'object') {
          localRef.current = node;
        }
      }}
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
      id="reportbro-designer-container"
    />
  );
};
