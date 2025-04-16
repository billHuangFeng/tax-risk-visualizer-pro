
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

    console.log("设计器容器: 开始设置样式和可见性");

    // 确保容器具有明确的尺寸和样式
    element.style.display = 'block';
    element.style.visibility = 'visible';
    element.style.width = '100%';
    element.style.minHeight = '600px';
    element.style.backgroundColor = '#f9f9f9';
    element.style.border = '1px solid #e0e0e0';
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.style.padding = '10px';
    
    // 添加测试内容以验证元素可见性
    const testDiv = document.createElement('div');
    testDiv.textContent = '容器已初始化 - 如果可见，说明DOM正常';
    testDiv.style.textAlign = 'center';
    testDiv.style.padding = '20px';
    testDiv.style.backgroundColor = '#e0f7fa';
    testDiv.style.border = '1px dashed #00acc1';
    testDiv.style.marginBottom = '10px';
    element.appendChild(testDiv);
    
    console.log("设计器容器：测试内容已添加，容器应该可见");
    
    // 立即通知容器已就绪
    if (onReady) {
      console.log("设计器容器：通知容器就绪");
      setTimeout(() => {
        onReady();
      }, 100); // 短延迟确保DOM已更新
    }

    return () => {
      // 清理操作
      if (element.contains(testDiv)) {
        element.removeChild(testDiv);
      }
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
        height: '500px', // 减小高度，避免滚动问题
        minHeight: '500px', 
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
