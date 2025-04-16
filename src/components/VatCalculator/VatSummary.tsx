import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Info, Plus, Trash2 } from 'lucide-react';
import { DifferenceFactor } from '@/hooks/useVatCalculator';

interface VatSummaryProps {
  payableTax: number;
  actualTax: number;
  setActualTax: (value: number) => void;
  taxDifference: number;
  taxDifferencePercentage: number;
  salesDifferenceFactors: DifferenceFactor[];
  addSalesDifferenceFactor: () => void;
  updateSalesDifferenceFactor: (id: string, field: keyof DifferenceFactor, value: any) => void;
  removeSalesDifferenceFactor: (id: string) => void;
  purchasesDifferenceFactors: DifferenceFactor[];
  addPurchasesDifferenceFactor: () => void;
  updatePurchasesDifferenceFactor: (id: string, field: keyof DifferenceFactor, value: any) => void;
  removePurchasesDifferenceFactor: (id: string) => void;
  unexplainedDifference: number;
  riskLevel: string;
  onInfoClick?: (infoKey: string) => void;
}

const VatSummary: React.FC<VatSummaryProps> = ({
  payableTax,
  actualTax,
  setActualTax,
  taxDifference,
  taxDifferencePercentage,
  salesDifferenceFactors,
  addSalesDifferenceFactor,
  updateSalesDifferenceFactor,
  removeSalesDifferenceFactor,
  purchasesDifferenceFactors,
  addPurchasesDifferenceFactor,
  updatePurchasesDifferenceFactor,
  removePurchasesDifferenceFactor,
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
          增值税汇总
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="font-medium flex items-center">
                应交增值税
                <button 
                  className="ml-2 text-tax-blue hover:text-tax-light-blue"
                  onClick={() => onInfoClick?.('payableTax')}
                >
                  <Info size={16} />
                </button>
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
                <button 
                  className="ml-2 text-tax-blue hover:text-tax-light-blue"
                  onClick={() => onInfoClick?.('actualTax')}
                >
                  <Info size={16} />
                </button>
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
                <button 
                  className="ml-2 text-tax-blue hover:text-tax-light-blue"
                  onClick={() => onInfoClick?.('taxDifference')}
                >
                  <Info size={16} />
                </button>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-lg font-bold text-black ${Math.abs(taxDifference) > 0 ? 'text-red-500' : ''}`}>
                  {taxDifference.toFixed(2)}
                </span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="font-medium">差异幅度</div>
              <div className="flex items-center gap-2">
                <span className={`text-lg font-bold text-black ${taxDifferencePercentage > 20 ? 'text-red-500' : ''}`}>
                  {taxDifferencePercentage.toFixed(2)}%
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t pt-6 space-y-6">
          <div>
            <div className="flex items-center mb-4">
              <h3 className="text-lg font-semibold">销售差异原因分析</h3>
              <button 
                className="ml-2 text-tax-blue hover:text-tax-light-blue"
                onClick={() => onInfoClick?.('salesDifferenceFactors')}
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
                {salesDifferenceFactors.map((factor) => (
                  <TableRow key={factor.id} className="h-12">
                    <TableCell className="py-1">
                      <Input
                        value={factor.description}
                        onChange={(e) => updateSalesDifferenceFactor(factor.id, 'description', e.target.value)}
                        className="w-full text-left h-8"
                      />
                    </TableCell>
                    <TableCell className="text-right py-1">
                      <Input
                        type="number"
                        value={factor.amount}
                        onChange={(e) => updateSalesDifferenceFactor(factor.id, 'amount', parseFloat(e.target.value) || 0)}
                        className="text-right w-full h-8"
                      />
                    </TableCell>
                    <TableCell className="py-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeSalesDifferenceFactor(factor.id)}
                        disabled={salesDifferenceFactors.length <= 1}
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
              onClick={addSalesDifferenceFactor}
            >
              <Plus className="h-4 w-4 mr-2" />
              添加销售差异原因
            </Button>
          </div>

          <div>
            <div className="flex items-center mb-4">
              <h3 className="text-lg font-semibold">采购差异原因分析</h3>
              <button 
                className="ml-2 text-tax-blue hover:text-tax-light-blue"
                onClick={() => onInfoClick?.('purchasesDifferenceFactors')}
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
                {purchasesDifferenceFactors.map((factor) => (
                  <TableRow key={factor.id} className="h-12">
                    <TableCell className="py-1">
                      <Input
                        value={factor.description}
                        onChange={(e) => updatePurchasesDifferenceFactor(factor.id, 'description', e.target.value)}
                        className="w-full text-left h-8"
                      />
                    </TableCell>
                    <TableCell className="text-right py-1">
                      <Input
                        type="number"
                        value={factor.amount}
                        onChange={(e) => updatePurchasesDifferenceFactor(factor.id, 'amount', parseFloat(e.target.value) || 0)}
                        className="text-right w-full h-8"
                      />
                    </TableCell>
                    <TableCell className="py-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removePurchasesDifferenceFactor(factor.id)}
                        disabled={purchasesDifferenceFactors.length <= 1}
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
              onClick={addPurchasesDifferenceFactor}
            >
              <Plus className="h-4 w-4 mr-2" />
              添加采购差异原因
            </Button>
          </div>

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
                {unexplainedDifference.toFixed(2)}
              </div>
            </div>
            
            <div className="flex justify-between items-center pt-2 border-t">
              <div className="font-medium">风险评估</div>
              <div className={`px-3 py-1 rounded-full font-medium ${getRiskColor()}`}>
                {riskLevel}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VatSummary;
