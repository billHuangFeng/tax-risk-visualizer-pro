
import React from 'react';
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface DesignerErrorProps {
  error: string;
  onRetry: () => void;
}

export const DesignerError: React.FC<DesignerErrorProps> = ({
  error,
  onRetry
}) => {
  return (
    <div className="p-8 flex flex-col items-center justify-center">
      <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md max-w-md">
        <h3 className="font-medium mb-2">加载错误</h3>
        <p className="text-sm mb-3">{error}</p>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onRetry}
          className="flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          重试加载
        </Button>
      </div>
    </div>
  );
};
