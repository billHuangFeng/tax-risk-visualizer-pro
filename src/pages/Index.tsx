import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { AlertCircle, Info } from 'lucide-react';
import CalculatorHeader from '@/components/TaxCalculator/CalculatorHeader';
import CalculatorActions from '@/components/TaxCalculator/CalculatorActions';
import BasicInfo from '@/components/TaxCalculator/BasicInfo';
import RevenueExpenses from '@/components/TaxCalculator/RevenueExpenses';
import TaxAdjustments from '@/components/TaxCalculator/TaxAdjustments';
import TaxSummary from '@/components/TaxCalculator/TaxSummary';
import TaxInfoPanel from '@/components/TaxCalculator/TaxInfoPanel';
import { useCalculator } from '@/hooks/useCalculator';

const infoData = {
  rdExpenses: {
    title: "研发费用",
    description: "企业为开发新技术、新产品、新工艺所发生的研究与开发费用",
    analysis: "研发费用可以享受加计扣除政策，对企业减轻税负有重要作用",
    risk: "研发费用加计扣除比例过高可能引起税务机关关注，建议保留详细的研发项目文档"
  },
  entertainmentExpenses: {
    title: "业务招待费",
    description: "企业发生的与经营活动相关的业务招待支出",
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
  },
  totalAssets: {
    title: "资产总额",
    description: "小微企业资产总额标准：资产总额不超过5000万元",
    analysis: "从事国家非限制和禁止行业，且同时符合年度应纳税所得额不超过300万元、从业人数不超过300人、资产总额不超过5000万元的企业，可以享受小微企业的5%企业所得税优惠政策。",
    risk: "资产总额是判断是否享受小微企业税收优惠的重要指标之一，建议准确核算并保留相关财务凭证。"
  },
  employeeCount: {
    title: "员工人数",
    description: "小微企业员工人数标准：从业人数不超过300人",
    analysis: "从事国家非限制和禁止行业，且同时符合年度应纳税所得额不超过300万元、从业人数不超过300人、资产总额不超过5000万元的企业，可以享受小微企业的5%企业所得税优惠政策。",
    risk: "员工人数是判断是否享受小微企业税收优惠的重要指标之一，建议准确统计并保留相关用工证明。"
  }
};

const Index = () => {
  const calculator = useCalculator();
  const [selectedInfoItem, setSelectedInfoItem] = useState<{
    title: string;
    description: string;
    analysis: string;
    risk: string;
  } | null>(null);

  const onInfoClick = (infoKey: string) => {
    setSelectedInfoItem(infoData[infoKey]);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <CalculatorHeader />

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
                companyName={calculator.companyName}
                setCompanyName={calculator.setCompanyName}
                isExcludedIndustry={calculator.isExcludedIndustry}
                setIsExcludedIndustry={calculator.setIsExcludedIndustry}
                isHighTechEnterprise={calculator.isHighTechEnterprise}
                setIsHighTechEnterprise={calculator.setIsHighTechEnterprise}
                totalAssets={calculator.totalAssets}
                setTotalAssets={calculator.setTotalAssets}
                employeeCount={calculator.employeeCount}
                setEmployeeCount={calculator.setEmployeeCount}
                onInfoClick={onInfoClick}
              />

              <RevenueExpenses 
                totalRevenue={calculator.totalRevenue}
                setTotalRevenue={calculator.setTotalRevenue}
                invoicedRevenue={calculator.invoicedRevenue}
                setInvoicedRevenue={calculator.setInvoicedRevenue}
                nonInvoicedRevenue={calculator.nonInvoicedRevenue}
                setNonInvoicedRevenue={calculator.setNonInvoicedRevenue}
                newInvoicedRevenue={calculator.newInvoicedRevenue}
                setNewInvoicedRevenue={calculator.setNewInvoicedRevenue}
                totalExpenses={calculator.totalExpenses}
                setTotalExpenses={calculator.setTotalExpenses}
                invoicedExpenses={calculator.invoicedExpenses}
                setInvoicedExpenses={calculator.setInvoicedExpenses}
                nonInvoicedExpenses={calculator.nonInvoicedExpenses}
                setNonInvoicedExpenses={calculator.setNonInvoicedExpenses}
                personalTax={calculator.personalTax}
                setPersonalTax={calculator.setPersonalTax}
                socialSecurity={calculator.socialSecurity}
                setSocialSecurity={calculator.setSocialSecurity}
                depreciation={calculator.depreciation}
                setDepreciation={calculator.setDepreciation}
                otherExpenses={calculator.otherExpenses}
                setOtherExpenses={calculator.setOtherExpenses}
              />

              <TaxAdjustments 
                rdExpenses={calculator.rdExpenses}
                setRdExpenses={calculator.setRdExpenses}
                entertainmentExpenses={calculator.entertainmentExpenses}
                setEntertainmentExpenses={calculator.setEntertainmentExpenses}
                advertisingExpenses={calculator.advertisingExpenses}
                setAdvertisingExpenses={calculator.setAdvertisingExpenses}
                educationExpenses={calculator.educationExpenses}
                setEducationExpenses={calculator.setEducationExpenses}
                welfareExpenses={calculator.welfareExpenses}
                setWelfareExpenses={calculator.setWelfareExpenses}
                insuranceExpenses={calculator.insuranceExpenses}
                setInsuranceExpenses={calculator.setInsuranceExpenses}
                totalAdjustment={calculator.totalAdjustment}
                totalRevenue={calculator.totalRevenue}
                personalTax={calculator.personalTax}
                onInfoClick={onInfoClick}
                infoData={infoData}
                isExcludedIndustry={calculator.isExcludedIndustry}
              />

              <TaxSummary 
                taxableIncome={calculator.taxableIncome}
                taxRate={calculator.taxRate}
                setTaxRate={calculator.setTaxRate}
                theoreticalTax={calculator.theoreticalTax}
                actualTax={calculator.actualTax}
                setActualTax={calculator.setActualTax}
                riskValue={calculator.riskValue}
                riskPercentage={calculator.riskPercentage}
                onInfoClick={onInfoClick}
                infoData={infoData}
                totalAssets={calculator.totalAssets}
                employeeCount={calculator.employeeCount}
                isHighTechEnterprise={calculator.isHighTechEnterprise}
              />

              <CalculatorActions
                onCalculate={calculator.handleCalculate}
                onReset={calculator.handleReset}
                onExport={calculator.handleExport}
              />
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
