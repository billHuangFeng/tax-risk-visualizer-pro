
import React, { useEffect } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";

interface DesignerContainerProps {
  containerRef: React.RefObject<HTMLDivElement>;
  onReady?: () => void;
}

export const DesignerContainer = ({ containerRef, onReady }: DesignerContainerProps) => {
  useEffect(() => {
    if (containerRef.current && onReady) {
      setTimeout(() => {
        onReady();
      }, 100);
    }
  }, [containerRef, onReady]);
  
  return (
    <ScrollArea className="h-[calc(100vh-200px)] border border-gray-200 rounded-md bg-white">
      <div 
        ref={containerRef}
        className="w-full min-h-full p-6"
        data-testid="designer-container"
      />
    </ScrollArea>
  );
};
