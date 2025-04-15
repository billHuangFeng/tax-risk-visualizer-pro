import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calculator, FileSpreadsheet, FilePieChart, AlertCircle, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

import BasicInfo from '@/components/TaxCalculator/BasicInfo';
import RevenueExpenses from '@/components/TaxCalculator/RevenueExpenses';
import TaxAdjustments from '@/components/TaxCalculator/TaxAdjustments';
import TaxSummary from '@/components/TaxCalculator/TaxSummary';
import TaxInfoPanel from '@/components/TaxCalculator/TaxInfoPanel';

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

  // Selected information item for the info panel
  const [selectedInfoItem, setSelectedInfoItem] = useState<{
    title: string;
    description: string;
    analysis: string;
    risk: string;
  } | null>(null);

  // Information data for tooltips and sidebar
  const infoData = {
    rdExpenses: {
      title: "研发费用",
      description: "企业为开发新技术、新产品、新工艺所发生的研究与开发费用",
      analysis: "研发费用可以享受加计扣除政策，对企业减轻税负有重要作用",
      risk: "研发费用加计扣除比例过高可能引起税务机关关注，建议保留详细的研发项目文档"
    },
    entertainmentExpenses: {
      title: "业务招待费",
      description: "企业发生���与经营活动相关的业务招待支出",
      analysis: "业务招待费超出税法规定限额的部分不得在税前扣除，需要调增应纳税所得额",
      risk: "业务招待费超标是税务稽查的常见关注点，建议严格控制在收入的0.5%以内"
    },
    taxableIncome: {
      title: "应纳税所得额",
      description: "企业所得税的计税依据，计算公式为收入总额减去不征税收入、免税收入、各项扣除以及弥补以前年度亏损后的余额",
      analysis: "应纳税所得额的计算是企业所得税申报的核心，直接关系到企业税负",
      risk: "与行业平均水平差异过大可能引起税务机关关注，建议定期对标行业水平"
    },
    theoreticalTax: {
      title: "理论应纳企业所得税",
      description: "根据应纳税所得额和适用税率计算出的理论上应缴纳的企业所得税金额",
      analysis: "反映了企业在正常情况下的税负水平，是评估纳税风险的基准值",
      risk: "实际申报税额与理论应纳税额差异过大，会增加税务风险"
    },
    actualTax: {
      title: "实际申报企业所得税",
      description: "企业实际在企业所得税纳税申报表中填报并缴纳的所得税金额",
      analysis: "实际申报税额过低可能是享受了税收优惠政策，或存在税务风险",
      risk: "如果无法说明实际申报税额低于理论税额的合理原因，可能面临税务稽查风险"
    },
    riskValue: {
      title: "风险差值",
      description: "理论应纳税额与实际申报税额的绝对差值",
      analysis: "差值越大，表示企业税务申报与理论计算的差距越大",
      risk: "差值超过理论税额30%的企业，建议进行税务自查，并确保所有税收优惠政策都有充分的政策依据和完备的资料"
    }
  };

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

  const onInfoClick = (infoKey) => {
    setSelectedInfoItem(infoData[infoKey]);
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
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-2/3">
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
                    <p>4. 点击数据后方的<Info className="h-3 w-3 inline-block text-tax-blue mx-1" />图标查看详细分析</p>
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
                onInfoClick={onInfoClick}
                infoData={infoData}
                isExcludedIndustry={isExcludedIndustry}
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
                onInfoClick={(infoKey) => setSelectedInfoItem(infoData[infoKey])}
                infoData={infoData}
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
          
          <div className="w-full md:w-1/3 mt-8 md:mt-0">
            <TaxInfoPanel selectedItem={selectedInfoItem} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
