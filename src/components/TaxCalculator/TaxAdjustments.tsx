
import React from 'react';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from '@/components/ui/table';

interface TaxAdjustmentsProps {
  rdExpenses: {
    actual: string;
    deductible: string;
    adjustment: string;
  };
  setRdExpenses: (value: { actual: string; deductible: string; adjustment: string }) => void;
  entertainmentExpenses: {
    actual: string;
    deductible: string;
    adjustment: string;
  };
  setEntertainmentExpenses: (value: { actual: string; deductible: string; adjustment: string }) => void;
  advertisingExpenses: {
    actual: string;
    deductible: string;
    adjustment: string;
  };
  setAdvertisingExpenses: (value: { actual: string; deductible: string; adjustment: string }) => void;
  educationExpenses: {
    actual: string;
    deductible: string;
    adjustment: string;
  };
  setEducationExpenses: (value: { actual: string; deductible: string; adjustment: string }) => void;
  welfareExpenses: {
    actual: string;
    deductible: string;
    adjustment: string;
  };
  setWelfareExpenses: (value: { actual: string; deductible: string; adjustment: string }) => void;
  insuranceExpenses: {
    actual: string;
    deductible: string;
    adjustment: string;
  };
  setInsuranceExpenses: (value: { actual: string; deductible: string; adjustment: string }) => void;
  totalAdjustment: string;
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
}) => {
  const handleRdExpensesChange = (field: string, value: string) => {
    const newRdExpenses = { ...rdExpenses, [field]: value };
    
    // For demonstration, calculate automatic deductible as 200% of actual
    if (field === 'actual') {
      const actualValue = parseFloat(value) || 0;
      newRdExpenses.deductible = (actualValue * 2).toFixed(2);
      newRdExpenses.adjustment = '0.00';
    }
    
    setRdExpenses(newRdExpenses);
  };

  const handleEntertainmentExpensesChange = (field: string, value: string) => {
    const newEntertainmentExpenses = { ...entertainmentExpenses, [field]: value };
    
    if (field === 'actual') {
      const actualValue = parseFloat(value) || 0;
      // Assuming a limit of 15.00 for demonstration
      const limit = 15.00;
      newEntertainmentExpenses.deductible = limit.toFixed(2);
      
      if (actualValue > limit) {
        newEntertainmentExpenses.adjustment = `-${(actualValue - limit).toFixed(2)}`;
      } else {
        newEntertainmentExpenses.adjustment = '0.00';
      }
    }
    
    setEntertainmentExpenses(newEntertainmentExpenses);
  };

  const handleAdvertisingExpensesChange = (field: string, value: string) => {
    const newAdvertisingExpenses = { ...advertisingExpenses, [field]: value };
    
    if (field === 'actual') {
      const actualValue = parseFloat(value) || 0;
      newAdvertisingExpenses.deductible = actualValue.toFixed(2);
      newAdvertisingExpenses.adjustment = '0.00';
    }
    
    setAdvertisingExpenses(newAdvertisingExpenses);
  };

  const handleEducationExpensesChange = (field: string, value: string) => {
    const newEducationExpenses = { ...educationExpenses, [field]: value };
    
    if (field === 'actual') {
      const actualValue = parseFloat(value) || 0;
      newEducationExpenses.deductible = actualValue.toFixed(2);
      newEducationExpenses.adjustment = '0.00';
    }
    
    setEducationExpenses(newEducationExpenses);
  };

  const handleWelfareExpensesChange = (field: string, value: string) => {
    const newWelfareExpenses = { ...welfareExpenses, [field]: value };
    
    if (field === 'actual') {
      const actualValue = parseFloat(value) || 0;
      newWelfareExpenses.deductible = actualValue.toFixed(2);
      newWelfareExpenses.adjustment = '0.00';
    }
    
    setWelfareExpenses(newWelfareExpenses);
  };

  const handleInsuranceExpensesChange = (field: string, value: string) => {
    const newInsuranceExpenses = { ...insuranceExpenses, [field]: value };
    
    if (field === 'actual') {
      const actualValue = parseFloat(value) || 0;
      // Insurance expenses are not deductible for demonstration
      newInsuranceExpenses.deductible = '0.00';
      newInsuranceExpenses.adjustment = `-${actualValue.toFixed(2)}`;
    }
    
    setInsuranceExpenses(newInsuranceExpenses);
  };

  return (
    <div className="space-y-6 border rounded-lg p-6 bg-white">
      <h2 className="text-xl font-bold border-l-4 border-tax-blue pl-3">企业所得税前调增/调减</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-8 gap-4 items-center">
        <div className="md:col-span-2"></div>
        <div className="md:col-span-5"></div>
        <div className="md:col-span-1">
          <Input
            type="text"
            value={totalAdjustment}
            readOnly
            className="text-right font-bold"
          />
        </div>
        <span>万元</span>
      </div>
      
      <div className="pl-4 space-y-4">
        <div className="text-right font-medium">其中：</div>
        
        <div className="overflow-x-auto">
          <Table className="border">
            <TableHeader>
              <TableRow className="bg-muted">
                <TableHead className="font-medium">项目</TableHead>
                <TableHead className="text-right font-medium">实际发生</TableHead>
                <TableHead className="text-right font-medium">可抵除</TableHead>
                <TableHead className="text-right font-medium">调增/调减</TableHead>
                <TableHead className="font-medium">单位</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">可加计扣除的研发费用</TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={rdExpenses.actual}
                    onChange={(e) => handleRdExpensesChange('actual', e.target.value)}
                    className="text-right"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="text"
                    value={rdExpenses.deductible}
                    readOnly
                    className="text-right bg-muted"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="text"
                    value={rdExpenses.adjustment}
                    readOnly
                    className="text-right bg-muted"
                  />
                </TableCell>
                <TableCell>万元</TableCell>
              </TableRow>
              
              <TableRow>
                <TableCell className="font-medium">超标准的业务招待费</TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={entertainmentExpenses.actual}
                    onChange={(e) => handleEntertainmentExpensesChange('actual', e.target.value)}
                    className="text-right"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="text"
                    value={entertainmentExpenses.deductible}
                    readOnly
                    className="text-right bg-muted"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="text"
                    value={entertainmentExpenses.adjustment}
                    readOnly
                    className="text-right bg-muted text-tax-red"
                  />
                </TableCell>
                <TableCell>万元</TableCell>
              </TableRow>
              
              <TableRow>
                <TableCell className="font-medium">广告费和业务宣传费</TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={advertisingExpenses.actual}
                    onChange={(e) => handleAdvertisingExpensesChange('actual', e.target.value)}
                    className="text-right"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="text"
                    value={advertisingExpenses.deductible}
                    readOnly
                    className="text-right bg-muted"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="text"
                    value={advertisingExpenses.adjustment}
                    readOnly
                    className="text-right bg-muted"
                  />
                </TableCell>
                <TableCell>万元</TableCell>
              </TableRow>
              
              <TableRow>
                <TableCell className="font-medium">职工教育经费</TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={educationExpenses.actual}
                    onChange={(e) => handleEducationExpensesChange('actual', e.target.value)}
                    className="text-right"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="text"
                    value={educationExpenses.deductible}
                    readOnly
                    className="text-right bg-muted"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="text"
                    value={educationExpenses.adjustment}
                    readOnly
                    className="text-right bg-muted"
                  />
                </TableCell>
                <TableCell>万元</TableCell>
              </TableRow>
              
              <TableRow>
                <TableCell className="font-medium">职工福利费</TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={welfareExpenses.actual}
                    onChange={(e) => handleWelfareExpensesChange('actual', e.target.value)}
                    className="text-right"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="text"
                    value={welfareExpenses.deductible}
                    readOnly
                    className="text-right bg-muted"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="text"
                    value={welfareExpenses.adjustment}
                    readOnly
                    className="text-right bg-muted"
                  />
                </TableCell>
                <TableCell>万元</TableCell>
              </TableRow>
              
              <TableRow>
                <TableCell className="font-medium">补充养老保险和补充医疗保险支出</TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={insuranceExpenses.actual}
                    onChange={(e) => handleInsuranceExpensesChange('actual', e.target.value)}
                    className="text-right"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="text"
                    value={insuranceExpenses.deductible}
                    readOnly
                    className="text-right bg-muted"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="text"
                    value={insuranceExpenses.adjustment}
                    readOnly
                    className="text-right bg-muted text-tax-red"
                  />
                </TableCell>
                <TableCell>万元</TableCell>
              </TableRow>
              
              <TableRow className="bg-muted">
                <TableCell className="font-medium">小计</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>
                  <Input
                    type="text"
                    value={totalAdjustment}
                    readOnly
                    className="text-right bg-muted font-bold"
                  />
                </TableCell>
                <TableCell>万元</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default TaxAdjustments;
