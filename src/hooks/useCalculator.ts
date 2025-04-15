import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export const useCalculator = () => {
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

  return {
    // Basic Info
    companyName,
    setCompanyName,
    isExcludedIndustry,
    setIsExcludedIndustry,
    isHighTechEnterprise,
    setIsHighTechEnterprise,
    totalAssets,
    setTotalAssets,
    employeeCount,
    setEmployeeCount,

    // Revenue & Expenses
    totalRevenue,
    setTotalRevenue,
    invoicedRevenue,
    setInvoicedRevenue,
    nonInvoicedRevenue,
    setNonInvoicedRevenue,
    newInvoicedRevenue,
    setNewInvoicedRevenue,
    totalExpenses,
    setTotalExpenses,
    invoicedExpenses,
    setInvoicedExpenses,
    nonInvoicedExpenses,
    setNonInvoicedExpenses,
    personalTax,
    setPersonalTax,
    socialSecurity,
    setSocialSecurity,
    depreciation,
    setDepreciation,
    otherExpenses,
    setOtherExpenses,

    // Tax Adjustments
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

    // Tax Summary
    taxableIncome,
    taxRate,
    setTaxRate,
    theoreticalTax,
    actualTax,
    setActualTax,
    riskValue,
    riskPercentage,

    // Handlers
    handleCalculate,
    handleReset,
    handleExport,
  };
};
