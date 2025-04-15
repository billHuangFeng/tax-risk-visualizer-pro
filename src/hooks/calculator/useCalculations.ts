
import { useEffect } from 'react';
import {
  calculateTotalAdjustments,
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
      // Use the totalAdjustment directly from the useTaxAdjustments hook
      // This is already calculated there by summing all individual adjustments
      
      // Calculate taxable income
      const adjustmentTotal = parseFloat(entertainmentExpenses.adjustment || '0') +
                             parseFloat(insuranceExpenses.adjustment || '0') +
                             parseFloat(rdExpenses.adjustment || '0');
                             
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
    entertainmentExpenses.adjustment, 
    insuranceExpenses.adjustment,
    rdExpenses.adjustment,
    taxRate, 
    actualTax
  ]);
};
