
import React from 'react';
import { Progress } from '@/components/ui/progress';

interface RiskIndicatorProps {
  riskPercentage: number;
}

const RiskIndicator: React.FC<RiskIndicatorProps> = ({ riskPercentage }) => {
  const getRiskColor = (percentage: number) => {
    if (percentage < 30) return 'bg-green-500';
    if (percentage < 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getRiskLevel = (percentage: number) => {
    if (percentage < 30) return '低风险';
    if (percentage < 70) return '中等风险';
    return '高风险';
  };

  return (
    <div className="pt-4 border-t">
      <div className="mb-2 flex justify-between">
        <span className="font-bold">税务风险评估</span>
        <span className="font-bold">{getRiskLevel(riskPercentage)}</span>
      </div>
      <Progress value={riskPercentage} className="h-4" style={{ backgroundColor: '#e5e7eb' }}>
        <div 
          className={`h-full ${getRiskColor(riskPercentage)}`} 
          style={{ width: `${riskPercentage}%` }}
        />
      </Progress>
      <div className="mt-2 flex justify-between text-sm">
        <span>低风险</span>
        <span>中等风险</span>
        <span>高风险</span>
      </div>
    </div>
  );
};

export default RiskIndicator;
