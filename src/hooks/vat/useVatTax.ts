
import { useState } from 'react';

export const useVatTax = () => {
  const [actualTax, setActualTax] = useState<number>(200);
  const [payableTax, setPayableTax] = useState<number>(0);
  const [taxDifference, setTaxDifference] = useState<number>(0);
  const [taxDifferencePercentage, setTaxDifferencePercentage] = useState<number>(0);
  const [riskPercentage, setRiskPercentage] = useState<number>(0);
  const [unexplainedDifference, setUnexplainedDifference] = useState<number>(0);
  const [riskLevel, setRiskLevel] = useState<string>('');

  // Calculate tax difference percentage (差异幅度)
  const calculateTaxDifferencePercentage = (actualTax: number, payableTax: number) => {
    // (实缴增值税-应交增值税)/应交增值税 * 100
    if (payableTax === 0) return 0;
    return ((actualTax - payableTax) / Math.abs(payableTax)) * 100;
  };

  // Calculate risk percentage based on updated formula (风险百分比)
  const calculateRiskPercentage = (actualTax: number, payableTax: number, outputTax: number) => {
    // 基数 = Max(应交增值税, 销项税额×10%)
    const baseAmount = Math.max(
      Math.abs(payableTax),  // 应交增值税
      outputTax * 0.1        // 销项税的10%
    );
    
    if (baseAmount === 0) return 0;
    
    // 风险百分比 = |应交增值税 - 实缴增值税| ÷ 基数 × 100%
    return (Math.abs(actualTax - payableTax) / baseAmount) * 100;
  };

  // Override setPayableTax to auto-update both percentages
  const setPayableTaxWithDifference = (newPayableTax: number) => {
    setPayableTax(newPayableTax);
    const newDifference = actualTax - newPayableTax;
    setTaxDifference(newDifference);
    setTaxDifferencePercentage(calculateTaxDifferencePercentage(actualTax, newPayableTax));
  };

  // Override setActualTax to auto-update both percentages
  const setActualTaxWithDifference = (newActualTax: number) => {
    setActualTax(newActualTax);
    const newDifference = newActualTax - payableTax;
    setTaxDifference(newDifference);
    setTaxDifferencePercentage(calculateTaxDifferencePercentage(newActualTax, payableTax));
  };

  return {
    actualTax,
    setActualTax: setActualTaxWithDifference,
    payableTax,
    setPayableTax: setPayableTaxWithDifference,
    taxDifference,
    setTaxDifference,
    taxDifferencePercentage,
    setTaxDifferencePercentage,
    riskPercentage,
    setRiskPercentage,
    unexplainedDifference,
    setUnexplainedDifference,
    riskLevel,
    setRiskLevel,
    calculateRiskPercentage
  };
};
