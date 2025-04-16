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

  useEffect(() => {
    const isLoadingTestData = localStorage.getItem('isLoadingTestData') === 'true';
    
    if (isLoadingTestData) {
      setActualTax(localStorage.getItem('actualTax') || '');
      
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
  
  useEffect(() => {
    const handleStorageChange = () => {
      const isLoadingTestData = localStorage.getItem('isLoadingTestData') === 'true';
      
      if (isLoadingTestData) {
        setActualTax(localStorage.getItem('actualTax') || '');
        
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
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
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

  useEffect(() => {
    const unexplainedDiff = parseFloat(unexplainedDifference) || 0;
    const theoretical = parseFloat(theoreticalTax) || 0;
    
    const percentage = theoretical !== 0 
      ? (unexplainedDiff / Math.abs(theoretical)) * 100 
      : 0;
    
    setUnexplainedDifferencePercentage(percentage);
  }, [unexplainedDifference, theoreticalTax]);

  useEffect(() => {
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
    setTaxDifferenceFactors,
    addTaxDifferenceFactor,
    updateTaxDifferenceFactor,
    removeTaxDifferenceFactor,
    unexplainedDifference,
    setUnexplainedDifference,
    unexplainedDifferencePercentage,
  };
};
