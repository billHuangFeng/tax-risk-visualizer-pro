
import React from 'react';
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
  values,
  onChange,
  onInfoClick,
  isNegativeAdjustment,
}) => {
  return (
    <TableRow>
      <TableCell className="font-medium">
        <div className="flex items-center">
          {title}
          {onInfoClick && (
            <Tooltip>
              <TooltipTrigger asChild>
                <button 
                  onClick={() => onInfoClick(infoKey)} 
                  className="ml-1 text-tax-blue hover:text-tax-light-blue focus:outline-none"
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
      <TableCell>
        <div className="w-input-text">
          <Input
            type="number"
            value={values.actual}
            onChange={(e) => onChange('actual', e.target.value)}
            className="text-right w-full"
          />
        </div>
      </TableCell>
      <TableCell>
        <div className="w-input-text">
          <Input
            type="text"
            value={values.deductible}
            readOnly
            className="text-right bg-muted w-full"
          />
        </div>
      </TableCell>
      <TableCell>
        <Input
          type="text"
          value={values.adjustment}
          readOnly
          className={`text-right bg-muted w-full ${isNegativeAdjustment ? 'text-tax-red' : ''}`}
        />
      </TableCell>
      <TableCell className="text-sm">万元</TableCell>
    </TableRow>
  );
};

export default ExpenseRow;
