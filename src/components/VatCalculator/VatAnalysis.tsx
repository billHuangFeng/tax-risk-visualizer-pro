
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Trash2, Plus, Info } from 'lucide-react';
import { DifferenceFactor } from '@/hooks/useVatCalculator';

interface VatAnalysisProps {
  differenceFactors: DifferenceFactor[];
  addDifferenceFactor: () => void;
  updateDifferenceFactor: (id: string, field: keyof DifferenceFactor, value: any) => void;
  removeDifferenceFactor: (id: string) => void;
  unexplainedDifference: number;
  riskLevel: string;
  onInfoClick?: (infoKey: string) => void;
}

const VatAnalysis: React.FC<VatAnalysisProps> = ({
  differenceFactors,
  addDifferenceFactor,
  updateDifferenceFactor,
  removeDifferenceFactor,
  unexplainedDifference,
  riskLevel,
  onInfoClick
}) => {
  const getRiskColor = () => {
    switch (riskLevel) {
      case '风险非常高':
        return 'text-red-600 bg-red-50';
      case '风险较高':
        return 'text-orange-600 bg-orange-50';
      case '风险中等':
        return 'text-yellow-600 bg-yellow-50';
      default:
        return 'text-green-600 bg-green-50';
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-bold border-l-4 border-tax-blue pl-3">
          差异原因分析
          <button 
            className="ml-2 text-tax-blue hover:text-tax-light-blue"
            onClick={() => onInfoClick?.('differenceFactors')}
          >
            <Info size={16} />
          </button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="w-3/4">差异原因</TableHead>
              <TableHead className="text-right">金额</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {differenceFactors.map((factor) => (
              <TableRow key={factor.id}>
                <TableCell>
                  <Input
                    value={factor.description}
                    onChange={(e) => updateDifferenceFactor(factor.id, 'description', e.target.value)}
                    className="w-full"
                  />
                </TableCell>
                <TableCell className="text-right">
                  <Input
                    type="number"
                    value={factor.amount}
                    onChange={(e) => updateDifferenceFactor(factor.id, 'amount', parseFloat(e.target.value) || 0)}
                    className="text-right w-full"
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeDifferenceFactor(factor.id)}
                    disabled={differenceFactors.length <= 1}
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
          onClick={addDifferenceFactor}
        >
          <Plus className="h-4 w-4 mr-2" />
          添加差异原因
        </Button>
        
        <div className="mt-6 p-4 border rounded-md space-y-3">
          <div className="flex justify-between items-center">
            <div className="font-medium flex items-center">
              未解释差异
              <button 
                className="ml-2 text-tax-blue hover:text-tax-light-blue"
                onClick={() => onInfoClick?.('unexplainedDifference')}
              >
                <Info size={16} />
              </button>
            </div>
            <div className="text-lg font-bold text-red-600">
              {unexplainedDifference.toFixed(1)}
            </div>
          </div>
          
          <div className="flex justify-between items-center pt-2 border-t">
            <div className="font-medium">风险评估</div>
            <div className={`px-3 py-1 rounded-full font-medium ${getRiskColor()}`}>
              {riskLevel}
            </div>
          </div>

          <div className="pt-2 border-t">
            <div className="text-sm text-gray-600">
              差异评测基准：{Math.abs(unexplainedDifference).toFixed(6)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VatAnalysis;
