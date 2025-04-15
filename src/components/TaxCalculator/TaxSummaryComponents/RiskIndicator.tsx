
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

interface RiskIndicatorProps {
  riskPercentage: number;
  riskValue?: string;
  totalRevenue?: string;
}

const RiskIndicator: React.FC<RiskIndicatorProps> = ({ 
  riskPercentage, 
  riskValue = '0',
  totalRevenue = '0'
}) => {
  const getRiskLevel = (percentage: number) => {
    if (percentage < 30) return '低风险';
    if (percentage < 70) return '中等风险';
    return '高风险';
  };

  const calculateProfitRiskPercentage = () => {
    const riskValueNum = parseFloat(riskValue) || 0;
    const revenueNum = parseFloat(totalRevenue) || 1; // Use 1 to avoid division by zero
    
    // Corrected formula: (风险差值*18.25%*3+风险差值)/销售收入
    // Which simplifies to: riskValue * (1 + 0.1825 * 3) / revenue * 100
    return ((riskValueNum * 0.1825 * 3 + riskValueNum) / revenueNum * 100).toFixed(2);
  };

  const showRiskAlert = riskPercentage >= 30;
  const profitRiskPercentage = calculateProfitRiskPercentage();

  return (
    <div className="space-y-4 pt-4 border-t">
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

      {showRiskAlert && (
        <Alert variant="destructive" className="mt-4">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>风险提示</AlertTitle>
          <AlertDescription>
            你面临的风险为{profitRiskPercentage}%的利润。请立即咨询税务顾问。
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default RiskIndicator;
