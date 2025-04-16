
import React, { useEffect, useRef } from 'react';

interface DesignerContainerProps {
  containerRef: React.RefObject<HTMLDivElement>;
  onReady?: () => void;
}

export const DesignerContainer = ({ containerRef, onReady }: DesignerContainerProps) => {
  const localRef = useRef<HTMLDivElement>(null);
  
  // 确保DOM完全渲染后再进行操作
  useEffect(() => {
    // 如果传入的ref未设置，使用本地ref
    const element = containerRef.current || localRef.current;
    if (!element) return;

    // 确保容器具有明确的尺寸和样式
    element.style.display = 'block';
    element.style.visibility = 'visible';
    element.style.width = '100%';
    element.style.minHeight = '600px';
    element.style.backgroundColor = '#f9f9f9';
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    
    // 确保容器在DOM中并可见
    if (document.body.contains(element)) {
      console.log('设计器容器已加载 - 立即就绪');
      
      // 通知父组件容器已就绪
      if (onReady) {
        onReady(); // 立即通知就绪
      }
    } else {
      // 如果容器不在DOM中，使用MutationObserver监听DOM变化
      console.log('设计器容器尚未在DOM中，设置MutationObserver');
      const observer = new MutationObserver((mutationsList, observer) => {
        if (document.body.contains(element)) {
          console.log('MutationObserver检测到容器已添加到DOM');
          observer.disconnect();
          
          if (onReady) {
            onReady();
          }
        }
      });
      
      observer.observe(document.body, { childList: true, subtree: true });
      
      // 设置备用超时
      const timeout = setTimeout(() => {
        observer.disconnect();
        console.log('超时检查容器状态');
        
        if (document.body.contains(element)) {
          console.log('超时检查:容器在DOM中');
          if (onReady) {
            onReady();
          }
        }
      }, 1000);
      
      return () => {
        observer.disconnect();
        clearTimeout(timeout);
      };
    }
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
