import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';
import { cn } from '@/lib/utils';

const FloatingContactButton = () => {
  const [position, setPosition] = useState({ 
    x: window.innerWidth - 200,
    y: window.innerHeight - 148
  });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleContactAdvisor = (e: React.MouseEvent) => {
    if (e.detail === 2 && !isDragging) {
      window.open('https://work.weixin.qq.com/ca/cawcde03d69f2d37e9', '_blank');
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        zIndex: 50,
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <Button
        onClick={handleContactAdvisor}
        className={cn(
          "rounded-full w-24 h-24 bg-tax-blue text-white border-4 border-white shadow-lg",
          "flex flex-col items-center justify-center gap-1 p-0",
          "hover:bg-tax-light-blue transition-all duration-200",
          "transform hover:-translate-y-1",
          "shadow-[0_8px_0_0_#1e3a8a]",
          "active:translate-y-1 active:shadow-[0_4px_0_0_#1e3a8a]"
        )}
      >
        <Phone className="w-6 h-6" />
        <span className="text-sm whitespace-pre-line">立即{'\n'}咨询专家</span>
      </Button>
    </div>
  );
};

export default FloatingContactButton;
