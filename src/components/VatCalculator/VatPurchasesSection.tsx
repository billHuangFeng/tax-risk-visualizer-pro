
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Trash2, Plus, Info } from 'lucide-react';
import { VatPurchaseItem } from '@/hooks/useVatCalculator';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

const VAT_RATES = ['13', '10', '9', '6', '5', '3', '1'];

const VatPurchasesSection: React.FC<VatPurchasesSectionProps> = ({
  purchasesData,
  addPurchaseItem,
  updatePurchaseItem,
  removePurchaseItem,
  purchasesTotal,
  onInfoClick
}) => {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-bold border-l-4 border-tax-blue pl-3">
          购进
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="w-1/3 text-left">产品类别</TableHead>
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
              <TableRow key={item.id}>
                <TableCell className="text-left">
                  <Input
                    value={item.productName}
                    onChange={(e) => updatePurchaseItem(item.id, 'productName', e.target.value)}
                    className="w-full text-left"
                  />
                </TableCell>
                <TableCell className="text-right">
                  <Input
                    type="number"
                    value={item.purchaseAmount}
                    onChange={(e) => updatePurchaseItem(item.id, 'purchaseAmount', parseFloat(e.target.value) || 0)}
                    className="text-right w-full"
                  />
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Select
                      value={item.vatRate.toString()}
                      onValueChange={(value) => updatePurchaseItem(item.id, 'vatRate', parseFloat(value))}
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
                  {item.inputTax.toFixed(2)}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removePurchaseItem(item.id)}
                    disabled={purchasesData.length <= 1}
                  >
                    <Trash2 className="h-4 w-4 text-gray-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            
            <TableRow className="bg-gray-50 font-bold">
              <TableCell className="text-left">合计</TableCell>
              <TableCell className="text-right">{purchasesTotal.amount.toFixed(2)}</TableCell>
              <TableCell></TableCell>
              <TableCell className="text-right">{purchasesTotal.tax.toFixed(2)}</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
        
        <Button
          variant="outline"
          size="sm"
          className="mt-4"
          onClick={addPurchaseItem}
        >
          <Plus className="h-4 w-4 mr-2" />
          添加采购项目
        </Button>
      </CardContent>
    </Card>
  );
};

export default VatPurchasesSection;
