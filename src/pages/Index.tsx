import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calculator, FileSpreadsheet, FilePieChart, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

import BasicInfo from '@/components/TaxCalculator/BasicInfo';
import RevenueExpenses from '@/components/TaxCalculator/RevenueExpenses';
import TaxAdjustments from '@/components/TaxCalculator/TaxAdjustments';
import TaxSummary from '@/components/TaxCalculator/TaxSummary';

const Index = () => {
  const { toast } = useToast();
  
  // Basic Info State
  const [companyName, setCompanyName] = useState('');
  const [isExcludedIndustry, setIsExcludedIndustry] = useState(false);
  const [isHighTechEnterprise, setIsHighTechEnterprise] = useState(false);
  const [totalAssets, setTotalAssets] = useState('');
  const [employeeCount, setEmployeeCount] = useState('');

  // Revenue & Expenses State
  const [totalRevenue, setTotalRevenue] = useState('3000');
  const [invoicedRevenue, setInvoicedRevenue] = useState('');
  const [nonInvoicedRevenue, setNonInvoicedRevenue] = useState('');
  const [newInvoicedRevenue, setNewInvoicedRevenue] = useState('');
  
  const [totalExpenses, setTotalExpenses] = useState('1000');
  const [invoicedExpenses, setInvoicedExpenses] = useState('');
  const [nonInvoicedExpenses, setNonInvoicedExpenses] = useState('');
  const [personalTax, setPersonalTax] = useState('200');
  const [socialSecurity, setSocialSecurity] = useState('');
  const [depreciation, setDepreciation] = useState('');
  const [otherExpenses, setOtherExpenses] = useState('800');

  // Tax Adjustments State
  const [rdExpenses, setRdExpenses] = useState({
    actual: '2000',
    deductible: '2,000.00',
    adjustment: '0.00',
  });
  
  const [entertainmentExpenses, setEntertainmentExpenses] = useState({
    actual: '30',
    deductible: '15.00',
    adjustment: '-15.00',
  });
  
  const [advertisingExpenses, setAdvertisingExpenses] = useState({
    actual: '340',
    deductible: '340.00',
    adjustment: '0.00',
  });
  
  const [educationExpenses, setEducationExpenses] = useState({
    actual: '6',
    deductible: '6.00',
    adjustment: '0.00',
  });
  
  const [welfareExpenses, setWelfareExpenses] = useState({
    actual: '20',
    deductible: '20.00',
    adjustment: '0.00',
  });
  
  const [insuranceExpenses, setInsuranceExpenses] = useState({
    actual: '7',
    deductible: '0.00',
    adjustment: '-7.00',
  });
  
  const [totalAdjustment, setTotalAdjustment] = useState('-22.00');

  // Tax Summary State
  const [taxableIncome, setTaxableIncome] = useState('2,022.00');
  const [taxRate, setTaxRate] = useState('25');
  const [theoreticalTax, setTheoreticalTax] = useState('505.50');
  const [actualTax, setActualTax] = useState('300.00');
  const [riskValue, setRiskValue] = useState('205.50');
  const [riskPercentage, setRiskPercentage] = useState(40);

  // Calculate tax data
  useEffect(() => {
    try {
      // Calculate total adjustments
      const adjustmentTotal = 
        parseFloat(entertainmentExpenses.adjustment || '0') + 
        parseFloat(insuranceExpenses.adjustment || '0');
      
      setTotalAdjustment(adjustmentTotal.toFixed(2));
      
      // Calculate taxable income
      const revenue = parseFloat(totalRevenue) || 0;
      const expenses = parseFloat(totalExpenses) || 0;
      const adjustments = adjustmentTotal;
      
      const calculatedTaxableIncome = revenue - expenses + adjustments;
      setTaxableIncome(calculatedTaxableIncome.toFixed(2));
      
      // Calculate theoretical tax
      const rate = parseFloat(taxRate) / 100;
      const calculatedTheoreticalTax = calculatedTaxableIncome * rate;
      setTheoreticalTax(calculatedTheoreticalTax.toFixed(2));
      
      // Calculate risk value
      const actual = parseFloat(actualTax) || 0;
      const theoretical = calculatedTheoreticalTax;
      const calculatedRiskValue = Math.abs(theoretical - actual);
      setRiskValue(calculatedRiskValue.toFixed(2));
      
      // Calculate risk percentage (as a percentage of theoretical tax)
      const calculatedRiskPercentage = Math.min(100, (calculatedRiskValue / theoretical) * 100);
      setRiskPercentage(calculatedRiskPercentage);
      
    } catch (error) {
      console.error('Calculation error:', error);
    }
  }, [
    totalRevenue, 
    totalExpenses, 
    entertainmentExpenses.adjustment, 
    insuranceExpenses.adjustment, 
    taxRate, 
    actualTax
  ]);

  const handleCalculate = () => {
    toast({
      title: "计算已完成",
      description: `企业所得税风险值：${riskValue} 万元 (${getRiskLevel(riskPercentage)})`,
      variant: "default",
    });
  };

  const handleReset = () => {
    // Reset only user input fields, not the pre-filled demo values
    setCompanyName('');
    setIsExcludedIndustry(false);
    setIsHighTechEnterprise(false);
    setTotalAssets('');
    setEmployeeCount('');
    
    // Keep demo revenue and expenses
    setInvoicedRevenue('');
    setNonInvoicedRevenue('');
    setNewInvoicedRevenue('');
    
    setInvoicedExpenses('');
    setNonInvoicedExpenses('');
    setSocialSecurity('');
    setDepreciation('');
    
    toast({
      title: "表单已重置",
      description: "您已成功重置输入数据",
      variant: "default",
    });
  };

  const handleExport = () => {
    toast({
      title: "导出功能",
      description: "导出功能即将推出",
      variant: "default",
    });
  };

  const getRiskLevel = (percentage: number) => {
    if (percentage < 30) return '低风险';
    if (percentage < 70) return '中等风险';
    return '高风险';
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <header className="bg-tax-blue text-white py-6 mb-8">
        <div className="container">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Calculator className="h-8 w-8" />
            企业所得税风险评测计算器
          </h1>
          <p className="mt-2 text-blue-100">
            评估企业所得税风险，优化税务决策
          </p>
        </div>
      </header>

      <div className="container">
        <div className="grid gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-tax-blue flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                使用说明
              </CardTitle>
              <CardDescription>
                本计算器用于评估企业所得税的潜在风险，数据仅供参考，请根据实际情况谨慎使用
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-600">
                <p>1. 填写基本信息和财务数据</p>
                <p>2. 系统将自动计算税务调整及风险值</p>
                <p>3. 风险指数越高，表示与理论应纳税额差异越大，需要更多关注</p>
              </div>
            </CardContent>
          </Card>

          <BasicInfo 
            companyName={companyName}
            setCompanyName={setCompanyName}
            isExcludedIndustry={isExcludedIndustry}
            setIsExcludedIndustry={setIsExcludedIndustry}
            isHighTechEnterprise={isHighTechEnterprise}
            setIsHighTechEnterprise={setIsHighTechEnterprise}
            totalAssets={totalAssets}
            setTotalAssets={setTotalAssets}
            employeeCount={employeeCount}
            setEmployeeCount={setEmployeeCount}
          />

          <RevenueExpenses 
            totalRevenue={totalRevenue}
            setTotalRevenue={setTotalRevenue}
            invoicedRevenue={invoicedRevenue}
            setInvoicedRevenue={setInvoicedRevenue}
            nonInvoicedRevenue={nonInvoicedRevenue}
            setNonInvoicedRevenue={setNonInvoicedRevenue}
            newInvoicedRevenue={newInvoicedRevenue}
            setNewInvoicedRevenue={setNewInvoicedRevenue}
            totalExpenses={totalExpenses}
            setTotalExpenses={setTotalExpenses}
            invoicedExpenses={invoicedExpenses}
            setInvoicedExpenses={setInvoicedExpenses}
            nonInvoicedExpenses={nonInvoicedExpenses}
            setNonInvoicedExpenses={setNonInvoicedExpenses}
            personalTax={personalTax}
            setPersonalTax={setPersonalTax}
            socialSecurity={socialSecurity}
            setSocialSecurity={setSocialSecurity}
            depreciation={depreciation}
            setDepreciation={setDepreciation}
            otherExpenses={otherExpenses}
            setOtherExpenses={setOtherExpenses}
          />

          <TaxAdjustments 
            rdExpenses={rdExpenses}
            setRdExpenses={setRdExpenses}
            entertainmentExpenses={entertainmentExpenses}
            setEntertainmentExpenses={setEntertainmentExpenses}
            advertisingExpenses={advertisingExpenses}
            setAdvertisingExpenses={setAdvertisingExpenses}
            educationExpenses={educationExpenses}
            setEducationExpenses={setEducationExpenses}
            welfareExpenses={welfareExpenses}
            setWelfareExpenses={setWelfareExpenses}
            insuranceExpenses={insuranceExpenses}
            setInsuranceExpenses={setInsuranceExpenses}
            totalAdjustment={totalAdjustment}
          />

          <TaxSummary 
            taxableIncome={taxableIncome}
            taxRate={taxRate}
            setTaxRate={setTaxRate}
            theoreticalTax={theoreticalTax}
            actualTax={actualTax}
            setActualTax={setActualTax}
            riskValue={riskValue}
            riskPercentage={riskPercentage}
          />

          <div className="flex justify-center gap-4 mt-6">
            <Button
              className="bg-tax-blue hover:bg-tax-light-blue text-white px-8"
              onClick={handleCalculate}
            >
              <Calculator className="mr-2 h-4 w-4" />
              计算风险值
            </Button>
            <Button
              variant="outline"
              onClick={handleReset}
            >
              重置
            </Button>
            <Button
              variant="secondary"
              onClick={handleExport}
            >
              <FileSpreadsheet className="mr-2 h-4 w-4" />
              导出数据
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
