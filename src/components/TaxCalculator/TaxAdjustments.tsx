import React, { useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableHeader, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import ExpenseRow from './TaxAdjustments/ExpenseRow';
import { 
  handleRdExpenses, 
  handleEntertainmentExpenses, 
  handleAdvertisingExpenses,
  handleEducationExpenses,
  handleWelfareExpenses,
  handleInsuranceExpenses 
} from './TaxAdjustments/ExpenseHandlers';

interface TaxAdjustmentsProps {
  rdExpenses: { actual: string; deductible: string; adjustment: string; };
  setRdExpenses: (value: { actual: string; deductible: string; adjustment: string; }) => void;
  entertainmentExpenses: { actual: string; deductible: string; adjustment: string; };
  setEntertainmentExpenses: (value: { actual: string; deductible: string; adjustment: string; }) => void;
  advertisingExpenses: { actual: string; deductible: string; adjustment: string; };
  setAdvertisingExpenses: (value: { actual: string; deductible: string; adjustment: string; }) => void;
  educationExpenses: { actual: string; deductible: string; adjustment: string; };
  setEducationExpenses: (value: { actual: string; deductible: string; adjustment: string; }) => void;
  welfareExpenses: { actual: string; deductible: string; adjustment: string; };
  setWelfareExpenses: (value: { actual: string; deductible: string; adjustment: string; }) => void;
  insuranceExpenses: { actual: string; deductible: string; adjustment: string; };
  setInsuranceExpenses: (value: { actual: string; deductible: string; adjustment: string; }) => void;
  totalAdjustment: string;
  totalRevenue: string;
  personalTax: string;
  onInfoClick?: (infoKey: string) => void;
  infoData?: Record<string, any>;
  isExcludedIndustry: boolean;
}

const TaxAdjustments: React.FC<TaxAdjustmentsProps> = ({
  rdExpenses,
  setRdExpenses,
  entertainmentExpenses,
  setEntertainmentExpenses,
  advertisingExpenses,
  setAdvertisingExpenses,
  educationExpenses,
  setEducationExpenses,
  welfareExpenses,
  setWelfareExpenses,
  insuranceExpenses,
  setInsuranceExpenses,
  totalAdjustment,
  totalRevenue,
  personalTax,
  onInfoClick,
  infoData,
  isExcludedIndustry,
}) => {
  useEffect(() => {
    if (rdExpenses.actual) {
      setRdExpenses(handleRdExpenses(rdExpenses.actual, { ...rdExpenses }, isExcludedIndustry));
    }
  }, [isExcludedIndustry, setRdExpenses, rdExpenses.actual]);
  
  const handleChangeWithParams = (
    handler: (value: string, currentValues: any, isExcluded: boolean, params: {revenue: string, personalTax: string}) => any, 
    setter: typeof setRdExpenses
  ) => 
    (field: string, value: string) => {
      if (field === 'actual') {
        setter(handler(value, { actual: value, deductible: '', adjustment: '' }, isExcludedIndustry, { revenue: totalRevenue, personalTax }));
      }
    };

  const handleRdChange = (field: string, value: string) => {
    if (field === 'actual') {
      setRdExpenses(handleRdExpenses(value, { actual: value, deductible: '', adjustment: '' }, isExcludedIndustry));
    }
  };

  return (
    <div className="space-y-6 border rounded-lg p-6 bg-white">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold border-l-4 border-tax-blue pl-3">企业所得税前调增/调减</h2>
        <div className="flex items-center space-x-2">
          <Input
            type="text"
            value={totalAdjustment}
            readOnly
            className="text-right font-bold w-24"
          />
          <span>万元</span>
          {infoData && onInfoClick && (
            <Tooltip>
              <TooltipTrigger asChild>
                <button 
                  onClick={() => onInfoClick('riskValue')} 
                  className="text-tax-blue hover:text-tax-light-blue focus:outline-none"
                  aria-label="调整总额说明"
                >
                  <Info className="h-4 w-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <span className="text-xs">点击查看详情</span>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="text-left font-medium ml-0">其中：</div>
        
        <div className="overflow-x-auto">
          <Table className="border">
            <TableHeader>
              <TableRow className="bg-muted">
                <TableHead className="font-medium w-[40%]">项目</TableHead>
                <TableHead className="text-right font-medium w-[15%]">实际发生</TableHead>
                <TableHead className="text-right font-medium w-[15%]">可抵除</TableHead>
                <TableHead className="text-right font-medium w-[15%]">调增/调减</TableHead>
                <TableHead className="font-medium w-[15%] whitespace-nowrap">单位</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <ExpenseRow
                title="可加计扣除的研发费用"
                infoKey="rdExpenses"
                values={rdExpenses}
                onChange={handleRdChange}
                onInfoClick={onInfoClick}
              />
              <ExpenseRow
                title="超标准的业务招待费"
                infoKey="entertainmentExpenses"
                values={entertainmentExpenses}
                onChange={handleChangeWithParams(handleEntertainmentExpenses, setEntertainmentExpenses)}
                onInfoClick={onInfoClick}
                isNegativeAdjustment
              />
              <ExpenseRow
                title="广告费和业务宣传费"
                infoKey="advertisingExpenses"
                values={advertisingExpenses}
                onChange={handleChangeWithParams(handleAdvertisingExpenses, setAdvertisingExpenses)}
                onInfoClick={onInfoClick}
              />
              <ExpenseRow
                title="职工教育经费"
                infoKey="educationExpenses"
                values={educationExpenses}
                onChange={handleChangeWithParams(handleEducationExpenses, setEducationExpenses)}
                onInfoClick={onInfoClick}
              />
              <ExpenseRow
                title="职工福利费"
                infoKey="welfareExpenses"
                values={welfareExpenses}
                onChange={handleChangeWithParams(handleWelfareExpenses, setWelfareExpenses)}
                onInfoClick={onInfoClick}
              />
              <ExpenseRow
                title="补充养老保险和补充医疗保险支出"
                infoKey="insuranceExpenses"
                values={insuranceExpenses}
                onChange={handleChangeWithParams(handleInsuranceExpenses, setInsuranceExpenses)}
                onInfoClick={onInfoClick}
                isNegativeAdjustment
              />
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default TaxAdjustments;
