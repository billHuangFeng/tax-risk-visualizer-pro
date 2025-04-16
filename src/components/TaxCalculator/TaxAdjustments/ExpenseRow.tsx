
import React, { useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { TableCell, TableRow } from '@/components/ui/table';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface ExpenseRowProps {
  title: string;
  infoKey: string;
  values: {
    actual: string;
    deductible: string;
    adjustment: string;
  };
  onChange: (field: string, value: string) => void;
  onInfoClick?: (infoKey: string) => void;
  isNegativeAdjustment?: boolean;
}

const ExpenseRow: React.FC<ExpenseRowProps> = ({
  title,
  infoKey,
  values = { actual: '0', deductible: '0.00', adjustment: '0.00' },
  onChange,
  onInfoClick,
  isNegativeAdjustment,
}) => {
  const safeValues = values || { actual: '0', deductible: '0.00', adjustment: '0.00' };
  const actualInputRef = useRef<HTMLInputElement>(null);
  const deductibleInputRef = useRef<HTMLInputElement>(null);
  const adjustmentInputRef = useRef<HTMLInputElement>(null);
  
  // Update data attributes for PDF export
  useEffect(() => {
    if (actualInputRef.current) {
      actualInputRef.current.setAttribute('data-value', safeValues.actual);
    }
    if (deductibleInputRef.current) {
      deductibleInputRef.current.setAttribute('data-value', safeValues.deductible);
    }
    if (adjustmentInputRef.current) {
      adjustmentInputRef.current.setAttribute('data-value', safeValues.adjustment);
    }
  }, [safeValues]);
  
  return (
    <TableRow>
      <TableCell className="w-[35%] font-medium">
        <div className="flex items-center break-words">
          {title}
          {onInfoClick && (
            <Tooltip>
              <TooltipTrigger asChild>
                <button 
                  onClick={() => onInfoClick(infoKey)} 
                  className="ml-1 text-tax-blue hover:text-tax-light-blue focus:outline-none shrink-0"
                  aria-label={`${title}说明`}
                >
                  <Info className="h-4 w-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <span className="text-xs">点击查看详情</span>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </TableCell>
      <TableCell className="w-[15%] min-w-[180px]">
        <div className="w-full pdf-text-visible relative">
          <Input
            ref={actualInputRef}
            type="number"
            value={safeValues.actual}
            onChange={(e) => onChange('actual', e.target.value)}
            className="text-right w-full pr-8 overflow-visible letter-spacing-normal"
            data-value={safeValues.actual}
          />
          <div className="absolute right-3 top-0 bottom-0 flex items-center justify-end h-full pointer-events-none pdf-value">
            {safeValues.actual}
          </div>
        </div>
      </TableCell>
      <TableCell className="w-[20%] min-w-[180px]">
        <div className="w-full pdf-text-visible relative">
          <Input
            ref={deductibleInputRef}
            type="text"
            value={safeValues.deductible}
            readOnly
            className="text-right bg-muted w-full pr-8 overflow-visible letter-spacing-normal"
            data-value={safeValues.deductible}
          />
          <div className="absolute right-3 top-0 bottom-0 flex items-center justify-end h-full pointer-events-none pdf-value">
            {safeValues.deductible}
          </div>
        </div>
      </TableCell>
      <TableCell className="w-[20%] min-w-[180px]">
        <div className="w-full pdf-text-visible relative">
          <Input
            ref={adjustmentInputRef}
            type="text"
            value={safeValues.adjustment}
            readOnly
            className={`text-right bg-muted w-full font-bold pr-8 overflow-visible letter-spacing-normal ${
              parseFloat(safeValues.adjustment) !== 0
                ? 'text-tax-red' 
                : 'text-foreground'
            }`}
            data-value={safeValues.adjustment}
          />
          <div className="absolute right-3 top-0 bottom-0 flex items-center justify-end h-full pointer-events-none pdf-value">
            {safeValues.adjustment}
          </div>
        </div>
      </TableCell>
      <TableCell className="w-[10%] text-sm whitespace-nowrap">万元</TableCell>
    </TableRow>
  );
};

export default ExpenseRow;
