
import React from 'react';
import { Input } from '@/components/ui/input';
import { Info } from 'lucide-react';

interface SalesCollectionDifferenceProps {
  bankSalesAmount: number;
  setBankSalesAmount: (value: number) => void;
  salesCollectionDifference: number;
  salesCollectionDifferencePercentage: number;
  onInfoClick?: (infoKey: string) => void;
}

const SalesCollectionDifference: React.FC<SalesCollectionDifferenceProps> = ({
  bankSalesAmount,
  setBankSalesAmount,
  salesCollectionDifference,
  salesCollectionDifferencePercentage,
  onInfoClick,
}) => {
  return (
    <div className="grid grid-cols-12 gap-4 mt-6 mb-4 items-center">
      <div className="col-span-3 font-medium flex items-center">
        银行收款金额
        <button 
          className="ml-2 text-tax-blue hover:text-tax-light-blue"
          onClick={() => onInfoClick?.('bankSalesAmount')}
        >
          <Info size={16} />
        </button>
      </div>
      <div className="col-span-3 text-right">
        <Input
          type="number"
          value={bankSalesAmount}
          onChange={(e) => setBankSalesAmount(parseFloat(e.target.value) || 0)}
          className="w-full text-right"
        />
      </div>
      
      <div className="col-span-3 font-medium flex items-center">
        销售与收款差异
        <button 
          className="ml-2 text-tax-blue hover:text-tax-light-blue"
          onClick={() => onInfoClick?.('salesCollectionDifference')}
        >
          <Info size={16} />
        </button>
      </div>
      <div className="col-span-3 text-right flex items-center justify-end gap-2">
        <Input
          type="number"
          value={salesCollectionDifference.toFixed(2)}
          className="w-full text-right bg-gray-100"
          disabled
        />
        <span className="text-sm text-gray-500 whitespace-nowrap">
          {salesCollectionDifferencePercentage.toFixed(2)}%
        </span>
      </div>
    </div>
  );
};

export default SalesCollectionDifference;
