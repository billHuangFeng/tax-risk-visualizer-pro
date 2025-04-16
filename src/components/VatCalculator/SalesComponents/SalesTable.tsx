
import React from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Trash2, Plus, Info } from 'lucide-react';
import { VatSalesItem } from '@/hooks/useVatCalculator';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

interface SalesTableProps {
  salesData: VatSalesItem[];
  addSalesItem: () => void;
  updateSalesItem: (id: string, field: keyof VatSalesItem, value: any) => void;
  removeSalesItem: (id: string) => void;
  salesTotal: {
    amount: number;
    tax: number;
  };
  onInfoClick?: (infoKey: string) => void;
}

const VAT_RATES = ['13', '9', '6', '5', '3', '1'];

const SalesTable: React.FC<SalesTableProps> = ({
  salesData,
  addSalesItem,
  updateSalesItem,
  removeSalesItem,
  salesTotal,
  onInfoClick,
}) => {
  return (
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
          <TableRow key={item.id} className="h-10 py-0">
            <TableCell className="py-1">
              <Input
                value={item.productName}
                onChange={(e) => updateSalesItem(item.id, 'productName', e.target.value)}
                className="w-full h-8"
              />
            </TableCell>
            <TableCell className="text-right py-1">
              <Input
                type="number"
                value={item.salesAmount}
                onChange={(e) => updateSalesItem(item.id, 'salesAmount', parseFloat(e.target.value) || 0)}
                className="text-right w-full h-8"
              />
            </TableCell>
            <TableCell className="text-right py-1">
              <div className="flex items-center justify-end gap-2">
                <Select
                  value={item.vatRate.toString()}
                  onValueChange={(value) => updateSalesItem(item.id, 'vatRate', parseFloat(value))}
                >
                  <SelectTrigger className="w-20 h-8">
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
            <TableCell className="text-right font-medium py-1">
              {item.outputTax.toFixed(2)}
            </TableCell>
            <TableCell className="py-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeSalesItem(item.id)}
                disabled={salesData.length <= 1}
                className="h-8 w-8"
              >
                <Trash2 className="h-4 w-4 text-gray-500" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
        
        <TableRow>
          <TableCell colSpan={5} className="py-1">
            <Button
              variant="outline"
              size="sm"
              onClick={addSalesItem}
              className="w-full h-8"
            >
              <Plus className="h-4 w-4 mr-2" />
              添加产品类别
            </Button>
          </TableCell>
        </TableRow>
        
        <TableRow className="bg-gray-50 font-bold">
          <TableCell className="py-1">合计</TableCell>
          <TableCell className="text-right py-1">{salesTotal.amount.toFixed(2)}</TableCell>
          <TableCell className="py-1"></TableCell>
          <TableCell className="text-right py-1">{salesTotal.tax.toFixed(2)}</TableCell>
          <TableCell className="py-1"></TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default SalesTable;
