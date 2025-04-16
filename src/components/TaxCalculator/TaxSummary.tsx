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
          onInfoClick={(infoKey) => {
            if (infoKey === 'taxDifferenceFactors') {
              onInfoClick?.('taxDifferenceFactors', {
                title: '差异原因分析',
                description: '差异原因分析是对企业所得税理论税额与实际申报税额之间的差异进行详细解释和分类。',
                analysis: '通过差异原因分析，可以：\n1. 识别税额差异的具体来源\n2. 评估税收筹划的合理性\n3. 降低税务风险',
                risk: '详细准确地记录差异原因是降低税务审计风险的关键。不同的差异原因可能带来不同程度的税务风险。'
              });
            }
          }}
        />
        
        <div className="pt-4 border-t">
          <div className="flex justify-between items-center">
            <div className="font-medium flex items-center">
              未解释差异
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button 
                      className="ml-2 text-tax-blue hover:text-tax-light-blue"
                      onClick={() => onInfoClick?.('unexplainedDifference', {
                        title: '未解释差异',
                        description: '未解释差异是指企业所得税中，扣除已知差异因素后的剩余税额差异金额。',
                        analysis: '未解释差异反映了企业财务和税务申报中可能存在的未说明变动：\n1. 差异金额越大，潜在税务风险越高\n2. 百分比是衡量税务风险的关键指标\n3. 超过30%需要高度重视',
                        risk: '未解释差异可能意味着：\n1. 可能存在未披露的收入或成本\n2. 税务筹划存在潜在问题\n3. 需要进一步调查和解释财务变动'
                      })}
                    >
                      <AlertCircle size={16} />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-[350px]">
                    <div className="space-y-2">
                      <h4 className="font-bold">未解释差异概念</h4>
                      <p className="text-sm">
                        未解释差异是指企业所得税中，扣除已知差异因素后的剩余税额差异金额。
                      </p>
                      <h5 className="font-semibold mt-2">风险评估：</h5>
                      <ul className="list-disc list-inside text-sm">
                        <li>差异金额越大，潜在税务风险越高</li>
                        <li>未解释差异百分比是衡量税务风险的关键指标</li>
                        <li>超过30%的未解释差异需要高度重视</li>
                      </ul>
                      <p className="text-xs text-gray-500 mt-2">
                        建议：全面梳理财务数据，寻找未解释差异的来源，必要时咨询税务专业人士。
                      </p>
                    </div>
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
          riskPercentage={unexplainedDifferencePercentage} 
          riskValue={riskValue}
          unexplainedDifference={unexplainedDifference}
        />
      </div>
    </div>
  );
};

export default TaxSummary;
