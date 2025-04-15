import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

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
  infoData,
}) => {
  const getRiskColor = (percentage: number) => {
    if (percentage < 30) return 'bg-green-500';
    if (percentage < 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getRiskLevel = (percentage: number) => {
    if (percentage < 30) return '低风险';
    if (percentage < 70) return '中等风险';
    return '高风险';
  };

  const handleInfoClick = (key: string) => {
    if (onInfoClick) {
      onInfoClick(key);
    }
  };

  return (
    <div className="space-y-6 border rounded-lg p-6 bg-white">
      <h2 className="text-xl font-bold border-l-4 border-tax-blue pl-3">企业所得税</h2>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
          <div className="md:col-span-2 font-medium">应纳税所得额</div>
          <div className="md:col-span-3"></div>
          <div className="md:col-span-1 flex items-center">
            <div className="w-input-text relative">
              <Input
                type="text"
                value={taxableIncome}
                readOnly
                className="text-right font-bold pr-8 w-full"
              />
              <button 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-tax-blue hover:text-tax-light-blue"
                onClick={() => handleInfoClick('taxableIncome')}
                title="查看应纳税所得额说明"
              >
                <Info size={16} />
              </button>
            </div>
            <span className="ml-2 text-sm whitespace-nowrap">万元</span>
          </div>
        </div>
        
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
          <div className="md:col-span-1 flex items-center">
            <div className="w-36">
              <Input
                type="text"
                value={`${taxRate}%`}
                readOnly
                className="text-right font-bold w-full"
              />
            </div>
            <span className="ml-2 whitespace-nowrap"></span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
          <div className="md:col-span-2 font-medium">理论应纳企业所得税</div>
          <div className="md:col-span-3"></div>
          <div className="md:col-span-1 flex items-center">
            <div className="w-input-text relative">
              <Input
                type="text"
                value={theoreticalTax}
                readOnly
                className="text-right font-bold pr-8 w-full"
              />
              <button 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-tax-blue hover:text-tax-light-blue"
                onClick={() => handleInfoClick('theoreticalTax')}
                title="查看理论应纳企业所得税说明"
              >
                <Info size={16} />
              </button>
            </div>
            <span className="ml-2 text-sm whitespace-nowrap">万元</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
          <div className="md:col-span-2 font-medium">实际申报企业所得税</div>
          <div className="md:col-span-3"></div>
          <div className="md:col-span-1 flex items-center">
            <div className="w-input-text relative">
              <Input
                type="number"
                value={actualTax}
                onChange={(e) => setActualTax(e.target.value)}
                className="text-right font-bold pr-8 w-full"
              />
              <button 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-tax-blue hover:text-tax-light-blue"
                onClick={() => handleInfoClick('actualTax')}
                title="查看实际申报企业所得税说明"
              >
                <Info size={16} />
              </button>
            </div>
            <span className="ml-2 text-sm whitespace-nowrap">万元</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
          <div className="md:col-span-2 font-medium whitespace-nowrap">风险差值 = 理论应纳税额 - 实际申报税额</div>
          <div className="md:col-span-3"></div>
          <div className="md:col-span-1 flex items-center">
            <div className="w-input-text relative">
              <Input
                type="text"
                value={riskValue}
                readOnly
                className="text-right font-bold text-tax-red pr-8 w-full"
              />
              <button 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-tax-blue hover:text-tax-light-blue"
                onClick={() => handleInfoClick('riskValue')}
                title="查看风险差值说明"
              >
                <Info size={16} />
              </button>
            </div>
            <span className="ml-2 text-sm whitespace-nowrap">万元</span>
          </div>
        </div>
        
        <div className="pt-4 border-t">
          <div className="mb-2 flex justify-between">
            <span className="font-bold">税务风险评估</span>
            <span className="font-bold">{getRiskLevel(riskPercentage)}</span>
          </div>
          <Progress value={riskPercentage} className="h-4" style={{ backgroundColor: '#e5e7eb' }}>
            <div 
              className={`h-full ${getRiskColor(riskPercentage)}`} 
              style={{ width: `${riskPercentage}%` }}
            />
          </Progress>
          <div className="mt-2 flex justify-between text-sm">
            <span>低风险</span>
            <span>中等风险</span>
            <span>高风险</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxSummary;
