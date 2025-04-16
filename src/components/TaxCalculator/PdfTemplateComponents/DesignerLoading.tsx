
import React from 'react';
import { Loader2 } from 'lucide-react';

export const DesignerLoading = () => {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-center">正在加载设计器，请稍候...</p>
      </div>
    </div>
  );
};
