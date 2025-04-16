
import React, { useEffect } from 'react';

interface DesignerContainerProps {
  containerRef: React.RefObject<HTMLDivElement>;
}

export const DesignerContainer = ({ containerRef }: DesignerContainerProps) => {
  useEffect(() => {
    // Force a redraw of the container
    if (containerRef.current) {
      const element = containerRef.current;
      const display = element.style.display;
      element.style.display = 'none';
      
      // Force browser reflow
      void element.offsetHeight;
      
      // Restore display
      setTimeout(() => {
        element.style.display = display || 'block';
      }, 10);
    }
  }, [containerRef]);

  return (
    <div 
      ref={containerRef} 
      className="w-full border border-gray-200 rounded-md flex-grow"
      style={{ 
        height: '600px', 
        minHeight: '600px', 
        display: 'block', 
        position: 'relative',
        backgroundColor: '#f9f9f9'
      }}
    />
  );
};
