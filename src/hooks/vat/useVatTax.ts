
import { useState } from 'react';

export const useVatTax = () => {
  const [actualTax, setActualTax] = useState<number>(200);
  const [payableTax, setPayableTax] = useState<number>(0);
  const [taxDifference, setTaxDifference] = useState<number>(0);
  const [taxDifferencePercentage, setTaxDifferencePercentage] = useState<number>(0);
  const [unexplainedDifference, setUnexplainedDifference] = useState<number>(0);
  const [riskLevel, setRiskLevel] = useState<string>('');

  return {
    actualTax,
    setActualTax,
    payableTax,
    setPayableTax,
    taxDifference,
    setTaxDifference,
    taxDifferencePercentage,
    setTaxDifferencePercentage,
    unexplainedDifference,
    setUnexplainedDifference,
    riskLevel,
    setRiskLevel
  };
};
