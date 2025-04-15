import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

interface RiskIndicatorProps {
  riskPercentage: number;
  riskValue?: string;
}

const RiskIndicator: React.FC<RiskIndicatorProps> = ({ 
  riskPercentage, 
  riskValue = '0'
}) => {
  const [showRiskDetails, setShowRiskDetails] = useState(false);

  useEffect(() => {
    setShowRiskDetails(false);
  }, [riskValue, riskPercentage]);

  const getRiskLevel = (percentage: number) => {
    if (percentage < 30) return '低风险';
    if (percentage < 70) return '中等风险';
    return '高风险';
  };

  const calculateRiskDetails = () => {
    const baseRisk = parseFloat(riskValue);
    const taxAmount = baseRisk;
    const lateFee = baseRisk * 0.0005 * 365 * 3;
    const penalty = baseRisk;
    const totalRisk = taxAmount + lateFee + penalty;

    return {
      taxAmount: taxAmount.toFixed(2),
      lateFee: lateFee.toFixed(2),
      penalty: penalty.toFixed(2),
      totalRisk: totalRisk.toFixed(2)
    };
  };

  const showRiskAlert = riskPercentage >= 30;
  const riskDetails = calculateRiskDetails();

  useEffect(() => {
    const event = new CustomEvent('riskDetailsVisibilityChange', {
      detail: { showRiskDetails }
    });
    document.dispatchEvent(event);
  }, [showRiskDetails]);

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
              ? '#000000'
              : riskPercentage < 70 
                ? '#F0A500'
                : '#ea384c',
          }}
        />
      </div>
      
      <div className="mt-2 flex justify-between text-sm">
        <span>低风险</span>
        <span>中等风险</span>
        <span>高风险</span>
      </div>

      {showRiskAlert && !showRiskDetails && (
        <div className="flex flex-col items-center space-y-4 mt-4 bg-blue-50 p-4 rounded-lg border border-blue-200">
          <p className="text-lg font-semibold text-blue-800">想看看风险到底有多高？</p>
          <div className="flex gap-4">
            <Button 
              variant="default"
              onClick={() => setShowRiskDetails(true)}
              className="px-8 bg-blue-600 hover:bg-blue-700"
            >
              <Check className="mr-2 h-4 w-4" />
              好的
            </Button>
          </div>
        </div>
      )}

      {showRiskAlert && showRiskDetails && (
        <Alert variant="destructive" className="mt-4 bg-red-50 border-red-200">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertTitle className="text-red-800">风险提示</AlertTitle>
          <AlertDescription className="space-y-2 text-red-700">
            <p>你面临高达{riskDetails.totalRisk}万元的风险。具体如下：</p>
            <ol className="list-decimal pl-4 text-red-700">
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
