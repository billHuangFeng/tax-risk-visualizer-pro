
import React from 'react';
import { Button } from '@/components/ui/button';
import { RotateCcw, Download } from 'lucide-react';
import { useActions } from '@/hooks/calculator/useActions';
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
  const { handleReset, handleExport } = useActions(calculator.riskValue, riskPercentage);

  return (
    <div className="flex flex-col md:flex-row gap-4 mt-8 justify-center">
      <SaveDataButton calculatorData={calculator} />
      
      <Button 
        variant="outline" 
        onClick={() => {
          onReset();
          handleReset();
        }}
        className="w-full md:w-auto"
      >
        <RotateCcw className="w-4 h-4 mr-2" />
        重置数据
      </Button>
      
      <Button 
        variant="outline"
        onClick={() => {
          onExport();
          handleExport();
        }}
        className="w-full md:w-auto"
      >
        <Download className="w-4 h-4 mr-2" />
        导出数据
      </Button>
    </div>
  );
};

export default CalculatorActions;
