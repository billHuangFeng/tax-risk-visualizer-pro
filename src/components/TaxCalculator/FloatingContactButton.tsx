
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

const FloatingContactButton = () => {
  const isMobile = useIsMobile();
  const [position, setPosition] = useState({ 
    x: window.innerWidth - 200,
    y: window.innerHeight - 148
  });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = () => {
      if (isMobile) {
        const characterWidth = 16; // Approximate width of a Chinese character
        const padding = characterWidth * 2;
        setPosition({
          x: window.innerWidth - 80 - padding, // Button width + padding
          y: window.innerHeight - 120 - padding // Button height + padding
        });
      } else {
        // 在桌面端时设置更靠右下角的位置
        setPosition({
          x: window.innerWidth - 100,
          y: window.innerHeight - 100
        });
      }
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, [isMobile]);

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

  // 根据是否为移动设备调整按钮样式和位置
  const buttonSize = isMobile ? "w-16 h-16" : "w-24 h-24";
  const buttonTextClass = isMobile ? "text-xs" : "text-sm";

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
          `rounded-full ${buttonSize} bg-blue-600 text-white border-4 border-white`,
          "flex flex-col items-center justify-center gap-2 p-0",
          "hover:bg-blue-700 transition-all duration-200",
          "shadow-[0_6px_12px_rgba(0,0,0,0.2)]",
          "active:shadow-[0_3px_6px_rgba(0,0,0,0.2)]",
          "transform transition-transform",
          "hover:-translate-y-1 active:translate-y-0"
        )}
      >
        <span className={`${buttonTextClass} whitespace-pre-line`}>立即{'\n'}咨询专家</span>
        <Phone className={isMobile ? "w-4 h-4" : "w-6 h-6"} />
      </Button>
    </div>
  );
};

export default FloatingContactButton;
