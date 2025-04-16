
import React from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Trash2, Plus, CircleCheck, TriangleAlert, CircleX, Info } from 'lucide-react';
import { DifferenceExplanation } from '@/hooks/types';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface PurchaseDifferenceExplanationProps {
  differenceExplanations: DifferenceExplanation[];
  addDifferenceExplanation: () => void;
  updateDifferenceExplanation: (id: string, field: keyof DifferenceExplanation, value: any) => void;
  removeDifferenceExplanation: (id: string) => void;
  explainedDifferenceTotal: number;
  unexplainedDifference: number;
  unexplainedDifferencePercentage: number;
  onInfoClick?: (infoKey: string) => void;
}

const PurchaseDifferenceExplanation: React.FC<PurchaseDifferenceExplanationProps> = ({
  differenceExplanations,
  addDifferenceExplanation,
  updateDifferenceExplanation,
  removeDifferenceExplanation,
  explainedDifferenceTotal,
  unexplainedDifference,
  unexplainedDifferencePercentage,
  onInfoClick,
}) => {
  const getWarningIcon = (percentage: number) => {
    const absPercentage = Math.abs(percentage);
    if (absPercentage <= 10) {
      return <CircleCheck className="h-4 w-4 text-green-500" />;
    } else if (absPercentage <= 30) {
      return <TriangleAlert className="h-4 w-4 text-yellow-500" />;
    } else {
      return <CircleX className="h-4 w-4 text-red-500" />;
    }
  };

  return (
    <div className="mt-4 p-4 border rounded-lg bg-gray-100/70 w-2/3 ml-auto mr-0">
      <div className="mb-2 font-medium text-gray-800">
        差异说明
        <span className="ml-2 text-sm text-gray-600">
          (采购与付款差异超过10%)
        </span>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100/50">
            <TableHead className="w-2/3">差异原因</TableHead>
            <TableHead className="text-right w-1/3">
              差异金额
              <span className="text-xs text-gray-500 ml-1">(元)</span>
            </TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {differenceExplanations.map((explanation) => (
            <TableRow key={explanation.id} className="py-1 h-12">
              <TableCell className="py-1">
                <Input
                  value={explanation.reason}
                  onChange={(e) => updateDifferenceExplanation(explanation.id, 'reason', e.target.value)}
                  placeholder="请输入差异原因"
                  className="w-full bg-white h-8"
                />
              </TableCell>
              <TableCell className="py-1">
                <Input
                  type="number"
                  value={explanation.amount}
                  onChange={(e) => updateDifferenceExplanation(explanation.id, 'amount', parseFloat(e.target.value) || 0)}
                  className="text-right w-full bg-white h-8"
                />
              </TableCell>
              <TableCell className="py-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeDifferenceExplanation(explanation.id)}
                  disabled={differenceExplanations.length <= 1}
                  className="h-8 w-8"
                >
                  <Trash2 className="h-4 w-4 text-gray-500" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
          
          <TableRow>
            <TableCell colSpan={3} className="py-1">
              <Button
                variant="outline"
                size="sm"
                onClick={addDifferenceExplanation}
                className="w-full h-8"
              >
                <Plus className="h-4 w-4 mr-2" />
                添加差异说明
              </Button>
            </TableCell>
          </TableRow>

          <TableRow className="bg-gray-100/50 font-medium">
            <TableCell className="py-1">总计</TableCell>
            <TableCell className="text-right py-1">{explainedDifferenceTotal.toFixed(2)}</TableCell>
            <TableCell className="py-1"></TableCell>
          </TableRow>

          <TableRow className="bg-gray-100/50 font-medium">
            <TableCell className="py-1 flex items-center">
              未解释差异
              {onInfoClick && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-6 w-6 ml-1 p-0.5" 
                        onClick={() => onInfoClick('purchaseUnexplainedDifference')}
                      >
                        <Info className="h-4 w-4 text-blue-600" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-[200px]" side="top">
                      <p className="text-xs">点击查看采购未解释差异的风险分析</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </TableCell>
            <TableCell className="text-right flex items-center justify-end gap-2 py-1">
              <div className="flex items-center gap-2">
                {getWarningIcon(unexplainedDifferencePercentage)}
                {unexplainedDifference.toFixed(2)}
              </div>
              <span className="text-sm text-gray-500 whitespace-nowrap">
                {unexplainedDifferencePercentage.toFixed(2)}%
              </span>
            </TableCell>
            <TableCell className="py-1"></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default PurchaseDifferenceExplanation;
