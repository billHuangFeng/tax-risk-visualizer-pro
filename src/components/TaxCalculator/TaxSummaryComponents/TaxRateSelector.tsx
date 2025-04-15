
import React, { useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

interface TaxRateSelectorProps {
  taxRate: string;
  setTaxRate: (value: string) => void;
  totalAssets: string;
  employeeCount: string;
  taxableIncome: string;
  isHighTechEnterprise: boolean;
}

const TaxRateSelector: React.FC<TaxRateSelectorProps> = ({ 
  taxRate, 
  setTaxRate, 
  totalAssets,
  employeeCount,
  taxableIncome,
  isHighTechEnterprise
}) => {
  useEffect(() => {
    const assets = parseFloat(totalAssets) || 0;
    const employees = parseInt(employeeCount) || 0;
    const income = parseFloat(taxableIncome) || 0;

    // Check conditions for tax rates
    if (assets <= 5000 && employees <= 300 && income <= 300) {
      setTaxRate("5");
    } else if (isHighTechEnterprise) {
      setTaxRate("15");
    } else {
      setTaxRate("25");
    }
  }, [totalAssets, employeeCount, taxableIncome, isHighTechEnterprise, setTaxRate]);

  const getRateExplanation = () => {
    if (taxRate === "5") return "适用小微企业政策";
    if (taxRate === "15") return "适用高新技术企业优惠税率";
    return "";
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
      <div className="md:col-span-1 font-medium">× 适用税率</div>
      <div className="md:col-span-1">
        <Select value={taxRate} onValueChange={setTaxRate}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="选择税率" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="25">25%</SelectItem>
            <SelectItem value="15">15%</SelectItem>
            <SelectItem value="5">5%</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="md:col-span-3"></div>
      <div className="md:col-span-1 flex items-center gap-2">
        <div className="w-[16rem]">
          <Input
            type="text"
            value={`${taxRate}%`}
            readOnly
            className="text-right font-bold w-full"
          />
        </div>
        <span className="ml-2 text-sm text-tax-blue whitespace-nowrap">
          {getRateExplanation()}
        </span>
      </div>
    </div>
  );
};

export default TaxRateSelector;
