
import React from 'react';
import { Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useIsMobile } from '@/hooks/use-mobile';
import { Progress } from '@/components/ui/progress';

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
  const isMobile = useIsMobile();

  // Determine risk color
  const getRiskColor = () => {
    if (riskPercentage > 50) return 'bg-red-600';
    if (riskPercentage > 20) return 'bg-orange-500';
    if (riskPercentage > 10) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  // Determine risk badge color
  const getRiskBadgeColor = () => {
    if (riskPercentage > 50) return 'bg-red-100 text-red-800 border-red-200';
    if (riskPercentage > 20) return 'bg-orange-100 text-orange-800 border-orange-200';
    if (riskPercentage > 10) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-green-100 text-green-800 border-green-200';
  };

  return (
    <div className="mt-6">
      <div className="flex items-center mb-4">
        <h3 className="text-lg font-semibold">风险评估结果</h3>
        <button 
          className="ml-2 text-tax-blue hover:text-tax-light-blue"
          onClick={() => onInfoClick?.('riskAssessment')}
        >
          <Info size={16} />
        </button>
      </div>

      <div className={`grid ${isMobile ? 'grid-cols-1 gap-6' : 'grid-cols-2 gap-8'} mb-6`}>
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">未解释差异</span>
            <span className={`font-semibold ${unexplainedDifference < 0 ? 'text-red-600' : unexplainedDifference > 0 ? 'text-blue-600' : 'text-gray-600'}`}>
              {unexplainedDifference.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">风险百分比</span>
            <span className="font-semibold">{riskPercentage.toFixed(2)}%</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex flex-col">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">风险等级</span>
              <Badge className={`${getRiskBadgeColor()} font-medium px-3 py-1`}>
                {riskLevel}
              </Badge>
            </div>
            <div className="mt-2">
              <div className="mb-1.5 flex justify-between text-xs">
                <span>低风险</span>
                <span>高风险</span>
              </div>
              <Progress value={riskPercentage > 100 ? 100 : riskPercentage} className="h-2.5" indicatorClassName={getRiskColor()} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskSummary;
