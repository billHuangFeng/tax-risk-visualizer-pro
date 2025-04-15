
import { useEffect } from 'react';

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
      
      // Calculate risk percentage
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
};
