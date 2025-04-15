
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
    <div className={`grid ${isMobile ? 'grid-cols-1 gap-2' : 'grid-cols-1 md:grid-cols-6 gap-4'} items-center ${className || ''}`}>
      <div className={`${isMobile ? 'text-left' : 'md:col-span-1 text-right'} font-medium ${isMobile ? 'mb-1' : 'pr-2'}`}>
        {prefix}
      </div>
      <div className={`${isMobile ? 'text-left' : 'md:col-span-2'} truncate`}>
        {label}
      </div>
      <div className={`${isMobile ? 'hidden' : 'md:col-span-2'}`}></div>
      <div className={`${isMobile ? 'w-full' : 'md:col-span-1'} flex items-center ${isMobile ? 'justify-start' : 'justify-end'}`}>
        {children}
      </div>
    </div>
  );
};

export default GridRow;
