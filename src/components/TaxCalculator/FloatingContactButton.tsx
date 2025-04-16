
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
        // Calculate bottom-right position with margin on mobile
        setPosition({
          x: window.innerWidth - 90,
          y: window.innerHeight - 90
        });
      } else {
        // Desktop positioning
        setPosition({
          x: window.innerWidth - 200,
          y: window.innerHeight - 148
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
    e.preventDefault(); // Prevent text selection during drag
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    const touch = e.touches[0];
    setDragStart({
      x: touch.clientX - position.x,
      y: touch.clientY - position.y
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: Math.max(0, Math.min(window.innerWidth - 80, e.clientX - dragStart.x)),
        y: Math.max(0, Math.min(window.innerHeight - 80, e.clientY - dragStart.y))
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) {
      const touch = e.touches[0];
      setPosition({
        x: Math.max(0, Math.min(window.innerWidth - 80, touch.clientX - dragStart.x)),
        y: Math.max(0, Math.min(window.innerHeight - 80, touch.clientY - dragStart.y))
      });
      e.preventDefault(); // Prevent page scrolling during drag
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleContactAdvisor = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) {
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
        touchAction: 'none'
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleDragEnd}
    >
      <Button
        onClick={handleContactAdvisor}
        className={cn(
          "rounded-full w-16 h-16 md:w-24 md:h-24 bg-blue-600 text-white border-4 border-white",
          "flex flex-col items-center justify-center gap-1 p-0",
          "hover:bg-blue-700 transition-all duration-200",
          "shadow-[0_6px_12px_rgba(0,0,0,0.2)]",
          "active:shadow-[0_3px_6px_rgba(0,0,0,0.2)]",
          "transform transition-transform",
          "hover:-translate-y-1 active:translate-y-0"
        )}
      >
        <span className="text-xs md:text-sm whitespace-pre-line">立即{'\n'}咨询专家</span>
        <Phone className="w-4 h-4 md:w-6 md:h-6" />
      </Button>
    </div>
  );
};

export default FloatingContactButton;
