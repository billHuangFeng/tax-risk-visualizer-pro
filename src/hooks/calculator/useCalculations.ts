
import { useEffect } from 'react';
import {
  calculateTaxableIncome,
  calculateTheoreticalTax,
  calculateRiskValues
} from '@/utils/calculationUtils';

export const useCalculations = (
  totalRevenue: string,
  totalExpenses: string,
  entertainmentExpenses: { adjustment: string },
  insuranceExpenses: { adjustment: string },
  rdExpenses: { adjustment: string },
  advertisingExpenses: { adjustment: string },
  educationExpenses: { adjustment: string },
  welfareExpenses: { adjustment: string },
  nonDeductibleExpenses: { adjustment: string },
  taxRate: string,
  actualTax: string,
  setTotalAdjustment: (value: string) => void,
  setTaxableIncome: (value: string) => void,
  setTheoreticalTax: (value: string) => void,
  setRiskValue: (value: string) => void,
  setRiskPercentage: (value: number) => void,
) => {
  useEffect(() => {
    try {
      // Calculate total adjustment by including all adjustment values
      const adjustmentTotal = 
        parseFloat(rdExpenses.adjustment || '0') +
        parseFloat(entertainmentExpenses.adjustment || '0') +
        parseFloat(advertisingExpenses.adjustment || '0') +
        parseFloat(educationExpenses.adjustment || '0') +
        parseFloat(welfareExpenses.adjustment || '0') +
        parseFloat(insuranceExpenses.adjustment || '0') +
        parseFloat(nonDeductibleExpenses.adjustment || '0');
      
      // Calculate taxable income based on the formula:
      // 应纳税所得额 = 销售收入 - 成本费用 + 企业所得税前调增/调减
      const calculatedTaxableIncome = calculateTaxableIncome(
        totalRevenue,
        totalExpenses,
        adjustmentTotal
      );
      setTaxableIncome(calculatedTaxableIncome.toFixed(2));
      
      // Calculate theoretical tax
      const calculatedTheoreticalTax = calculateTheoreticalTax(
        calculatedTaxableIncome,
        taxRate
      );
      setTheoreticalTax(calculatedTheoreticalTax.toFixed(2));
      
      // Calculate risk values
      const { riskValue, riskPercentage } = calculateRiskValues(
        calculatedTheoreticalTax,
        actualTax
      );
      setRiskValue(riskValue.toFixed(2));
      setRiskPercentage(riskPercentage);
      
    } catch (error) {
      console.error('Calculation error:', error);
    }
  }, [
    totalRevenue, 
    totalExpenses, 
    rdExpenses.adjustment,
    entertainmentExpenses.adjustment, 
    advertisingExpenses.adjustment,
    educationExpenses.adjustment,
    welfareExpenses.adjustment,
    insuranceExpenses.adjustment,
    nonDeductibleExpenses.adjustment,
    taxRate, 
    actualTax
  ]);
};
