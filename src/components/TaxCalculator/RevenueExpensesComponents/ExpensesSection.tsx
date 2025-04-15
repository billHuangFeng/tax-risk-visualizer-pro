
import React, { useEffect } from 'react';
import NumberInput from './NumberInput';
import GridRow from './GridRow';

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
  // Calculate other expenses automatically
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
            className="font-bold"  // Added font-bold here
          />
        </div>
      </div>
      
      <div className="pl-4 space-y-4">
        <GridRow prefix="其中：" label="有发票的">
          <NumberInput
            value={invoicedExpenses}
            onChange={setInvoicedExpenses}
          />
        </GridRow>
        
        <GridRow label="没有发票的">
          <NumberInput
            value={nonInvoicedExpenses}
            onChange={setNonInvoicedExpenses}
          />
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
            className="bg-gray-100 font-bold"  // Added font-bold here
            disabled={true}
          />
        </GridRow>
      </div>
    </div>
  );
};

export default ExpensesSection;

