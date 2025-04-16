
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { VatSalesItem, DifferenceExplanation as DifferenceExplanationType } from '@/hooks/useVatCalculator';
import SalesTable from './SalesComponents/SalesTable';
import SalesCollectionDifference from './SalesComponents/SalesCollectionDifference';
import DifferenceExplanation from './SalesComponents/DifferenceExplanation';

interface VatSalesSectionProps {
  salesData: VatSalesItem[];
  addSalesItem: () => void;
  updateSalesItem: (id: string, field: keyof VatSalesItem, value: any) => void;
  removeSalesItem: (id: string) => void;
  salesTotal: {
    amount: number;
    tax: number;
  };
  bankSalesAmount: number;
  setBankSalesAmount: (value: number) => void;
  onInfoClick?: (infoKey: string) => void;
  differenceExplanations: DifferenceExplanationType[];
  addDifferenceExplanation: () => void;
  updateDifferenceExplanation: (id: string, field: keyof DifferenceExplanationType, value: any) => void;
  removeDifferenceExplanation: (id: string) => void;
  explainedDifferenceTotal: number;
}

const VatSalesSection: React.FC<VatSalesSectionProps> = ({
  salesData,
  addSalesItem,
  updateSalesItem,
  removeSalesItem,
  salesTotal,
  bankSalesAmount,
  setBankSalesAmount,
  onInfoClick,
  differenceExplanations,
  addDifferenceExplanation,
  updateDifferenceExplanation,
  removeDifferenceExplanation,
  explainedDifferenceTotal
}) => {
  const salesCollectionDifference = salesTotal.amount + salesTotal.tax - bankSalesAmount;
  // 修改百分比计算方式：(销售收入 - 银行收款) / 销售收入 * 100
  const totalSalesAmount = salesTotal.amount + salesTotal.tax;
  const salesCollectionDifferencePercentage = totalSalesAmount !== 0 
    ? (salesCollectionDifference / totalSalesAmount * 100) 
    : 0;
  const showDifferenceExplanation = Math.abs(salesCollectionDifferencePercentage) > 10;
  const unexplainedDifference = salesCollectionDifference - explainedDifferenceTotal;
  const unexplainedDifferencePercentage = totalSalesAmount !== 0
    ? ((unexplainedDifference) / totalSalesAmount * 100) 
    : 0;

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-bold border-l-4 border-tax-blue pl-3">
          销出
        </CardTitle>
      </CardHeader>
      <CardContent>
        <SalesTable
          salesData={salesData}
          addSalesItem={addSalesItem}
          updateSalesItem={updateSalesItem}
          removeSalesItem={removeSalesItem}
          salesTotal={salesTotal}
          onInfoClick={onInfoClick}
        />
        
        <SalesCollectionDifference
          bankSalesAmount={bankSalesAmount}
          setBankSalesAmount={setBankSalesAmount}
          salesCollectionDifference={salesCollectionDifference}
          salesCollectionDifferencePercentage={salesCollectionDifferencePercentage}
          onInfoClick={onInfoClick}
        />

        {showDifferenceExplanation && (
          <DifferenceExplanation
            differenceExplanations={differenceExplanations}
            addDifferenceExplanation={addDifferenceExplanation}
            updateDifferenceExplanation={updateDifferenceExplanation}
            removeDifferenceExplanation={removeDifferenceExplanation}
            explainedDifferenceTotal={explainedDifferenceTotal}
            unexplainedDifference={unexplainedDifference}
            unexplainedDifferencePercentage={unexplainedDifferencePercentage}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default VatSalesSection;
