
import React from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Trash2, Plus, Info } from 'lucide-react';
import { VatPurchaseItem } from '@/hooks/useVatCalculator';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

interface PurchasesTableProps {
  purchasesData: VatPurchaseItem[];
  addPurchaseItem: () => void;
  updatePurchaseItem: (id: string, field: keyof VatPurchaseItem, value: any) => void;
  removePurchaseItem: (id: string) => void;
  purchasesTotal: {
    amount: number;
    tax: number;
  };
  onInfoClick?: (infoKey: string) => void;
}

const VAT_RATES = ['13', '10', '9', '6', '5', '3', '1'];

const PurchasesTable: React.FC<PurchasesTableProps> = ({
  purchasesData,
  addPurchaseItem,
  updatePurchaseItem,
  removePurchaseItem,
  purchasesTotal,
  onInfoClick,
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-gray-100">
          <TableHead className="w-1/3 text-left">采购类别</TableHead>
          <TableHead className="text-right">采购额<br/>(不含增值税)</TableHead>
          <TableHead className="text-right">增值税率（征收率）</TableHead>
          <TableHead className="text-right">
            进项税
            <button 
              className="ml-2 text-tax-blue hover:text-tax-light-blue"
              onClick={() => onInfoClick?.('inputTax')}
            >
              <Info size={16} />
            </button>
          </TableHead>
          <TableHead className="w-[50px]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {purchasesData.map((item) => (
          <TableRow key={item.id} className="h-10 py-0">
            <TableCell className="py-1 text-left">
              <Input
                value={item.productName}
                onChange={(e) => updatePurchaseItem(item.id, 'productName', e.target.value)}
                className="w-full h-8 text-left"
              />
            </TableCell>
            <TableCell className="text-right py-1">
              <Input
                type="number"
                value={item.purchaseAmount}
                onChange={(e) => updatePurchaseItem(item.id, 'purchaseAmount', parseFloat(e.target.value) || 0)}
                className="text-right w-full h-8"
              />
            </TableCell>
            <TableCell className="text-right py-1">
              <div className="flex items-center justify-end gap-2">
                <Select
                  value={item.vatRate.toString()}
                  onValueChange={(value) => updatePurchaseItem(item.id, 'vatRate', parseFloat(value))}
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
              {item.inputTax.toFixed(2)}
            </TableCell>
            <TableCell className="py-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removePurchaseItem(item.id)}
                disabled={purchasesData.length <= 1}
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
              onClick={addPurchaseItem}
              className="w-full h-8"
            >
              <Plus className="h-4 w-4 mr-2" />
              添加采购类别
            </Button>
          </TableCell>
        </TableRow>
        
        <TableRow className="bg-gray-50 font-bold">
          <TableCell className="py-1 text-left">合计</TableCell>
          <TableCell className="text-right py-1">{purchasesTotal.amount.toFixed(2)}</TableCell>
          <TableCell className="py-1"></TableCell>
          <TableCell className="text-right py-1">{purchasesTotal.tax.toFixed(2)}</TableCell>
          <TableCell className="py-1"></TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default PurchasesTable;
