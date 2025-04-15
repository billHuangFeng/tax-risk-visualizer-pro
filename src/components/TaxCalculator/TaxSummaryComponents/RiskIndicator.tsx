
import React from 'react';
import { Progress } from '@/components/ui/progress';

interface RiskIndicatorProps {
  riskPercentage: number;
}

const RiskIndicator: React.FC<RiskIndicatorProps> = ({ riskPercentage }) => {
  const getRiskLevel = (percentage: number) => {
    if (percentage < 30) return '低风险';
    if (percentage < 70) return '中等风险';
    return '高风险';
  };

  // We need to modify the progress indicator styling to match the expected behavior
  return (
    <div className="pt-4 border-t">
      <div className="mb-2 flex justify-between">
        <span className="font-bold">税务风险评估</span>
        <span className="font-bold">{getRiskLevel(riskPercentage)}</span>
      </div>
      <div className="relative h-4 w-full overflow-hidden rounded-full bg-gray-200">
        <div 
          className="absolute top-0 left-0 h-full transition-all duration-300"
          style={{ 
            width: `${riskPercentage}%`,
            backgroundColor: riskPercentage < 30 
              ? '#000000' // Black for low risk
              : riskPercentage < 70 
                ? '#F0A500' // Yellow for medium risk
                : '#ea384c', // Red for high risk
          }}
        />
      </div>
      <div className="mt-2 flex justify-between text-sm">
        <span>低风险</span>
        <span>中等风险</span>
        <span>高风险</span>
      </div>
    </div>
  );
};

export default RiskIndicator;
