
import React from 'react';
import NumberInput from './NumberInput';
import GridRow from './GridRow';

interface RevenueSectionProps {
  totalRevenue: string;
  setTotalRevenue: (value: string) => void;
  invoicedRevenue: string;
  setInvoicedRevenue: (value: string) => void;
  nonInvoicedRevenue: string;
  setNonInvoicedRevenue: (value: string) => void;
  newInvoicedRevenue: string;
  setNewInvoicedRevenue: (value: string) => void;
}

const RevenueSection: React.FC<RevenueSectionProps> = ({
  totalRevenue,
  setTotalRevenue,
  invoicedRevenue,
  setInvoicedRevenue,
  nonInvoicedRevenue,
  setNonInvoicedRevenue,
  newInvoicedRevenue,
  setNewInvoicedRevenue,
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold border-l-4 border-tax-blue pl-3">销售收入（不含销项税）</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
        <div className="md:col-span-2"></div>
        <div className="md:col-span-3"></div>
        <div className="md:col-span-1">
          <NumberInput
            value={totalRevenue}
            onChange={setTotalRevenue}
          />
        </div>
      </div>
      
      <div className="pl-4 space-y-4">
        <GridRow prefix="其中：" label="已开票">
          <NumberInput
            value={invoicedRevenue}
            onChange={setInvoicedRevenue}
          />
        </GridRow>
        
        <GridRow label="不需要的开票">
          <NumberInput
            value={nonInvoicedRevenue}
            onChange={setNonInvoicedRevenue}
          />
        </GridRow>
        
        <GridRow label="暂未开票的销售额">
          <NumberInput
            value={newInvoicedRevenue}
            onChange={setNewInvoicedRevenue}
          />
        </GridRow>
      </div>
    </div>
  );
};

export default RevenueSection;
