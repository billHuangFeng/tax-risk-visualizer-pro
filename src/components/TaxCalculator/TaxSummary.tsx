
import React from 'react';
import RiskIndicator from './TaxSummaryComponents/RiskIndicator';
import TaxInputRow from './TaxSummaryComponents/TaxInputRow';
import TaxRateSelector from './TaxSummaryComponents/TaxRateSelector';
import DifferenceFactors from './TaxSummaryComponents/DifferenceFactors';
import CalculatorActions from './CalculatorActions';
import { AlertCircle } from 'lucide-react';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

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
  totalRevenue?: string;
  taxDifferenceFactors: any[];
  addTaxDifferenceFactor: () => void;
  updateTaxDifferenceFactor: (id: string, field: string, value: any) => void;
  removeTaxDifferenceFactor: (id: string) => void;
  unexplainedDifference: string;
  unexplainedDifferencePercentage?: number;
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
  totalRevenue = '0',
  taxDifferenceFactors,
  addTaxDifferenceFactor,
  updateTaxDifferenceFactor,
  removeTaxDifferenceFactor,
  unexplainedDifference,
  unexplainedDifferencePercentage = 0,
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
          label="企业所得税差异 = 理论应纳税额 - 实际申报税额"
          value={riskValue}
          readOnly
          showInfo
          onInfoClick={() => onInfoClick?.('riskValue')}
          className="whitespace-nowrap"
        />
        
        <DifferenceFactors
          taxDifferenceFactors={taxDifferenceFactors}
          addTaxDifferenceFactor={addTaxDifferenceFactor}
          updateTaxDifferenceFactor={updateTaxDifferenceFactor}
          removeTaxDifferenceFactor={removeTaxDifferenceFactor}
          onInfoClick={onInfoClick}
        />
        
        {/* Always show the unexplained difference section, even if the value is 0 */}
        <div className="pt-4 border-t">
          <div className="flex justify-between items-center">
            <div className="font-medium flex items-center">
              未解释差异
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button 
                      className="ml-2 text-tax-blue hover:text-tax-light-blue"
                      onClick={() => onInfoClick?.('unexplainedDifference')}
                    >
                      <AlertCircle size={16} />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>扣除已知差异后的未解释金额</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-red-600">
                {unexplainedDifference}
              </span>
              <span className="text-sm text-red-600">
                ({unexplainedDifferencePercentage.toFixed(2)}%)
              </span>
            </div>
          </div>
        </div>
        
        <RiskIndicator 
          riskPercentage={riskPercentage} 
          riskValue={riskValue}
        />
      </div>
    </div>
  );
};

export default TaxSummary;
