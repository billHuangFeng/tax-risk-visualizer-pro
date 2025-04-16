
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Info, Plus, Trash2 } from 'lucide-react';
import type { DifferenceExplanation } from '@/hooks/types';

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
  onInfoClick
}) => {
  return (
    <div className="border rounded-lg p-4 bg-gray-50">
      <h3 className="text-lg font-medium mb-4">差异说明 (采购与付款差异超过10%)</h3>
      
      <div className="space-y-4">
        {differenceExplanations.map((explanation) => (
          <div key={explanation.id} className="grid grid-cols-12 gap-4 items-center">
            <div className="col-span-7">
              <Input
                placeholder="请输入差异原因"
                value={explanation.reason}
                onChange={(e) => updateDifferenceExplanation(explanation.id, 'reason', e.target.value)}
              />
            </div>
            <div className="col-span-4">
              <Input
                type="number"
                className="text-right"
                value={explanation.amount}
                onChange={(e) => updateDifferenceExplanation(explanation.id, 'amount', parseFloat(e.target.value) || 0)}
              />
            </div>
            <div className="col-span-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeDifferenceExplanation(explanation.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
        
        <Button
          variant="outline"
          className="w-full"
          onClick={addDifferenceExplanation}
        >
          <Plus className="h-4 w-4 mr-2" />
          添加差异说明
        </Button>

        <div className="grid grid-cols-12 gap-4 items-center mt-4">
          <div className="col-span-7 font-medium flex items-center">
            总计
            <button
              className="ml-2 text-tax-blue hover:text-tax-light-blue"
              onClick={() => onInfoClick?.('differenceTotalAmount')}
            >
              <Info size={16} />
            </button>
          </div>
          <div className="col-span-4 text-right">
            {explainedDifferenceTotal.toFixed(2)}
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4 items-center">
          <div className="col-span-7 font-medium flex items-center text-tax-red">
            未解释差异
            <button
              className="ml-2 text-tax-blue hover:text-tax-light-blue"
              onClick={() => onInfoClick?.('unexplainedDifferenceAmount')}
            >
              <Info size={16} />
            </button>
          </div>
          <div className="col-span-4 text-right text-tax-red flex items-center justify-end gap-2">
            <span>{unexplainedDifference.toFixed(2)}</span>
            <span className="text-sm text-gray-500">
              {unexplainedDifferencePercentage.toFixed(2)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseDifferenceExplanation;
