
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calculator, FileSpreadsheet } from 'lucide-react';

interface CalculatorActionsProps {
  onCalculate: () => void;
  onReset: () => void;
  onExport: () => void;
}

const CalculatorActions = ({ onCalculate, onReset, onExport }: CalculatorActionsProps) => {
  return (
    <div className="flex justify-center gap-4 mt-6">
      <Button
        className="bg-tax-blue hover:bg-tax-light-blue text-white px-8"
        onClick={onCalculate}
      >
        <Calculator className="mr-2 h-4 w-4" />
        计算风险值
      </Button>
      <Button
        variant="outline"
        onClick={onReset}
      >
        重置
      </Button>
      <Button
        variant="secondary"
        onClick={onExport}
      >
        <FileSpreadsheet className="mr-2 h-4 w-4" />
        导出数据
      </Button>
    </div>
  );
};

export default CalculatorActions;
