import React from 'react';
import RiskIndicator from './TaxSummaryComponents/RiskIndicator';
import TaxInputRow from './TaxSummaryComponents/TaxInputRow';
import TaxRateSelector from './TaxSummaryComponents/TaxRateSelector';

interface TaxSummaryProps {
  taxableIncome: string;
  taxRate: string;
  setTaxRate: (value: string) => void;
  theoreticalTax: string;
  actualTax: string;
  setActualTax: (value: string) => void;
  riskValue: string;
  riskPercentage: number;
  onInfoClick?: (infoKey: string) => void;
  infoData?: Record<string, any>;
  totalAssets: string;
  employeeCount: string;
  isHighTechEnterprise: boolean;
}

const TaxSummary: React.FC<TaxSummaryProps> = ({
  taxableIncome,
  taxRate,
  setTaxRate,
  theoreticalTax,
  actualTax,
  setActualTax,
  riskValue,
  riskPercentage,
  onInfoClick,
  totalAssets,
  employeeCount,
  isHighTechEnterprise,
}) => {
  return (
    <div className="space-y-6 border rounded-lg p-6 bg-white">
      <h2 className="text-xl font-bold border-l-4 border-tax-blue pl-3">企业所得税</h2>
      
      <div className="space-y-4">
        <TaxInputRow
          label="应纳税所得额"
          value={taxableIncome}
          readOnly
          showInfo
          onInfoClick={() => onInfoClick?.('taxableIncome')}
        />
        
        <TaxRateSelector 
          taxRate={taxRate} 
          setTaxRate={setTaxRate}
          totalAssets={totalAssets}
          employeeCount={employeeCount}
          taxableIncome={taxableIncome}
          isHighTechEnterprise={isHighTechEnterprise}
        />
        
        <TaxInputRow
          label="理论应纳企业所得税"
          value={theoreticalTax}
          readOnly
          showInfo
          onInfoClick={() => onInfoClick?.('theoreticalTax')}
        />
        
        <TaxInputRow
          label="实际申报企业所得税"
          value={actualTax}
          onChange={setActualTax}
          type="number"
          showInfo
          onInfoClick={() => onInfoClick?.('actualTax')}
        />
        
        <TaxInputRow
          label="风险差值 = 理论应纳税额 - 实际申报税额"
          value={riskValue}
          readOnly
          showInfo
          onInfoClick={() => onInfoClick?.('riskValue')}
          className="whitespace-nowrap"
        />
        
        <RiskIndicator riskPercentage={riskPercentage} />
      </div>
    </div>
  );
};

export default TaxSummary;
