
import React from 'react';
import { useTaxCalculator } from '@/hooks/useTaxCalculator';
import { taxInfoData } from '@/data/taxInfoData';

import TaxCalculatorHeader from './Header/TaxCalculatorHeader';
import TaxCalculatorInstructions from './Instructions/TaxCalculatorInstructions';
import TaxCalculatorActions from './Actions/TaxCalculatorActions';
import BasicInfo from './BasicInfo';
import RevenueExpenses from './RevenueExpenses';
import TaxAdjustments from './TaxAdjustments';
import TaxSummary from './TaxSummary';
import TaxInfoPanel from './TaxInfoPanel';

const TaxCalculatorContainer = () => {
  const {
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

    // Info Panel
    selectedInfoItem,
    setSelectedInfoItem,

    // Actions
    handleCalculate,
    handleReset,
    handleExport
  } = useTaxCalculator();

  const onInfoClick = (infoKey: string) => {
    setSelectedInfoItem(taxInfoData[infoKey]);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <TaxCalculatorHeader />

      <div className="container">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-2/3">
            <div className="grid gap-8 mb-8">
              <TaxCalculatorInstructions />

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
                infoData={taxInfoData}
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
                onInfoClick={onInfoClick}
                totalAssets={totalAssets}
                employeeCount={employeeCount}
                isHighTechEnterprise={isHighTechEnterprise}
              />

              <TaxCalculatorActions
                handleCalculate={handleCalculate}
                handleReset={handleReset}
                handleExport={handleExport}
                riskValue={riskValue}
                riskPercentage={riskPercentage}
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

export default TaxCalculatorContainer;
