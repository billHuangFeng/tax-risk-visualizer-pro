
import { useBasicInfo } from './calculator/useBasicInfo';
import { useRevenueExpenses } from './calculator/useRevenueExpenses';
import { useTaxAdjustments } from './calculator/useTaxAdjustments';
import { useTaxSummary } from './calculator/useTaxSummary';
import { useCalculations } from './calculator/useCalculations';
import { useActions } from './calculator/useActions';
import { useCallback, useEffect } from 'react';

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
    
    // Check if we're loading test data
    const isLoadingTestData = localStorage.getItem('isLoadingTestData') === 'true';
    
    if (!isLoadingTestData) {
      // Reset all fields if not loading test data
      basicInfo.setIsExcludedIndustry(false);
      basicInfo.setIsHighTechEnterprise(false);
      basicInfo.setTotalAssets('');
      basicInfo.setEmployeeCount('');
      
      revenueExpenses.setTotalRevenue('');
      revenueExpenses.setInvoicedRevenue('');
      revenueExpenses.setNonInvoicedRevenue('');
      revenueExpenses.setNewInvoicedRevenue('');
      revenueExpenses.setTotalExpenses('');
      revenueExpenses.setInvoicedExpenses('');
      revenueExpenses.setNonInvoicedExpenses('');
      revenueExpenses.setPersonalTax('');
      revenueExpenses.setSocialSecurity('');
      revenueExpenses.setDepreciation('');
      revenueExpenses.setOtherExpenses('');
      
      const emptyAdjustment = { actual: '', deductible: '', adjustment: '' };
      taxAdjustments.setRdExpenses(emptyAdjustment);
      taxAdjustments.setEntertainmentExpenses(emptyAdjustment);
      taxAdjustments.setAdvertisingExpenses(emptyAdjustment);
      taxAdjustments.setEducationExpenses(emptyAdjustment);
      taxAdjustments.setWelfareExpenses(emptyAdjustment);
      taxAdjustments.setInsuranceExpenses(emptyAdjustment);
      taxAdjustments.setNonDeductibleExpenses(emptyAdjustment);
      
      taxSummary.setTaxableIncome('');
      taxSummary.setTaxRate('');
      taxSummary.setTheoreticalTax('');
      taxSummary.setActualTax('');
      taxSummary.setRiskValue('');
      taxSummary.setRiskPercentage(0);
      taxSummary.setTaxDifferenceFactors([{ id: '1', description: '差异原因1', amount: 0 }]);
    } else {
      // For test data loading, we set the flag to false
      // Each hook should read the values from localStorage directly
      localStorage.setItem('isLoadingTestData', 'false');
      
      // Force a re-render to ensure all hooks load their test data
      setTimeout(() => {
        window.dispatchEvent(new Event('storage'));
      }, 0);
    }
  }, [basicInfo, revenueExpenses, taxAdjustments, taxSummary]);
  
  // Listen for storage event to re-render components
  useEffect(() => {
    const handleStorageChange = () => {
      // This is just to trigger a re-render when localStorage changes
      console.log('Storage changed, refreshing state');
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  
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
