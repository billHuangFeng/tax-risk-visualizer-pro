
import React from 'react';
import { Input } from '@/components/ui/input';
import { Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();
  const totalWithTax = purchasesTotal.amount + purchasesTotal.tax;
  const difference = totalWithTax - bankPurchasesAmount;
  const differencePercentage = totalWithTax !== 0 ? (Math.abs(difference) / totalWithTax) * 100 : 0;

  return (
    <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-12 gap-4'} mt-6 mb-4 items-center`}>
      <div className={`${isMobile ? '' : 'col-span-3'} font-medium flex items-center`}>
        银行采购款
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button 
                className="ml-2 text-tax-blue hover:text-tax-light-blue"
                onClick={() => onInfoClick?.('purchasePayment')}
              >
                <Info size={16} />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>通过银行支付的采购款项总额</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className={`${isMobile ? '' : 'col-span-3'} ${isMobile ? '' : 'text-right'}`}>
        <Input
          type="number"
          inputMode="decimal"
          value={bankPurchasesAmount}
          onChange={(e) => setBankPurchasesAmount(parseFloat(e.target.value) || 0)}
          className={`w-full text-right h-12`}
        />
      </div>
      
      <div className={`${isMobile ? 'mt-4' : 'col-span-3'} font-medium flex items-center`}>
        采购与付款差异
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button 
                className="ml-2 text-tax-blue hover:text-tax-light-blue"
                onClick={() => onInfoClick?.('purchaseCollectionDifference')}
              >
                <Info size={16} />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>进项发票金额与实际付款金额的差异</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className={`${isMobile ? '' : 'col-span-3'} text-right flex items-center justify-end gap-2`}>
        <Input
          type="number"
          value={difference.toFixed(2)}
          className="w-full text-right bg-gray-100 h-12"
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
