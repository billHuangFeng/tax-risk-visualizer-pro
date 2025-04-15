
import React, { useEffect } from 'react';
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
  // Calculate uninvoiced sales amount
  useEffect(() => {
    const total = parseFloat(totalRevenue) || 0;
    const invoiced = parseFloat(invoicedRevenue) || 0;
    const nonInvoiced = parseFloat(nonInvoicedRevenue) || 0;
    
    const uninvoicedAmount = total - invoiced - nonInvoiced;
    setNewInvoicedRevenue(uninvoicedAmount.toString());
  }, [totalRevenue, invoicedRevenue, nonInvoicedRevenue, setNewInvoicedRevenue]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold border-l-4 border-tax-blue pl-3">销售收入（不含销项税）</h2>
        <div className="flex items-center">
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
            className="bg-gray-100"
            disabled={true}
          />
        </GridRow>
      </div>
    </div>
  );
};

export default RevenueSection;

