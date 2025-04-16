
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface PreviewHeaderProps {
  templateName: string;
  onBack: () => void;
}

export const PreviewHeader: React.FC<PreviewHeaderProps> = ({
  templateName,
  onBack
}) => {
  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="sm" onClick={onBack}>
        <ArrowLeft className="h-4 w-4 mr-1" />
        返回
      </Button>
      <h3 className="text-lg font-medium">模板预览：{templateName}</h3>
    </div>
  );
};
