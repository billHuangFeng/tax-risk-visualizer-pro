
import React, { ReactNode } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface GridRowProps {
  label?: string;
  prefix?: string;
  children: ReactNode;
  className?: string;
}

const GridRow: React.FC<GridRowProps> = ({ label, prefix, children, className }) => {
  const isMobile = useIsMobile();

  return (
    <div className={`grid ${isMobile ? 'grid-cols-1 gap-2' : 'grid-cols-12 gap-4'} items-center ${className || ''}`}>
      <div className={`${isMobile ? 'text-left' : 'col-span-4 text-right'} font-medium ${isMobile ? 'mb-1' : 'pr-2'}`}>
        {prefix}
      </div>
      <div className={`${isMobile ? 'text-left break-words' : 'col-span-2'}`}>
        {label}
      </div>
      <div className={`${isMobile ? 'hidden' : 'col-span-4'}`}></div>
      <div className={`${isMobile ? 'w-full flex justify-end' : 'col-span-2'} flex items-center justify-end`}>
        {children}
      </div>
    </div>
  );
};

export default GridRow;
