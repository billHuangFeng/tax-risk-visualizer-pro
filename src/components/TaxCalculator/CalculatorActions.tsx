
import React from 'react';
import { Button } from '@/components/ui/button';
import { RotateCcw, Download, Phone } from 'lucide-react';
import SaveDataButton from './SaveDataButton';
import { useCalculator } from '@/hooks/useCalculator';
import { exportToPDF } from '@/utils/pdfExport';
import { useToast } from '@/hooks/use-toast';

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
  const { toast } = useToast();
  
  const handleContactAdvisor = () => {
    window.open('https://work.weixin.qq.com/ca/cawcde03d69f2d37e9', '_blank');
  };

  const handleExport = async () => {
    try {
      await exportToPDF(calculator);
      toast({
        title: "导出成功",
        description: "PDF文件已生成",
      });
    } catch (error) {
      toast({
        title: "导出失败",
        description: "请稍后重试",
        variant: "destructive",
      });
    }
  };
  
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
        onClick={handleExport}
        className="w-full md:w-auto"
      >
        <Download className="w-4 h-4 mr-2" />
        导出PDF
      </Button>

      <Button 
        onClick={handleContactAdvisor} 
        className="w-full md:w-auto bg-vivid-purple hover:bg-secondary-purple text-white"
      >
        <Phone className="w-4 h-4 mr-2" />
        立即联系税务顾问
      </Button>
      
      <SaveDataButton calculatorData={calculator} />
    </div>
  );
};

export default CalculatorActions;
