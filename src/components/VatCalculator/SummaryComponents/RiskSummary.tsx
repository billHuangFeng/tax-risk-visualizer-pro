
import React from 'react';
import { AlertCircle } from 'lucide-react';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

interface RiskSummaryProps {
  unexplainedDifference: number;
  riskLevel: string;
  riskPercentage: number;
  onInfoClick?: (infoKey: string) => void;
}

const RiskSummary: React.FC<RiskSummaryProps> = ({
  unexplainedDifference,
  riskLevel,
  riskPercentage,
  onInfoClick
}) => {
  const getRiskColor = () => {
    switch (riskLevel) {
      case '风险非常高':
        return 'text-red-600 bg-red-50';
      case '风险比较高':
        return 'text-orange-600 bg-orange-50';
      case '存在风险':
        return 'text-yellow-600 bg-yellow-50';
      default:
        return 'text-green-600 bg-green-50';
    }
  };

  return (
    <div className="mt-6 p-4 border rounded-md space-y-3">
      <div className="flex justify-between items-center">
        <div className="font-medium flex items-center">
          未解释差异
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button 
                  className="ml-2 text-tax-blue hover:text-tax-light-blue"
                  onClick={() => onInfoClick?.('unexplainedDifference')}
                >
                  <AlertCircle size={16} />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>扣除已知差异后的未解释金额</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-red-600">
            {unexplainedDifference.toFixed(2)}
          </span>
          <span className="text-sm text-red-600">
            ({riskPercentage.toFixed(2)}%)
          </span>
        </div>
      </div>
      
      <div className="flex justify-between items-center pt-2 border-t">
        <div className="font-medium flex items-center gap-2">
          风险评估
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button 
                  className="text-tax-blue hover:text-tax-light-blue"
                  onClick={() => onInfoClick?.('riskAssessment')}
                >
                  <AlertCircle size={16} />
                </button>
              </TooltipTrigger>
              <TooltipContent className="max-w-[350px]">
                <div className="space-y-2">
                  <h4 className="font-bold">风险评估方式</h4>
                  <p className="text-sm">
                    风险百分比 = 未解释差异 ÷ 基数 × 100%
                  </p>
                  <h5 className="font-semibold mt-1">基数计算：</h5>
                  <p className="text-sm">
                    基数 = Max(应交增值税, 销项税额×10%)
                  </p>
                  <h5 className="font-semibold mt-1">风险等级：</h5>
                  <ul className="list-disc list-inside text-sm">
                    <li>风险百分比 &gt; 50%：风险非常高</li>
                    <li>风险百分比 &gt; 20%：风险比较高</li>
                    <li>风险百分比 &gt; 10%：存在风险</li>
                    <li>风险百分比 ≤ 10%：基本安全</li>
                  </ul>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className={`px-3 py-1 rounded-full font-medium ${getRiskColor()}`}>
          {riskLevel} (风险百分比: {riskPercentage.toFixed(2)}%)
        </div>
      </div>
    </div>
  );
};

export default RiskSummary;
