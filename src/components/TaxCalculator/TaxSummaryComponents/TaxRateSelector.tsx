
import React, { useEffect } from 'react';
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
    // Set initial default value to 25
    if (!taxRate) {
      setTaxRate("25");
    }

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
  }, [totalAssets, employeeCount, taxableIncome, isHighTechEnterprise, setTaxRate, taxRate]);

  const getRateExplanation = () => {
    if (taxRate === "5") return "适用小微企业政策";
    if (taxRate === "15") return "适用高新技术企业优惠税率";
    return "";
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
      <div className="md:col-span-1 font-medium flex items-center gap-2 whitespace-nowrap">
        <span className="min-w-[100px]">× 适用税率</span>
        <div className="relative w-20">
          <Input
            type="text"
            value={`${taxRate}%`}
            readOnly
            className="text-center font-bold"
          />
        </div>
        <span className="text-sm text-tax-blue whitespace-nowrap">
          {getRateExplanation()}
        </span>
      </div>
      <div className="md:col-span-5"></div>
    </div>
  );
};

export default TaxRateSelector;
