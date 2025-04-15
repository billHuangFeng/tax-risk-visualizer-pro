
import React from 'react';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableHeader, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import ExpenseRow from './TaxAdjustments/ExpenseRow';
import { 
  handleRdExpenses, 
  handleEntertainmentExpenses, 
  handleGeneralExpenses, 
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
  onInfoClick?: (infoKey: string) => void;
  infoData?: Record<string, any>;
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
  onInfoClick,
  infoData,
}) => {
  const handleChange = (handler: typeof handleRdExpenses, setter: typeof setRdExpenses) => 
    (field: string, value: string) => {
      if (field === 'actual') {
        setter(handler(value, { actual: value, deductible: '', adjustment: '' }));
      }
    };

  return (
    <div className="space-y-6 border rounded-lg p-6 bg-white">
      <h2 className="text-xl font-bold border-l-4 border-tax-blue pl-3">企业所得税前调增/调减</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-8 gap-4 items-center">
        <div className="md:col-span-2"></div>
        <div className="md:col-span-5"></div>
        <div className="md:col-span-1">
          <div className="flex items-center">
            <Input
              type="text"
              value={totalAdjustment}
              readOnly
              className="text-right font-bold w-full"
            />
            {infoData && onInfoClick && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <button 
                    onClick={() => onInfoClick('riskValue')} 
                    className="ml-1 text-tax-blue hover:text-tax-light-blue focus:outline-none"
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
        <span>万元</span>
      </div>
      
      <div className="pl-4 space-y-4">
        <div className="text-right font-medium">其中：</div>
        
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
                onChange={handleChange(handleRdExpenses, setRdExpenses)}
                onInfoClick={onInfoClick}
              />
              <ExpenseRow
                title="超标准的业务招待费"
                infoKey="entertainmentExpenses"
                values={entertainmentExpenses}
                onChange={handleChange(handleEntertainmentExpenses, setEntertainmentExpenses)}
                onInfoClick={onInfoClick}
                isNegativeAdjustment
              />
              <ExpenseRow
                title="广告费和业务宣传费"
                infoKey="advertisingExpenses"
                values={advertisingExpenses}
                onChange={handleChange(handleGeneralExpenses, setAdvertisingExpenses)}
                onInfoClick={onInfoClick}
              />
              <ExpenseRow
                title="职工教育经费"
                infoKey="educationExpenses"
                values={educationExpenses}
                onChange={handleChange(handleGeneralExpenses, setEducationExpenses)}
                onInfoClick={onInfoClick}
              />
              <ExpenseRow
                title="职工福利费"
                infoKey="welfareExpenses"
                values={welfareExpenses}
                onChange={handleChange(handleGeneralExpenses, setWelfareExpenses)}
                onInfoClick={onInfoClick}
              />
              <ExpenseRow
                title="补充养老保险和补充医疗保险支出"
                infoKey="insuranceExpenses"
                values={insuranceExpenses}
                onChange={handleChange(handleInsuranceExpenses, setInsuranceExpenses)}
                onInfoClick={onInfoClick}
                isNegativeAdjustment
              />
              
              <TableRow className="bg-muted">
                <TableCell className="font-medium">小计</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>
                  <Input
                    type="text"
                    value={totalAdjustment}
                    readOnly
                    className="text-right bg-muted font-bold w-full"
                  />
                </TableCell>
                <TableCell className="text-sm">万元</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default TaxAdjustments;
