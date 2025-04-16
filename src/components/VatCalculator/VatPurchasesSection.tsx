
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { VatPurchaseItem } from '@/hooks/types';
import PurchasesTable from './PurchasesComponents/PurchasesTable';
import PurchasesPaymentSection from './PurchasesComponents/PurchasesPaymentSection';

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
}

const VatPurchasesSection: React.FC<VatPurchasesSectionProps> = ({
  purchasesData,
  addPurchaseItem,
  updatePurchaseItem,
  removePurchaseItem,
  purchasesTotal,
  bankPurchasesAmount,
  setBankPurchasesAmount,
  onInfoClick
}) => {
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
      </CardContent>
    </Card>
  );
};

export default VatPurchasesSection;
