
import React from 'react';
import { DesignerCore } from './Designer/DesignerCore';
import { DesignerError } from './Designer/DesignerError';
import { DesignerLoading } from './DesignerLoading';
import { useDesignerSetup } from './Designer/hooks/useDesignerSetup';

interface ReportBroDesignerProps {
  onSave: (reportDefinition: any) => void;
  initialReport?: any;
}

export const ReportBroDesigner: React.FC<ReportBroDesignerProps> = ({
  onSave,
  initialReport
}) => {
  const { containerRef, error } = useDesignerSetup(initialReport);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <DesignerLoading onRetry={() => setIsLoading(true)} timeout={3} />;
  }

  if (error) {
    return <DesignerError error={error} onRetry={() => setIsLoading(true)} />;
  }

  return <DesignerCore onSave={onSave} initialReport={initialReport} />;
};
