
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
  riskValue = '0'
}) => {
  const getRiskLevel = (percentage: number) => {
    if (percentage < 30) return '低风险';
    if (percentage < 70) return '中等风险';
    return '高风险';
  };

  const calculateRiskDetails = () => {
    const baseRisk = parseFloat(riskValue) || 0;
    // 补税金额
    const taxAmount = baseRisk;
    // 滞纳金 = 风险差值 * 0.05% * 365 * 3
    const lateFee = baseRisk * 0.0005 * 365 * 3;
    // 罚款 = 风险差值（假设1倍）
    const penalty = baseRisk;
    // 总风险金额
    const totalRisk = taxAmount + lateFee + penalty;

    return {
      taxAmount: (taxAmount / 10000).toFixed(2),
      lateFee: (lateFee / 10000).toFixed(2),
      penalty: (penalty / 10000).toFixed(2),
      totalRisk: (totalRisk / 10000).toFixed(2)
    };
  };

  const showRiskAlert = riskPercentage >= 30;
  const riskDetails = calculateRiskDetails();

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
          <AlertDescription className="space-y-2">
            <p>你面临高达{riskDetails.totalRisk}万元的风险。具体如下：</p>
            <ol className="list-decimal pl-4">
              <li>补税{riskDetails.taxAmount}万元；</li>
              <li>滞纳金{riskDetails.lateFee}万元（每天0.05%，假设3年后暴雷）；</li>
              <li>罚款{riskDetails.penalty}万元（逃税罚款0.5-5倍，假设被罚款1倍）。</li>
            </ol>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default RiskIndicator;
