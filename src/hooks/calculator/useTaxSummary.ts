
import { useState, useCallback, useEffect } from 'react';
import { DifferenceFactor } from '@/components/TaxCalculator/TaxSummaryComponents/DifferenceFactors';

export const useTaxSummary = () => {
  const [taxableIncome, setTaxableIncome] = useState('');
  const [taxRate, setTaxRate] = useState('');
  const [theoreticalTax, setTheoreticalTax] = useState('');
  const [actualTax, setActualTax] = useState('');
  const [riskValue, setRiskValue] = useState('');
  const [riskPercentage, setRiskPercentage] = useState(0);
  const [unexplainedDifference, setUnexplainedDifference] = useState('0');
  const [unexplainedDifferencePercentage, setUnexplainedDifferencePercentage] = useState(0);
  
  const [taxDifferenceFactors, setTaxDifferenceFactors] = useState<DifferenceFactor[]>([
    { id: '1', description: '差异原因1', amount: 0 }
  ]);

  // Load test data if flag is set
  useEffect(() => {
    if (localStorage.getItem('isLoadingTestData') === 'true') {
      // Load tax summary data
      setActualTax(localStorage.getItem('actualTax') || '');
      
      // Load tax difference factors
      const factorsString = localStorage.getItem('taxDifferenceFactors');
      if (factorsString) {
        try {
          const factors = JSON.parse(factorsString);
          if (Array.isArray(factors)) {
            setTaxDifferenceFactors(factors);
          }
        } catch (error) {
          console.error('Error parsing tax difference factors:', error);
        }
      }
    }
  }, []);

  const addTaxDifferenceFactor = useCallback(() => {
    const newId = (taxDifferenceFactors.length + 1).toString();
    setTaxDifferenceFactors([
      ...taxDifferenceFactors,
      { id: newId, description: `差异原因${newId}`, amount: 0 }
    ]);
  }, [taxDifferenceFactors]);

  const updateTaxDifferenceFactor = useCallback((id: string, field: keyof DifferenceFactor, value: any) => {
    setTaxDifferenceFactors(prevFactors => {
      const updatedFactors = prevFactors.map(factor => {
        if (factor.id === id) {
          return { ...factor, [field]: value };
        }
        return factor;
      });
      
      // Calculate unexplained difference
      const explainedAmount = updatedFactors.reduce(
        (sum, factor) => sum + factor.amount, 
        0
      );
      
      const riskValueNumber = parseFloat(riskValue) || 0;
      const newUnexplainedDifference = riskValueNumber - explainedAmount;
      setUnexplainedDifference(newUnexplainedDifference.toFixed(2));
      
      return updatedFactors;
    });
  }, [riskValue]);

  const removeTaxDifferenceFactor = useCallback((id: string) => {
    setTaxDifferenceFactors(prevFactors => {
      const updatedFactors = prevFactors.filter(factor => factor.id !== id);
      
      // Calculate unexplained difference
      const explainedAmount = updatedFactors.reduce(
        (sum, factor) => sum + factor.amount, 
        0
      );
      
      const riskValueNumber = parseFloat(riskValue) || 0;
      const newUnexplainedDifference = riskValueNumber - explainedAmount;
      setUnexplainedDifference(newUnexplainedDifference.toFixed(2));
      
      return updatedFactors;
    });
  }, [riskValue]);

  // Calculate unexplained difference percentage whenever the unexplained difference or theoretical tax changes
  useEffect(() => {
    const unexplainedDiff = parseFloat(unexplainedDifference) || 0;
    const theoretical = parseFloat(theoreticalTax) || 0;
    
    // Calculate as: 未解释差异/理论应纳企业所得税的绝对值
    const percentage = theoretical !== 0 
      ? (unexplainedDiff / Math.abs(theoretical)) * 100 
      : 0;
    
    setUnexplainedDifferencePercentage(percentage);
  }, [unexplainedDifference, theoreticalTax]);

  // Update unexplained difference whenever risk value changes
  useEffect(() => {
    // Calculate explained amount
    const explainedAmount = taxDifferenceFactors.reduce(
      (sum, factor) => sum + factor.amount, 
      0
    );
    
    const riskValueNumber = parseFloat(riskValue) || 0;
    const newUnexplainedDifference = riskValueNumber - explainedAmount;
    setUnexplainedDifference(newUnexplainedDifference.toFixed(2));
  }, [riskValue, taxDifferenceFactors]);

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
    taxDifferenceFactors,
    addTaxDifferenceFactor,
    updateTaxDifferenceFactor,
    removeTaxDifferenceFactor,
    unexplainedDifference,
    setUnexplainedDifference,
    unexplainedDifferencePercentage,
  };
};
