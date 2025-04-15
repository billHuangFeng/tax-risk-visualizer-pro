import React, { useEffect } from 'react';
import NumberInput from './NumberInput';
import GridRow from './GridRow';
import { AlertTriangle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface RevenueSectionProps {
  totalRevenue: string;
  setTotalRevenue: (value: string) => void;
  invoicedRevenue: string;
  setInvoicedRevenue: (value: string) => void;
  nonInvoicedRevenue: string;
  setNonInvoicedRevenue: (value: string) => void;
  newInvoicedRevenue: string;
  setNewInvoicedRevenue: (value: string) => void;
  onInfoClick?: (infoKey: string) => void;
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
  onInfoClick,
}) => {
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
            className="font-bold"
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
        
        <GridRow label="不需要开票的" className="group relative">
          <div className="flex items-center">
            <NumberInput
              value={nonInvoicedRevenue}
              onChange={setNonInvoicedRevenue}
            />
            <AlertTriangle 
              className="h-4 w-4 text-tax-red ml-2 cursor-pointer" 
              onClick={() => onInfoClick?.('nonInvoicedRevenue')}
            />
          </div>
        </GridRow>
        
        <GridRow label="暂时没开票的" className="group relative">
          <div className="flex items-center">
            <NumberInput
              value={newInvoicedRevenue}
              onChange={setNewInvoicedRevenue}
              className="bg-gray-100 font-bold"
              disabled={true}
            />
            <Tooltip>
              <TooltipTrigger asChild>
                <AlertTriangle 
                  className="h-4 w-4 text-tax-red ml-2 cursor-pointer" 
                  onClick={() => onInfoClick?.('nonInvoicedRevenue')}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">点击查看未开票收入详情</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </GridRow>
      </div>
    </div>
  );
};

export default RevenueSection;
