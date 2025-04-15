
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { PhoneCall } from 'lucide-react';

interface CalculatorActionsProps {
  riskPercentage: number;
  onCalculate?: () => void;
  onReset?: () => void;
  onExport?: () => void;
}

const CalculatorActions = ({ 
  riskPercentage, 
  onCalculate, 
  onReset, 
  onExport 
}: CalculatorActionsProps) => {
  const [showRiskDetails, setShowRiskDetails] = useState(false);
  
  useEffect(() => {
    const handleRiskDetailsVisibilityChange = (event: CustomEvent<{ showRiskDetails: boolean }>) => {
      setShowRiskDetails(event.detail.showRiskDetails);
    };
    
    document.addEventListener(
      'riskDetailsVisibilityChange', 
      handleRiskDetailsVisibilityChange as EventListener
    );
    
    return () => {
      document.removeEventListener(
        'riskDetailsVisibilityChange', 
        handleRiskDetailsVisibilityChange as EventListener
      );
    };
  }, []);

  const handleContactAdvisor = () => {
    window.open('https://work.weixin.qq.com/ca/cawcde03d69f2d37e9', '_blank');
  };

  if (riskPercentage < 30 || !showRiskDetails) return null;

  return (
    <div className="flex justify-center mt-0 -translate-y-4">
      <Button 
        onClick={handleContactAdvisor} 
        className="bg-tax-blue hover:bg-tax-light-blue text-white"
      >
        <PhoneCall className="mr-2 h-4 w-4" />
        联系税务顾问
      </Button>
    </div>
  );
};

export default CalculatorActions;
