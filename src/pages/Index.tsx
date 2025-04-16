
import React, { useState } from 'react';
import CalculatorHeader from '@/components/TaxCalculator/CalculatorHeader';
import CalculatorActions from '@/components/TaxCalculator/CalculatorActions';
import BasicInfo from '@/components/TaxCalculator/BasicInfo';
import RevenueExpenses from '@/components/TaxCalculator/RevenueExpenses';
import TaxAdjustments from '@/components/TaxCalculator/TaxAdjustments';
import TaxSummary from '@/components/TaxCalculator/TaxSummary';
import CalculatorLayout from '@/components/TaxCalculator/CalculatorLayout';
import TaxNavbar from '@/components/TaxNavbar';
import { useCalculator } from '@/hooks/useCalculator';
import taxInfoData from '@/constants/taxInfoData';
import type { TaxInfoPanelItem } from '@/types/calculator';

const Index = () => {
  const calculator = useCalculator();
  const [selectedInfoItem, setSelectedInfoItem] = useState<TaxInfoPanelItem | null>(null);

  const onInfoClick = (infoKey: string) => {
    setSelectedInfoItem(taxInfoData[infoKey]);
  };

  return (
    <>
      <CalculatorHeader />
      <TaxNavbar />
      <CalculatorLayout 
        selectedInfoItem={selectedInfoItem}
      >
        <BasicInfo 
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
          onInfoClick={onInfoClick}
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
          nonDeductibleExpenses={calculator.nonDeductibleExpenses}
          setNonDeductibleExpenses={calculator.setNonDeductibleExpenses}
          totalAdjustment={calculator.totalAdjustment}
          totalRevenue={calculator.totalRevenue}
          personalTax={calculator.personalTax}
          onInfoClick={onInfoClick}
          infoData={taxInfoData}
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
          infoData={taxInfoData}
          totalAssets={calculator.totalAssets}
          employeeCount={calculator.employeeCount}
          isHighTechEnterprise={calculator.isHighTechEnterprise}
          taxDifferenceFactors={calculator.taxDifferenceFactors}
          addTaxDifferenceFactor={calculator.addTaxDifferenceFactor}
          updateTaxDifferenceFactor={calculator.updateTaxDifferenceFactor}
          removeTaxDifferenceFactor={calculator.removeTaxDifferenceFactor}
          unexplainedDifference={calculator.unexplainedDifference}
          unexplainedDifferencePercentage={calculator.unexplainedDifferencePercentage}
        />

        <div className="w-full px-4 py-4 bg-white border-t border-gray-200 shadow-sm flex flex-col md:flex-row gap-2 justify-end">
          <CalculatorActions
            riskPercentage={calculator.riskPercentage}
            onReset={calculator.handleReset}
            onLoadTestData={calculator.loadTestData}
          />
        </div>
      </CalculatorLayout>
    </>
  );
};

export default Index;
