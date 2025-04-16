
import React from 'react';
import { Button } from '@/components/ui/button';
import { RotateCcw, Phone, Database } from 'lucide-react';
import SaveDataButton from './SaveDataButton';

interface CalculatorActionsProps {
  riskPercentage: number;
  onReset: () => void;
  onLoadTestData?: () => void;
}

const CalculatorActions: React.FC<CalculatorActionsProps> = ({
  riskPercentage,
  onReset,
  onLoadTestData,
}) => {
  const handleContactAdvisor = () => {
    window.open('https://work.weixin.qq.com/ca/cawcde03d69f2d37e9', '_blank');
  };
  
  return (
    <div className="w-full flex flex-col md:flex-row gap-2 justify-end">
      <Button
        variant="outline"
        onClick={onReset}
        className="w-full md:w-auto"
      >
        <RotateCcw className="w-4 h-4 mr-2" />
        重置
      </Button>
      
      {onLoadTestData && (
        <Button
          variant="outline"
          onClick={onLoadTestData}
          className="w-full md:w-auto"
        >
          <Database className="w-4 h-4 mr-2" />
          加载测试数据
        </Button>
      )}

      <Button 
        onClick={handleContactAdvisor} 
        className="w-full md:w-auto bg-vivid-purple hover:bg-secondary-purple text-white"
      >
        <Phone className="w-4 h-4 mr-2" />
        立即联系税务顾问
      </Button>
      
      <SaveDataButton calculatorData={{}} />
    </div>
  );
};

export default CalculatorActions;
