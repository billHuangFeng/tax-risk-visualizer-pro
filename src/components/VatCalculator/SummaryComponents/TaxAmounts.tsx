
import React from 'react';
import { Input } from '@/components/ui/input';
import { Info } from 'lucide-react';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

interface TaxAmountsProps {
  payableTax: number;
  actualTax: number;
  setActualTax: (value: number) => void;
  taxDifference: number;
  taxDifferencePercentage: number;
  onInfoClick?: (infoKey: string) => void;
}

const TaxAmounts: React.FC<TaxAmountsProps> = ({
  payableTax,
  actualTax,
  setActualTax,
  taxDifference,
  taxDifferencePercentage,
  onInfoClick
}) => {
  return (
    <div className="grid md:grid-cols-2 gap-6 mb-8">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="font-medium flex items-center">
            应交增值税
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button 
                    className="ml-2 text-tax-blue hover:text-tax-light-blue"
                    onClick={() => onInfoClick?.('payableTax')}
                  >
                    <Info size={16} />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>销项税额减去进项税额后的差额</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-black">{payableTax.toFixed(2)}</span>
            <span className="text-sm text-gray-500">
              {payableTax < 0 ? "(留抵)" : ""}
            </span>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="font-medium flex items-center">
            实缴增值税
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button 
                    className="ml-2 text-tax-blue hover:text-tax-light-blue"
                    onClick={() => onInfoClick?.('actualTax')}
                  >
                    <Info size={16} />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>企业实际缴纳的增值税额</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              value={actualTax}
              onChange={(e) => setActualTax(parseFloat(e.target.value) || 0)}
              className="w-32 text-right text-black"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="font-medium flex items-center">
            差异
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button 
                    className="ml-2 text-tax-blue hover:text-tax-light-blue"
                    onClick={() => onInfoClick?.('taxDifference')}
                  >
                    <Info size={16} />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>理论应交与实缴税额的差异</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-lg font-bold ${Math.abs(taxDifference) > 0 ? 'text-red-500' : ''}`}>
              {taxDifference.toFixed(2)}
            </span>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="font-medium flex items-center">
            差异幅度
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button 
                    className="ml-2 text-tax-blue hover:text-tax-light-blue"
                    onClick={() => onInfoClick?.('taxDifferencePercentage')}
                  >
                    <Info size={16} />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>(实缴增值税 - 应交增值税) / 应交增值税 × 100%</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-lg font-bold ${Math.abs(taxDifferencePercentage) > 20 ? 'text-red-500' : ''}`}>
              {taxDifferencePercentage.toFixed(2)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxAmounts;
