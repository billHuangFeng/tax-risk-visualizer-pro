
import { useState } from 'react';

export const useTaxSummary = () => {
  const [taxableIncome, setTaxableIncome] = useState('');
  const [taxRate, setTaxRate] = useState('');
  const [theoreticalTax, setTheoreticalTax] = useState('');
  const [actualTax, setActualTax] = useState('');
  const [riskValue, setRiskValue] = useState('');
  const [riskPercentage, setRiskPercentage] = useState(0);

  return {
    taxableIncome,
    setTaxableIncome,
    taxRate,
    setTaxRate,
    theoreticalTax,
    setTheoreticalTax,
    actualTax,
    setActualTax,
    riskValue,
    setRiskValue,
    riskPercentage,
    setRiskPercentage,
  };
};
