
import React from 'react';

interface DesignerContainerProps {
  containerRef: React.RefObject<HTMLDivElement>;
}

export const DesignerContainer = ({ containerRef }: DesignerContainerProps) => {
  return (
    <div 
      ref={containerRef} 
      className="w-full border border-gray-300 rounded-md flex-grow" 
      style={{ 
        height: '600px', 
        minHeight: '600px', 
        display: 'block', 
        position: 'relative' 
      }}
    />
  );
};
