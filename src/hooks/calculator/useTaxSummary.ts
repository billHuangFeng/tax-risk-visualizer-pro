
import { useState } from 'react';

export const useTaxSummary = () => {
  const [taxableIncome, setTaxableIncome] = useState('2,022.00');
  const [taxRate, setTaxRate] = useState('25');
  const [theoreticalTax, setTheoreticalTax] = useState('505.50');
  const [actualTax, setActualTax] = useState('300.00');
  const [riskValue, setRiskValue] = useState('205.50');
  const [riskPercentage, setRiskPercentage] = useState(40);

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
