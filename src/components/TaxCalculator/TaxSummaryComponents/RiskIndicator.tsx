
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

  const getRiskColor = (percentage: number): string => {
    // Define base colors for each risk level
    const lowRiskColor = '#000000';      // Black
    const mediumRiskColor = '#F97316';   // Orange/Yellow
    const highRiskColor = '#ea384c';     // Red

    // Calculate opacity based on percentage (from 30% to 100%)
    const opacity = Math.max(0.3, percentage / 100);

    if (percentage < 30) {
      return `${lowRiskColor}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`;
    } else if (percentage < 70) {
      return `${mediumRiskColor}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`;
    } else {
      return `${highRiskColor}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`;
    }
  };

  return (
    <div className="pt-4 border-t">
      <div className="mb-2 flex justify-between">
        <span className="font-bold">税务风险评估</span>
        <span className="font-bold">{getRiskLevel(riskPercentage)}</span>
      </div>
      <Progress value={riskPercentage} className="h-4" style={{ backgroundColor: '#e5e7eb' }}>
        <div 
          className="h-full transition-all duration-300"
          style={{ 
            width: `${riskPercentage}%`,
            backgroundColor: getRiskColor(riskPercentage)
          }}
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
