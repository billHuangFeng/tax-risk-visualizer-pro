
import React from 'react';
import { Button } from '@/components/ui/button';
import { RotateCcw, Download } from 'lucide-react';
import SaveDataButton from './SaveDataButton';
import { useCalculator } from '@/hooks/useCalculator';

interface CalculatorActionsProps {
  riskPercentage: number;
  onReset: () => void;
  onExport: () => void;
}

const CalculatorActions: React.FC<CalculatorActionsProps> = ({
  riskPercentage,
  onReset,
  onExport,
}) => {
  const calculator = useCalculator();
  
  return (
    <div className="w-full px-4 py-4 bg-white border-t border-gray-200 shadow-sm flex flex-col md:flex-row gap-2 justify-end">
      <Button
        variant="outline"
        onClick={onReset}
        className="w-full md:w-auto"
      >
        <RotateCcw className="w-4 h-4 mr-2" />
        重置
      </Button>
      
      <Button
        variant="outline"
        onClick={onExport}
        className="w-full md:w-auto"
      >
        <Download className="w-4 h-4 mr-2" />
        导出PDF
      </Button>
      
      <SaveDataButton calculatorData={calculator} />
    </div>
  );
};

export default CalculatorActions;
