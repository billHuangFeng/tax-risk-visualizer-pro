
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
          "rounded-full w-24 h-24 bg-blue-600 text-white border-4 border-white",
          "flex flex-col items-center justify-center gap-2 p-0", // Increased gap for more space between icon and text
          "hover:bg-blue-700 transition-all duration-200",
          "shadow-[0_6px_12px_rgba(0,0,0,0.2)]",
          "active:shadow-[0_3px_6px_rgba(0,0,0,0.2)]",
          "transform transition-transform",
          "hover:-translate-y-1 active:translate-y-0"
        )}
      >
        <span className="text-sm whitespace-pre-line">立即{'\n'}咨询专家</span>
        <Phone className="w-6 h-6" />
      </Button>
    </div>
  );
};

export default FloatingContactButton;
