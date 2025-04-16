import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Trash2, Plus, Info } from 'lucide-react';
import { VatSalesItem } from '@/hooks/useVatCalculator';
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
  onInfoClick
}) => {
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
                  {item.outputTax.toFixed(1)}
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
            
            <TableRow className="bg-gray-50 font-bold">
              <TableCell>合计</TableCell>
              <TableCell className="text-right">{salesTotal.amount.toFixed(1)}</TableCell>
              <TableCell></TableCell>
              <TableCell className="text-right">{salesTotal.tax.toFixed(1)}</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
        
        <div className="flex justify-between items-center mt-6 mb-4">
          <div className="font-medium flex items-center">
            银行收款金额
            <button 
              className="ml-2 text-tax-blue hover:text-tax-light-blue"
              onClick={() => onInfoClick?.('bankSalesAmount')}
            >
              <Info size={16} />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              value={bankSalesAmount}
              onChange={(e) => setBankSalesAmount(parseFloat(e.target.value) || 0)}
              className="w-32 text-right"
            />
          </div>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={addSalesItem}
        >
          <Plus className="h-4 w-4 mr-2" />
          添加产品类别
        </Button>
      </CardContent>
    </Card>
  );
};

export default VatSalesSection;
