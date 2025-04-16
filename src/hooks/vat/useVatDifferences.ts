
import { useState, useCallback, useMemo } from 'react';
import { DifferenceFactor, DifferenceExplanation } from '../types';

export const useVatDifferences = () => {
  const [differenceFactors, setDifferenceFactors] = useState<DifferenceFactor[]>([
    { id: '1', description: '差异原因1', amount: 100 },
    { id: '2', description: '差异原因2', amount: 130 },
    { id: '3', description: '差异原因3', amount: -140 }
  ]);

  const [differenceExplanations, setDifferenceExplanations] = useState<DifferenceExplanation[]>([
    { id: '1', reason: '', amount: 0 }
  ]);

  const addDifferenceFactor = useCallback(() => {
    const newId = (differenceFactors.length + 1).toString();
    setDifferenceFactors([
      ...differenceFactors,
      { id: newId, description: `差异原因${newId}`, amount: 0 }
    ]);
  }, [differenceFactors]);

  const updateDifferenceFactor = useCallback((id: string, field: keyof DifferenceFactor, value: any) => {
    setDifferenceFactors(prevFactors => {
      return prevFactors.map(factor => {
        if (factor.id === id) {
          return { ...factor, [field]: value };
        }
        return factor;
      });
    });
  }, []);

  const removeDifferenceFactor = useCallback((id: string) => {
    setDifferenceFactors(prevFactors => prevFactors.filter(factor => factor.id !== id));
  }, []);

  const addDifferenceExplanation = useCallback(() => {
    const newId = (differenceExplanations.length + 1).toString();
    setDifferenceExplanations(prev => [...prev, { id: newId, reason: '', amount: 0 }]);
  }, [differenceExplanations]);

  const updateDifferenceExplanation = useCallback((id: string, field: keyof DifferenceExplanation, value: any) => {
    setDifferenceExplanations(prev => 
      prev.map(item => item.id === id ? { ...item, [field]: value } : item)
    );
  }, []);

  const removeDifferenceExplanation = useCallback((id: string) => {
    setDifferenceExplanations(prev => prev.filter(item => item.id !== id));
  }, []);

  const explainedDifferenceTotal = useMemo(() => {
    return differenceExplanations.reduce((sum, explanation) => sum + explanation.amount, 0);
  }, [differenceExplanations]);

  return {
    differenceFactors,
    setDifferenceFactors,
    addDifferenceFactor,
    updateDifferenceFactor,
    removeDifferenceFactor,
    differenceExplanations,
    addDifferenceExplanation,
    updateDifferenceExplanation,
    removeDifferenceExplanation,
    explainedDifferenceTotal
  };
};
