
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calculator, FileSpreadsheet } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getRiskLevel } from '@/data/taxInfoData';

interface TaxCalculatorActionsProps {
  handleCalculate: () => void;
  handleReset: () => void;
  handleExport: () => void;
  riskValue: string;
  riskPercentage: number;
}

const TaxCalculatorActions: React.FC<TaxCalculatorActionsProps> = ({
  handleCalculate,
  handleReset,
  handleExport,
  riskValue,
  riskPercentage
}) => {
  const { toast } = useToast();

  const onCalculate = () => {
    handleCalculate();
    toast({
      title: "计算已完成",
      description: `企业所得税风险值：${riskValue} 万元 (${getRiskLevel(riskPercentage)})`,
      variant: "default",
    });
  };

  return (
    <div className="flex justify-center gap-4 mt-6">
      <Button
        className="bg-tax-blue hover:bg-tax-light-blue text-white px-8"
        onClick={onCalculate}
      >
        <Calculator className="mr-2 h-4 w-4" />
        计算风险值
      </Button>
      <Button variant="outline" onClick={handleReset}>
        重置
      </Button>
      <Button variant="secondary" onClick={handleExport}>
        <FileSpreadsheet className="mr-2 h-4 w-4" />
        导出数据
      </Button>
    </div>
  );
};

export default TaxCalculatorActions;
