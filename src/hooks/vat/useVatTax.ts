
import { useState } from 'react';

export const useVatTax = () => {
  const [actualTax, setActualTax] = useState<number>(200);
  const [payableTax, setPayableTax] = useState<number>(0);
  const [taxDifference, setTaxDifference] = useState<number>(0);
  const [taxDifferencePercentage, setTaxDifferencePercentage] = useState<number>(0);
  const [riskPercentage, setRiskPercentage] = useState<number>(0);
  const [unexplainedDifference, setUnexplainedDifference] = useState<number>(0);
  const [riskLevel, setRiskLevel] = useState<string>('');

  // Calculate tax difference percentage
  const calculateTaxDifferencePercentage = (actualTax: number, payableTax: number) => {
    // (实缴增值税-应交增值税)/应交增值税 * 100
    if (payableTax === 0) return 0;
    return ((actualTax - payableTax) / Math.abs(payableTax)) * 100;
  };

  // Override setPayableTax to auto-update the difference percentage
  const setPayableTaxWithDifference = (newPayableTax: number) => {
    setPayableTax(newPayableTax);
    const newDifference = actualTax - newPayableTax;
    setTaxDifference(newDifference);
    setTaxDifferencePercentage(calculateTaxDifferencePercentage(actualTax, newPayableTax));
  };

  // Override setActualTax to auto-update the difference percentage
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
    setRiskLevel
  };
};
