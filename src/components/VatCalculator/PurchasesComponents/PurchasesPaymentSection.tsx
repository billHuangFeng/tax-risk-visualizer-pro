
import React from 'react';
import { Input } from '@/components/ui/input';
import { Info } from 'lucide-react';

interface PurchasesPaymentSectionProps {
  bankPurchasesAmount: number;
  setBankPurchasesAmount: (value: number) => void;
  onInfoClick?: (infoKey: string) => void;
  purchasesTotal: {
    amount: number;
    tax: number;
  };
}

const PurchasesPaymentSection: React.FC<PurchasesPaymentSectionProps> = ({
  bankPurchasesAmount,
  setBankPurchasesAmount,
  onInfoClick,
  purchasesTotal,
}) => {
  const totalWithTax = purchasesTotal.amount + purchasesTotal.tax;
  const difference = totalWithTax - bankPurchasesAmount;
  const differencePercentage = totalWithTax !== 0 ? (Math.abs(difference) / totalWithTax) * 100 : 0;

  return (
    <div className="mt-4 space-y-4">
      <div className="flex justify-end items-center">
        <div className="flex items-center gap-2">
          <span className="font-medium">银行采购款</span>
          <button 
            className="text-tax-blue hover:text-tax-light-blue"
            onClick={() => onInfoClick?.('bankPurchasesAmount')}
          >
            <Info size={16} />
          </button>
          <Input
            type="number"
            value={bankPurchasesAmount}
            onChange={(e) => setBankPurchasesAmount(parseFloat(e.target.value) || 0)}
            className="w-32 text-right"
          />
        </div>
      </div>

      <div className="flex justify-end items-center">
        <div className="flex items-center gap-2">
          <span className="font-medium">采购与付款差异</span>
          <button 
            className="text-tax-blue hover:text-tax-light-blue"
            onClick={() => onInfoClick?.('purchaseCollectionDifference')}
          >
            <Info size={16} />
          </button>
          <span className={`${difference !== 0 ? 'text-red-500' : ''} min-w-[128px] text-right`}>
            {difference.toFixed(2)}
            <span className="ml-2 text-sm text-gray-500">
              ({differencePercentage.toFixed(2)}%)
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PurchasesPaymentSection;
