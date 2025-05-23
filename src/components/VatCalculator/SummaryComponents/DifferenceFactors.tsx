
import React from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Trash2, Plus, Info } from 'lucide-react';
import type { DifferenceFactor } from '@/hooks/useVatCalculator';

interface DifferenceFactorsProps {
  taxDifferenceFactors: DifferenceFactor[];
  addTaxDifferenceFactor: () => void;
  updateTaxDifferenceFactor: (id: string, field: keyof DifferenceFactor, value: any) => void;
  removeTaxDifferenceFactor: (id: string) => void;
  onInfoClick?: (infoKey: string) => void;
}

const DifferenceFactors: React.FC<DifferenceFactorsProps> = ({
  taxDifferenceFactors,
  addTaxDifferenceFactor,
  updateTaxDifferenceFactor,
  removeTaxDifferenceFactor,
  onInfoClick
}) => {
  return (
    <div>
      <div className="flex items-center mb-4">
        <h3 className="text-lg font-semibold">差异原因分析</h3>
        <button 
          className="ml-2 text-tax-blue hover:text-tax-light-blue"
          onClick={() => onInfoClick?.('differenceFactors')}
        >
          <Info size={16} />
        </button>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="w-3/4 text-left">差异原因</TableHead>
            <TableHead className="text-right">金额</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {taxDifferenceFactors.map((factor) => (
            <TableRow key={factor.id} className="h-12">
              <TableCell className="py-1">
                <Input
                  value={factor.description}
                  onChange={(e) => updateTaxDifferenceFactor(factor.id, 'description', e.target.value)}
                  className="w-full text-left h-8"
                />
              </TableCell>
              <TableCell className="text-right py-1">
                <Input
                  type="number"
                  value={factor.amount}
                  onChange={(e) => updateTaxDifferenceFactor(factor.id, 'amount', parseFloat(e.target.value) || 0)}
                  className="text-right w-full h-8"
                />
              </TableCell>
              <TableCell className="py-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeTaxDifferenceFactor(factor.id)}
                  disabled={taxDifferenceFactors.length <= 1}
                >
                  <Trash2 className="h-4 w-4 text-gray-500" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      <Button
        variant="outline"
        size="sm"
        className="mt-4"
        onClick={addTaxDifferenceFactor}
      >
        <Plus className="h-4 w-4 mr-2" />
        添加差异原因
      </Button>
    </div>
  );
};

export default DifferenceFactors;
