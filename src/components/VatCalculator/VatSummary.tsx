
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { DifferenceFactor } from '@/hooks/useVatCalculator';
import TaxAmounts from './SummaryComponents/TaxAmounts';
import DifferenceFactors from './SummaryComponents/DifferenceFactors';
import RiskSummary from './SummaryComponents/RiskSummary';

interface VatSummaryProps {
  payableTax: number;
  actualTax: number;
  setActualTax: (value: number) => void;
  taxDifference: number;
  taxDifferencePercentage: number;
  taxDifferenceFactors: DifferenceFactor[];
  addTaxDifferenceFactor: () => void;
  updateTaxDifferenceFactor: (id: string, field: keyof DifferenceFactor, value: any) => void;
  removeTaxDifferenceFactor: (id: string) => void;
  unexplainedDifference: number;
  riskLevel: string;
  riskPercentage: number;
  onInfoClick?: (infoKey: string) => void;
}

const VatSummary: React.FC<VatSummaryProps> = (props) => {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-bold border-l-4 border-tax-blue pl-3">
          增值税汇总
        </CardTitle>
      </CardHeader>
      <CardContent>
        <TaxAmounts
          payableTax={props.payableTax}
          actualTax={props.actualTax}
          setActualTax={props.setActualTax}
          taxDifference={props.taxDifference}
          taxDifferencePercentage={props.taxDifferencePercentage}
          onInfoClick={props.onInfoClick}
        />

        <div className="border-t pt-6 space-y-6">
          <DifferenceFactors
            taxDifferenceFactors={props.taxDifferenceFactors}
            addTaxDifferenceFactor={props.addTaxDifferenceFactor}
            updateTaxDifferenceFactor={props.updateTaxDifferenceFactor}
            removeTaxDifferenceFactor={props.removeTaxDifferenceFactor}
            onInfoClick={props.onInfoClick}
          />

          <RiskSummary
            unexplainedDifference={props.unexplainedDifference}
            riskLevel={props.riskLevel}
            riskPercentage={props.riskPercentage}
            onInfoClick={props.onInfoClick}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default VatSummary;
