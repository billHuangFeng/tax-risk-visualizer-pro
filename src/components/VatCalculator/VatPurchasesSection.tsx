
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { VatPurchaseItem, DifferenceExplanation } from '@/hooks/types';
import PurchasesTable from './PurchasesComponents/PurchasesTable';
import PurchasesPaymentSection from './PurchasesComponents/PurchasesPaymentSection';
import PurchaseDifferenceExplanation from './PurchasesComponents/PurchaseDifferenceExplanation';

interface VatPurchasesSectionProps {
  purchasesData: VatPurchaseItem[];
  addPurchaseItem: () => void;
  updatePurchaseItem: (id: string, field: keyof VatPurchaseItem, value: any) => void;
  removePurchaseItem: (id: string) => void;
  purchasesTotal: {
    amount: number;
    tax: number;
  };
  bankPurchasesAmount: number;
  setBankPurchasesAmount: (value: number) => void;
  onInfoClick?: (infoKey: string) => void;
  differenceExplanations: DifferenceExplanation[];
  addDifferenceExplanation: () => void;
  updateDifferenceExplanation: (id: string, field: keyof DifferenceExplanation, value: any) => void;
  removeDifferenceExplanation: (id: string) => void;
  explainedDifferenceTotal: number;
}

const VatPurchasesSection: React.FC<VatPurchasesSectionProps> = ({
  purchasesData,
  addPurchaseItem,
  updatePurchaseItem,
  removePurchaseItem,
  purchasesTotal,
  bankPurchasesAmount,
  setBankPurchasesAmount,
  onInfoClick,
  differenceExplanations,
  addDifferenceExplanation,
  updateDifferenceExplanation,
  removeDifferenceExplanation,
  explainedDifferenceTotal
}) => {
  const purchasePaymentDifference = purchasesTotal.amount + purchasesTotal.tax - bankPurchasesAmount;
  const purchasePaymentDifferencePercentage = ((purchasePaymentDifference) / (purchasesTotal.amount + purchasesTotal.tax) * 100) || 0;
  const showDifferenceExplanation = Math.abs(purchasePaymentDifferencePercentage) > 10;
  const unexplainedDifference = purchasePaymentDifference - explainedDifferenceTotal;
  const unexplainedDifferencePercentage = ((unexplainedDifference) / (purchasesTotal.amount + purchasesTotal.tax) * 100) || 0;

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-bold border-l-4 border-tax-blue pl-3">
          购进
        </CardTitle>
      </CardHeader>
      <CardContent>
        <PurchasesTable
          purchasesData={purchasesData}
          addPurchaseItem={addPurchaseItem}
          updatePurchaseItem={updatePurchaseItem}
          removePurchaseItem={removePurchaseItem}
          purchasesTotal={purchasesTotal}
          onInfoClick={onInfoClick}
        />
        
        <PurchasesPaymentSection
          bankPurchasesAmount={bankPurchasesAmount}
          setBankPurchasesAmount={setBankPurchasesAmount}
          purchasesTotal={purchasesTotal}
          onInfoClick={onInfoClick}
        />

        {showDifferenceExplanation && (
          <PurchaseDifferenceExplanation
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

export default VatPurchasesSection;

