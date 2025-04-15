import React, { useEffect } from 'react';
import NumberInput from './NumberInput';
import GridRow from './GridRow';
import { AlertTriangle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface ExpensesSectionProps {
  totalExpenses: string;
  setTotalExpenses: (value: string) => void;
  invoicedExpenses: string;
  setInvoicedExpenses: (value: string) => void;
  nonInvoicedExpenses: string;
  setNonInvoicedExpenses: (value: string) => void;
  personalTax: string;
  setPersonalTax: (value: string) => void;
  socialSecurity: string;
  setSocialSecurity: (value: string) => void;
  depreciation: string;
  setDepreciation: (value: string) => void;
  otherExpenses: string;
  setOtherExpenses: (value: string) => void;
}

const ExpensesSection: React.FC<ExpensesSectionProps> = ({
  totalExpenses,
  setTotalExpenses,
  invoicedExpenses,
  setInvoicedExpenses,
  nonInvoicedExpenses,
  setNonInvoicedExpenses,
  personalTax,
  setPersonalTax,
  socialSecurity,
  setSocialSecurity,
  depreciation,
  setDepreciation,
  otherExpenses,
  setOtherExpenses,
}) => {
  useEffect(() => {
    const total = parseFloat(totalExpenses) || 0;
    const invoiced = parseFloat(invoicedExpenses) || 0;
    const nonInvoiced = parseFloat(nonInvoicedExpenses) || 0;
    const personal = parseFloat(personalTax) || 0;
    const social = parseFloat(socialSecurity) || 0;
    const deprec = parseFloat(depreciation) || 0;
    
    const calculatedOther = total - invoiced - nonInvoiced - personal - social - deprec;
    setOtherExpenses(calculatedOther.toString());
  }, [totalExpenses, invoicedExpenses, nonInvoicedExpenses, personalTax, socialSecurity, depreciation, setOtherExpenses]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold border-l-4 border-tax-blue pl-3">成本费用（不含可抵扣进项税）</h2>
        <div className="flex items-center">
          <NumberInput
            value={totalExpenses}
            onChange={setTotalExpenses}
            className="font-bold"
          />
        </div>
      </div>
      
      <div className="pl-4 space-y-4">
        <GridRow prefix="其中：" label="有发票的">
          <div className="flex items-center">
            <NumberInput
              value={invoicedExpenses}
              onChange={setInvoicedExpenses}
            />
            <Tooltip>
              <TooltipTrigger asChild>
                <AlertTriangle 
                  className="h-4 w-4 text-tax-red ml-2 cursor-pointer"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs max-w-xs">可按规定税前扣除的情形包括：政府性基金、税金、社保费、住房公积金、公益性捐赠、法院判决支出、协会会费、交通票据、补偿金等。具体情形请查看政策详情。</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </GridRow>
        
        <GridRow label="没有发票的">
          <div className="flex items-center">
            <NumberInput
              value={nonInvoicedExpenses}
              onChange={setNonInvoicedExpenses}
            />
            <Tooltip>
              <TooltipTrigger asChild>
                <AlertTriangle 
                  className="h-4 w-4 text-tax-red ml-2 cursor-pointer"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs max-w-xs">无发票支出需要谨慎处理。建议保留内部凭证、合同、付款单据等证明支出的真实性和必要性。无发票支出可能增加税务风险。</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </GridRow>
        
        <GridRow label="已申报个税的薪资">
          <NumberInput
            value={personalTax}
            onChange={setPersonalTax}
          />
        </GridRow>
        
        <GridRow label="社保">
          <NumberInput
            value={socialSecurity}
            onChange={setSocialSecurity}
          />
        </GridRow>
        
        <GridRow label="资产的折旧/摊销">
          <NumberInput
            value={depreciation}
            onChange={setDepreciation}
          />
        </GridRow>
        
        <GridRow label="其他">
          <NumberInput
            value={otherExpenses}
            onChange={setOtherExpenses}
            className="bg-gray-100 font-bold"
            disabled={true}
          />
        </GridRow>
      </div>
    </div>
  );
};

export default ExpensesSection;
