
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
      // Calculate total adjustments
      const adjustmentTotal = calculateTotalAdjustments(
        entertainmentExpenses.adjustment,
        insuranceExpenses.adjustment
      );
      setTotalAdjustment(adjustmentTotal.toFixed(2));
      
      // Calculate taxable income
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
    taxRate, 
    actualTax
  ]);
};
