
import React, { useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
    // Parse input values with proper Number conversion
    const assets = parseFloat(totalAssets.replace(/,/g, '')) || 0;
    const employees = parseInt(employeeCount) || 0;
    const income = parseFloat(taxableIncome.replace(/,/g, '')) || 0;

    console.log("Tax rate calculation values:", { 
      assets, 
      employees, 
      income, 
      isHighTech: isHighTechEnterprise 
    });

    // First check if company qualifies for small business rate (5%)
    const qualifiesForSmallBusiness = 
      assets <= 5000 && 
      employees <= 300 && 
      income < 300;

    // If company qualifies for small business rate, always use 5% regardless of high-tech status
    if (qualifiesForSmallBusiness) {
      console.log("Setting small business tax rate (5%) - qualifies for small business benefits");
      setTaxRate("5");
    }
    // If doesn't qualify for small business but is high-tech, use 15%
    else if (isHighTechEnterprise) {
      console.log("Setting high-tech enterprise tax rate (15%) - doesn't qualify for small business");
      setTaxRate("15");
    }
    // Default tax rate (25%)
    else {
      console.log("Setting default tax rate (25%) - no special qualifications");
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
      <div className="md:col-span-2">
        <span className="text-sm text-tax-blue whitespace-nowrap">
          {getRateExplanation()}
        </span>
      </div>
    </div>
  );
};

export default TaxRateSelector;
