
import React, { ReactNode } from 'react';

interface GridRowProps {
  label?: string;
  prefix?: string;
  children: ReactNode;
}

const GridRow: React.FC<GridRowProps> = ({ label, prefix, children }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
      <div className="md:col-span-1 text-right font-medium">{prefix}</div>
      <div className="md:col-span-2 truncate">{label}</div>
      <div className="md:col-span-2"></div>
      <div className="md:col-span-1">
        {children}
      </div>
    </div>
  );
};

export default GridRow;

