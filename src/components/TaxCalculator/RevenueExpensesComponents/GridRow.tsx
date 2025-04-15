
import React, { ReactNode } from 'react';

interface GridRowProps {
  label?: string;
  prefix?: string;
  children: ReactNode;
  className?: string;
}

const GridRow: React.FC<GridRowProps> = ({ label, prefix, children, className }) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-6 gap-4 items-center ${className || ''}`}>
      <div className="md:col-span-1 text-right font-medium pr-2">{prefix}</div>
      <div className="md:col-span-2 truncate">{label}</div>
      <div className="md:col-span-1"></div>
      <div className="md:col-span-1 flex items-center justify-end space-x-2">
        {children}
      </div>
    </div>
  );
};

export default GridRow;
