
import React from 'react';
import { DesignerContainer } from '../DesignerContainer';
import { useDesignerSetup } from './hooks/useDesignerSetup';

interface DesignerCoreProps {
  onSave: (reportDefinition: any) => void;
  initialReport?: any;
}

export const DesignerCore: React.FC<DesignerCoreProps> = ({
  onSave,
  initialReport
}) => {
  const { containerRef, error } = useDesignerSetup(initialReport);

  if (error) {
    return (
      <div className="p-4 text-red-500">
        设计器初始化失败: {error}
      </div>
    );
  }

  return <DesignerContainer containerRef={containerRef} />;
};
