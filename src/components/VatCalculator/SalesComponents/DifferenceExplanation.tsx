
import React from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Trash2, Plus, CircleCheck, TriangleAlert, CircleX } from 'lucide-react';
import { DifferenceExplanation as DifferenceExplanationType } from '@/hooks/useVatCalculator';

interface DifferenceExplanationProps {
  differenceExplanations: DifferenceExplanationType[];
  addDifferenceExplanation: () => void;
  updateDifferenceExplanation: (id: string, field: keyof DifferenceExplanationType, value: any) => void;
  removeDifferenceExplanation: (id: string) => void;
  explainedDifferenceTotal: number;
  unexplainedDifference: number;
  unexplainedDifferencePercentage: number;
}

const DifferenceExplanation: React.FC<DifferenceExplanationProps> = ({
  differenceExplanations,
  addDifferenceExplanation,
  updateDifferenceExplanation,
  removeDifferenceExplanation,
  explainedDifferenceTotal,
  unexplainedDifference,
  unexplainedDifferencePercentage,
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
    <div className="mt-4 p-4 border rounded-lg bg-amber-50/70 w-2/3 ml-auto mr-0">
      <div className="mb-2 font-medium text-yellow-800">
        差异说明
        <span className="ml-2 text-sm text-yellow-600">
          (销售与收款差异超过10%)
        </span>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow className="bg-yellow-100/50">
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
            <TableRow key={explanation.id}>
              <TableCell>
                <Input
                  value={explanation.reason}
                  onChange={(e) => updateDifferenceExplanation(explanation.id, 'reason', e.target.value)}
                  placeholder="请输入差异原因"
                  className="w-full bg-white"
                />
              </TableCell>
              <TableCell>
                <Input
                  type="number"
                  value={explanation.amount}
                  onChange={(e) => updateDifferenceExplanation(explanation.id, 'amount', parseFloat(e.target.value) || 0)}
                  className="text-right w-full bg-white"
                />
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeDifferenceExplanation(explanation.id)}
                  disabled={differenceExplanations.length <= 1}
                >
                  <Trash2 className="h-4 w-4 text-gray-500" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
          
          <TableRow>
            <TableCell colSpan={3}>
              <Button
                variant="outline"
                size="sm"
                onClick={addDifferenceExplanation}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                添加差异说明
              </Button>
            </TableCell>
          </TableRow>

          <TableRow className="bg-yellow-100/50 font-medium">
            <TableCell>总计</TableCell>
            <TableCell className="text-right">{explainedDifferenceTotal.toFixed(2)}</TableCell>
            <TableCell></TableCell>
          </TableRow>

          <TableRow className="bg-yellow-100/50 font-medium">
            <TableCell>未解释差异</TableCell>
            <TableCell className="text-right flex items-center justify-end gap-2">
              <div className="flex items-center gap-2">
                {getWarningIcon(unexplainedDifferencePercentage)}
                {unexplainedDifference.toFixed(2)}
              </div>
              <span className="text-sm text-gray-500 whitespace-nowrap">
                {unexplainedDifferencePercentage.toFixed(2)}%
              </span>
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default DifferenceExplanation;
