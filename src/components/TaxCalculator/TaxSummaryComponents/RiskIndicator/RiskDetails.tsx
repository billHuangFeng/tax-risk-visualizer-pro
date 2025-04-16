
import React from 'react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

interface RiskDetailsProps {
  riskDetails: {
    taxAmount: string;
    lateFee: string;
    penalty: string;
    totalRisk: string;
  };
}

const RiskDetails: React.FC<RiskDetailsProps> = ({ riskDetails }) => {
  return (
    <Alert variant="destructive" className="mt-4 bg-red-50 border-red-200">
      <AlertTriangle className="h-8 w-8 text-red-600" />
      <AlertTitle className="text-red-800">风险提示</AlertTitle>
      <AlertDescription className="space-y-2 text-red-700">
        <p>基于未解释差异，你面临高达{riskDetails.totalRisk}万元的风险。具体如下：</p>
        <ol className="list-decimal pl-4 text-red-700">
          <li>补税{riskDetails.taxAmount}万元；</li>
          <li>滞纳金{riskDetails.lateFee}万元（每天0.05%，假设3年后暴雷）；</li>
          <li>罚款{riskDetails.penalty}万元（逃税罚款0.5-5倍，假设被罚款1倍）。</li>
        </ol>
      </AlertDescription>
    </Alert>
  );
};

export default RiskDetails;
