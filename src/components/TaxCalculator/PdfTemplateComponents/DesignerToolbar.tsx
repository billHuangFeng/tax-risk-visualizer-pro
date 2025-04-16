
import React from 'react';
import { Button } from '@/components/ui/button';

interface DesignerToolbarProps {
  onSave: () => void;
}

export const DesignerToolbar = ({ onSave }: DesignerToolbarProps) => {
  return (
    <div className="flex justify-end mb-4">
      <Button 
        onClick={onSave}
        className="bg-primary text-white hover:bg-primary/90"
      >
        保存模板
      </Button>
    </div>
  );
};
