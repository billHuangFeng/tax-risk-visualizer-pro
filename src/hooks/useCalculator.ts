
import { useBasicInfo } from './calculator/useBasicInfo';
import { useRevenueExpenses } from './calculator/useRevenueExpenses';
import { useTaxAdjustments } from './calculator/useTaxAdjustments';
import { useTaxSummary } from './calculator/useTaxSummary';
import { useCalculations } from './calculator/useCalculations';
import { useActions } from './calculator/useActions';
import { useCallback } from 'react';

export const useCalculator = () => {
  const basicInfo = useBasicInfo();
  const revenueExpenses = useRevenueExpenses();
  const taxAdjustments = useTaxAdjustments();
  const taxSummary = useTaxSummary();
  
  // Define resetState function to reset all calculator state
  const resetCalculatorState = useCallback(() => {
    // Reset basic info
    if (!localStorage.getItem('isResetting')) {
      // Preserve company info on reset
      const companyName = localStorage.getItem('companyName') || '';
      const creditCode = localStorage.getItem('creditCode') || '';
      const contactPerson = localStorage.getItem('contactPerson') || '';
      const contactPhone = localStorage.getItem('contactPhone') || '';
      
      localStorage.setItem('companyName', companyName);
      localStorage.setItem('creditCode', creditCode);
      localStorage.setItem('contactPerson', contactPerson);
      localStorage.setItem('contactPhone', contactPhone);
    }
    
    // Flag to indicate if we're loading test data
    const isLoadingTestData = localStorage.getItem('isLoadingTestData') === 'true';
    
    // Reset enterprise info (unless loading test data)
    if (!isLoadingTestData) {
      basicInfo.setIsExcludedIndustry(false);
      basicInfo.setIsHighTechEnterprise(false);
      basicInfo.setTotalAssets('');
      basicInfo.setEmployeeCount('');
    } else {
      // Set enterprise info from test data
      basicInfo.setIsHighTechEnterprise(true);
      basicInfo.setTotalAssets(localStorage.getItem('totalAssets') || '');
      basicInfo.setEmployeeCount(localStorage.getItem('employeeCount') || '');
      localStorage.setItem('isLoadingTestData', 'false');
    }
    
    // Reset or set revenue and expenses
    revenueExpenses.setTotalRevenue(isLoadingTestData ? localStorage.getItem('totalRevenue') || '' : '');
    revenueExpenses.setInvoicedRevenue(isLoadingTestData ? localStorage.getItem('invoicedRevenue') || '' : '');
    revenueExpenses.setNonInvoicedRevenue(isLoadingTestData ? localStorage.getItem('nonInvoicedRevenue') || '' : '');
    revenueExpenses.setNewInvoicedRevenue('');
    revenueExpenses.setTotalExpenses(isLoadingTestData ? localStorage.getItem('totalExpenses') || '' : '');
    revenueExpenses.setInvoicedExpenses(isLoadingTestData ? localStorage.getItem('invoicedExpenses') || '' : '');
    revenueExpenses.setNonInvoicedExpenses(isLoadingTestData ? localStorage.getItem('nonInvoicedExpenses') || '' : '');
    revenueExpenses.setPersonalTax(isLoadingTestData ? localStorage.getItem('personalTax') || '' : '');
    revenueExpenses.setSocialSecurity(isLoadingTestData ? localStorage.getItem('socialSecurity') || '' : '');
    revenueExpenses.setDepreciation(isLoadingTestData ? localStorage.getItem('depreciation') || '' : '');
    revenueExpenses.setOtherExpenses(isLoadingTestData ? localStorage.getItem('otherExpenses') || '' : '');
    
    // Reset or set tax adjustments
    const emptyAdjustment = { actual: '', deductible: '', adjustment: '' };
    
    if (isLoadingTestData) {
      taxAdjustments.setRdExpenses({
        actual: localStorage.getItem('rdExpenses') || '',
        deductible: '',
        adjustment: ''
      });
      taxAdjustments.setEntertainmentExpenses({
        actual: localStorage.getItem('entertainmentExpenses') || '',
        deductible: '',
        adjustment: ''
      });
      taxAdjustments.setAdvertisingExpenses({
        actual: localStorage.getItem('advertisingExpenses') || '',
        deductible: '',
        adjustment: ''
      });
      taxAdjustments.setEducationExpenses({
        actual: localStorage.getItem('educationExpenses') || '',
        deductible: '',
        adjustment: ''
      });
      taxAdjustments.setWelfareExpenses({
        actual: localStorage.getItem('welfareExpenses') || '',
        deductible: '',
        adjustment: ''
      });
      taxAdjustments.setInsuranceExpenses({
        actual: localStorage.getItem('insuranceExpenses') || '',
        deductible: '',
        adjustment: ''
      });
      taxAdjustments.setNonDeductibleExpenses({
        actual: localStorage.getItem('nonDeductibleExpenses') || '',
        deductible: '',
        adjustment: ''
      });
    } else {
      taxAdjustments.setRdExpenses(emptyAdjustment);
      taxAdjustments.setEntertainmentExpenses(emptyAdjustment);
      taxAdjustments.setAdvertisingExpenses(emptyAdjustment);
      taxAdjustments.setEducationExpenses(emptyAdjustment);
      taxAdjustments.setWelfareExpenses(emptyAdjustment);
      taxAdjustments.setInsuranceExpenses(emptyAdjustment);
      taxAdjustments.setNonDeductibleExpenses(emptyAdjustment);
    }
    
    // Reset or set tax summary
    taxSummary.setTaxableIncome('');
    taxSummary.setTaxRate('');
    taxSummary.setTheoreticalTax('');
    taxSummary.setActualTax(isLoadingTestData ? localStorage.getItem('actualTax') || '' : '');
    taxSummary.setRiskValue('');
    taxSummary.setRiskPercentage(0);
    
    // Reset or set tax difference factors
    if (isLoadingTestData) {
      const factorsString = localStorage.getItem('taxDifferenceFactors');
      if (factorsString) {
        try {
          const factors = JSON.parse(factorsString);
          if (Array.isArray(factors)) {
            taxSummary.setTaxDifferenceFactors(factors);
          }
        } catch (error) {
          console.error('Error parsing tax difference factors:', error);
          taxSummary.setTaxDifferenceFactors([{ id: '1', description: '差异原因1', amount: 0 }]);
        }
      }
    } else {
      taxSummary.setTaxDifferenceFactors([{ id: '1', description: '差异原因1', amount: 0 }]);
    }
  }, [basicInfo, revenueExpenses, taxAdjustments, taxSummary]);
  
  const actions = useActions(taxSummary.riskValue, taxSummary.riskPercentage, resetCalculatorState);

  useCalculations(
    revenueExpenses.totalRevenue,
    revenueExpenses.totalExpenses,
    taxAdjustments.entertainmentExpenses,
    taxAdjustments.insuranceExpenses,
    taxAdjustments.rdExpenses,
    taxAdjustments.advertisingExpenses,
    taxAdjustments.educationExpenses,
    taxAdjustments.welfareExpenses,
    taxAdjustments.nonDeductibleExpenses,
    taxSummary.taxRate,
    taxSummary.actualTax,
    taxAdjustments.setTotalAdjustment,
    taxSummary.setTaxableIncome,
    taxSummary.setTheoreticalTax,
    taxSummary.setRiskValue,
    taxSummary.setRiskPercentage,
  );

  return {
    ...basicInfo,
    ...revenueExpenses,
    ...taxAdjustments,
    ...taxSummary,
    ...actions,
  };
};
