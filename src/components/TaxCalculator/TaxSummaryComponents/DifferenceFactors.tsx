
import React from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Trash2, Plus, Info } from 'lucide-react';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

export interface DifferenceFactor {
  id: string;
  description: string;
  amount: number;
}

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
    <div className="pt-4 border-t">
      <div className="flex items-center mb-4">
        <h3 className="text-lg font-semibold">差异原因分析</h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button 
                className="ml-2 text-tax-blue hover:text-tax-light-blue"
                onClick={() => onInfoClick?.('taxDifferenceFactors')}
              >
                <Info size={16} />
              </button>
            </TooltipTrigger>
            <TooltipContent className="max-w-[300px]">
              <div className="space-y-2">
                <h4 className="font-bold">差异原因分析</h4>
                <p className="text-sm">
                  差异原因分析是指对企业所得税理论税额与实际申报税额之间的差异进行详细解释和分类。
                </p>
                <h5 className="font-semibold mt-2">分析目的：</h5>
                <ul className="list-disc list-inside text-sm">
                  <li>识别税额差异的具体来源</li>
                  <li>评估税收筹划的合理性</li>
                  <li>降低税务风险</li>
                </ul>
                <p className="text-xs text-gray-500 mt-2">
                  提示：详细准确地记录差异原因是降低税务审计风险的关键。
                </p>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
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
