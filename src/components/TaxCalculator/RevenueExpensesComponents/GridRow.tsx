
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
    <div className={`grid ${isMobile ? 'grid-cols-1 gap-2' : 'grid-cols-12 gap-4'} items-center mb-4 ${className || ''}`}>
      <div className={`${isMobile ? 'text-left mb-1' : 'col-span-3 text-right pr-2'} font-medium`}>
        {prefix && <span className="inline-block mb-1">{prefix}</span>}
        <span className={`${prefix ? 'block' : 'inline'}`}>{label}</span>
      </div>
      <div className={`${isMobile ? 'text-left break-words' : 'col-span-3'}`}></div>
      <div className={`${isMobile ? 'w-full' : 'col-span-3'} flex items-center ${isMobile ? 'justify-start' : 'justify-end'}`}>
        {children}
      </div>
    </div>
  );
};

export default GridRow;
