
import React from 'react';
import { Input } from '@/components/ui/input';
import { Info } from 'lucide-react';

interface PurchasesPaymentSectionProps {
  bankPurchasesAmount: number;
  setBankPurchasesAmount: (value: number) => void;
  onInfoClick?: (infoKey: string) => void;
}

const PurchasesPaymentSection: React.FC<PurchasesPaymentSectionProps> = ({
  bankPurchasesAmount,
  setBankPurchasesAmount,
  onInfoClick,
}) => {
  return (
    <div className="mt-4 flex justify-end items-center">
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
  );
};

export default PurchasesPaymentSection;
