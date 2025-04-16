import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Trash2, Plus, Info, CircleCheck, CircleAlert, OctagonAlert } from 'lucide-react';
import { VatSalesItem, DifferenceExplanation } from '@/hooks/useVatCalculator';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

interface VatSalesSectionProps {
  salesData: VatSalesItem[];
  addSalesItem: () => void;
  updateSalesItem: (id: string, field: keyof VatSalesItem, value: any) => void;
  removeSalesItem: (id: string) => void;
  salesTotal: {
    amount: number;
    tax: number;
  };
  bankSalesAmount: number;
  setBankSalesAmount: (value: number) => void;
  onInfoClick?: (infoKey: string) => void;
  differenceExplanations: DifferenceExplanation[];
  addDifferenceExplanation: () => void;
  updateDifferenceExplanation: (id: string, field: keyof DifferenceExplanation, value: any) => void;
  removeDifferenceExplanation: (id: string) => void;
  explainedDifferenceTotal: number;
}

const VAT_RATES = ['13', '9', '6', '5', '3', '1'];

const VatSalesSection: React.FC<VatSalesSectionProps> = ({
  salesData,
  addSalesItem,
  updateSalesItem,
  removeSalesItem,
  salesTotal,
  bankSalesAmount,
  setBankSalesAmount,
  onInfoClick,
  differenceExplanations,
  addDifferenceExplanation,
  updateDifferenceExplanation,
  removeDifferenceExplanation,
  explainedDifferenceTotal
}) => {
  const salesCollectionDifference = salesTotal.amount + salesTotal.tax - bankSalesAmount;
  const salesCollectionDifferencePercentage = ((salesCollectionDifference) / (salesTotal.amount + salesTotal.tax) * 100) || 0;
  const showDifferenceExplanation = Math.abs(salesCollectionDifferencePercentage) > 10;
  const unexplainedDifference = salesCollectionDifference - explainedDifferenceTotal;
  const unexplainedDifferencePercentage = ((unexplainedDifference) / (salesTotal.amount + salesTotal.tax) * 100) || 0;

  const getWarningIcon = (percentage: number) => {
    const absPercentage = Math.abs(percentage);
    if (absPercentage <= 10) {
      return <CircleCheck className="h-4 w-4 text-[#ea384c]" />;
    } else if (absPercentage <= 30) {
      return <CircleAlert className="h-4 w-4 text-[#FEF7CD]" />;
    } else if (absPercentage <= 60) {
      return <CircleAlert className="h-4 w-4 text-[#F97316]" />;
    } else {
      return <OctagonAlert className="h-4 w-4 text-[#ea384c]" />;
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-bold border-l-4 border-tax-blue pl-3">
          销出
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="w-1/3">产品类别</TableHead>
              <TableHead className="text-right">销售额<br/>(不含增值税)</TableHead>
              <TableHead className="text-right">增值税率（征收率）</TableHead>
              <TableHead className="text-right">
                销项税
                <button 
                  className="ml-2 text-tax-blue hover:text-tax-light-blue"
                  onClick={() => onInfoClick?.('outputTax')}
                >
                  <Info size={16} />
                </button>
              </TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {salesData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Input
                    value={item.productName}
                    onChange={(e) => updateSalesItem(item.id, 'productName', e.target.value)}
                    className="w-full"
                  />
                </TableCell>
                <TableCell className="text-right">
                  <Input
                    type="number"
                    value={item.salesAmount}
                    onChange={(e) => updateSalesItem(item.id, 'salesAmount', parseFloat(e.target.value) || 0)}
                    className="text-right w-full"
                  />
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Select
                      value={item.vatRate.toString()}
                      onValueChange={(value) => updateSalesItem(item.id, 'vatRate', parseFloat(value))}
                    >
                      <SelectTrigger className="w-20">
                        <SelectValue placeholder="税率" />
                      </SelectTrigger>
                      <SelectContent>
                        {VAT_RATES.map((rate) => (
                          <SelectItem key={rate} value={rate}>{rate}%</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <span>%</span>
                  </div>
                </TableCell>
                <TableCell className="text-right font-medium">
                  {item.outputTax.toFixed(2)}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeSalesItem(item.id)}
                    disabled={salesData.length <= 1}
                  >
                    <Trash2 className="h-4 w-4 text-gray-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            
            <TableRow>
              <TableCell colSpan={5}>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addSalesItem}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  添加产品类别
                </Button>
              </TableCell>
            </TableRow>
            
            <TableRow className="bg-gray-50 font-bold">
              <TableCell>合计</TableCell>
              <TableCell className="text-right">{salesTotal.amount.toFixed(2)}</TableCell>
              <TableCell></TableCell>
              <TableCell className="text-right">{salesTotal.tax.toFixed(2)}</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
        
        <div className="grid grid-cols-12 gap-4 mt-6 mb-4 items-center">
          <div className="col-span-3 font-medium flex items-center">
            银行收款金额
            <button 
              className="ml-2 text-tax-blue hover:text-tax-light-blue"
              onClick={() => onInfoClick?.('bankSalesAmount')}
            >
              <Info size={16} />
            </button>
          </div>
          <div className="col-span-3 text-right">
            <Input
              type="number"
              value={bankSalesAmount}
              onChange={(e) => setBankSalesAmount(parseFloat(e.target.value) || 0)}
              className="w-full text-right"
            />
          </div>
          
          <div className="col-span-3 font-medium flex items-center">
            销售与收款差异
            <button 
              className="ml-2 text-tax-blue hover:text-tax-light-blue"
              onClick={() => onInfoClick?.('salesCollectionDifference')}
            >
              <Info size={16} />
            </button>
          </div>
          <div className="col-span-3 text-right flex items-center justify-end gap-2">
            <Input
              type="number"
              value={salesCollectionDifference}
              className="w-full text-right bg-gray-100"
              disabled
            />
            <span className="text-sm text-gray-500 whitespace-nowrap">
              {salesCollectionDifferencePercentage.toFixed(2)}%
            </span>
          </div>
        </div>

        {showDifferenceExplanation && (
          <div className="mt-4 p-4 border rounded-lg bg-yellow-50 w-2/3 ml-auto mr-0">
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
                      添加差��说明
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
        )}
      </CardContent>
    </Card>
  );
};

export default VatSalesSection;
