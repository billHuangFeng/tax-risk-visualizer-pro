
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Info } from 'lucide-react';

interface VatSummaryProps {
  payableTax: number;
  actualTax: number;
  setActualTax: (value: number) => void;
  taxDifference: number;
  taxDifferencePercentage: number;
  bankSalesAmount: number;
  setBankSalesAmount: (value: number) => void;
  bankPurchasesAmount: number;
  setBankPurchasesAmount: (value: number) => void;
  onInfoClick?: (infoKey: string) => void;
}

const VatSummary: React.FC<VatSummaryProps> = ({
  payableTax,
  actualTax,
  setActualTax,
  taxDifference,
  taxDifferencePercentage,
  bankSalesAmount,
  setBankSalesAmount,
  bankPurchasesAmount,
  setBankPurchasesAmount,
  onInfoClick
}) => {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-bold border-l-4 border-tax-blue pl-3">
          增值税汇总
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
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
                <span className="text-lg font-bold">{payableTax.toFixed(1)}</span>
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
                  className="w-32 text-right"
                />
              </div>
            </div>
            
            <div className="flex justify-between items-center pt-2 border-t">
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
                <span className={`text-lg font-bold ${Math.abs(taxDifference) > 0 ? 'text-red-500' : ''}`}>
                  {taxDifference.toFixed(1)}
                </span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="font-medium">差异幅度</div>
              <div className="flex items-center gap-2">
                <span className={`text-lg font-bold ${taxDifferencePercentage > 20 ? 'text-red-500' : ''}`}>
                  {taxDifferencePercentage}%
                </span>
              </div>
            </div>
          </div>
          
          <div className="space-y-4 border-l pl-6">
            <div className="flex justify-between items-center">
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
            
            <div className="flex justify-between items-center">
              <div className="font-medium flex items-center">
                银行采购款
                <button 
                  className="ml-2 text-tax-blue hover:text-tax-light-blue"
                  onClick={() => onInfoClick?.('bankPurchasesAmount')}
                >
                  <Info size={16} />
                </button>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={bankPurchasesAmount}
                  onChange={(e) => setBankPurchasesAmount(parseFloat(e.target.value) || 0)}
                  className="w-32 text-right"
                />
              </div>
            </div>
            
            <div className="p-4 bg-yellow-50 rounded-md mt-4 text-sm">
              <p className="text-yellow-800">请确认资金支出与申报增值税的采购是否一致？</p>
              <p className="text-yellow-600 mt-1">
                {bankPurchasesAmount > 0 
                  ? `银行采购支出与申报额差异: ${Math.abs(bankPurchasesAmount - payableTax).toFixed(1)}`
                  : "请输入银行采购支出金额以进行比对"}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VatSummary;
