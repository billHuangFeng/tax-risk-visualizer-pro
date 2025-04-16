
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
    <div className="grid grid-cols-12 gap-4 mt-6 mb-4 items-center">
      <div className="col-span-3 font-medium flex items-center">
        银行采购款
        <button 
          className="ml-2 text-tax-blue hover:text-tax-light-blue"
          onClick={() => onInfoClick?.('bankPurchasesAmount')}
        >
          <Info size={16} />
        </button>
      </div>
      <div className="col-span-3 text-right">
        <Input
          type="number"
          value={bankPurchasesAmount}
          onChange={(e) => setBankPurchasesAmount(parseFloat(e.target.value) || 0)}
          className="w-full text-right"
        />
      </div>
      
      <div className="col-span-3 font-medium flex items-center">
        采购与付款差异
        <button 
          className="ml-2 text-tax-blue hover:text-tax-light-blue"
          onClick={() => onInfoClick?.('purchaseCollectionDifference')}
        >
          <Info size={16} />
        </button>
      </div>
      <div className="col-span-3 text-right flex items-center justify-end gap-2">
        <Input
          type="number"
          value={difference.toFixed(2)}
          className="w-full text-right bg-gray-100"
          disabled
        />
        <span className="text-sm text-gray-500 whitespace-nowrap">
          {differencePercentage.toFixed(2)}%
        </span>
      </div>
    </div>
  );
};

export default PurchasesPaymentSection;
