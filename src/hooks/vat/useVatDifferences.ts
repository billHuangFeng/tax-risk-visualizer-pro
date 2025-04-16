
import { useState, useCallback, useMemo } from 'react';
import type { DifferenceFactor, DifferenceExplanation } from '../types';

export const useVatDifferences = () => {
  const [taxDifferenceFactors, setTaxDifferenceFactors] = useState<DifferenceFactor[]>([
    { id: '1', description: '', amount: 0 }
  ]);

  const [salesDifferenceExplanations, setSalesDifferenceExplanations] = useState<DifferenceExplanation[]>([
    { id: '1', reason: '', amount: 0 }
  ]);

  const [purchasesDifferenceExplanations, setPurchasesDifferenceExplanations] = useState<DifferenceExplanation[]>([
    { id: '1', reason: '', amount: 0 }
  ]);

  const addTaxDifferenceFactor = useCallback(() => {
    const newId = (taxDifferenceFactors.length + 1).toString();
    setTaxDifferenceFactors([
      ...taxDifferenceFactors,
      { id: newId, description: `差异原因${newId}`, amount: 0 }
    ]);
  }, [taxDifferenceFactors]);

  const updateTaxDifferenceFactor = useCallback((id: string, field: keyof DifferenceFactor, value: any) => {
    setTaxDifferenceFactors(prevFactors => {
      return prevFactors.map(factor => {
        if (factor.id === id) {
          return { ...factor, [field]: value };
        }
        return factor;
      });
    });
  }, []);

  const removeTaxDifferenceFactor = useCallback((id: string) => {
    setTaxDifferenceFactors(prevFactors => prevFactors.filter(factor => factor.id !== id));
  }, []);

  const addSalesDifferenceExplanation = useCallback(() => {
    const newId = (salesDifferenceExplanations.length + 1).toString();
    setSalesDifferenceExplanations(prev => [...prev, { id: newId, reason: '', amount: 0 }]);
  }, [salesDifferenceExplanations]);

  const updateSalesDifferenceExplanation = useCallback((id: string, field: keyof DifferenceExplanation, value: any) => {
    setSalesDifferenceExplanations(prev => 
      prev.map(item => item.id === id ? { ...item, [field]: value } : item)
    );
  }, []);

  const removeSalesDifferenceExplanation = useCallback((id: string) => {
    setSalesDifferenceExplanations(prev => prev.filter(item => item.id !== id));
  }, []);

  const addPurchasesDifferenceExplanation = useCallback(() => {
    const newId = (purchasesDifferenceExplanations.length + 1).toString();
    setPurchasesDifferenceExplanations(prev => [...prev, { id: newId, reason: '', amount: 0 }]);
  }, [purchasesDifferenceExplanations]);

  const updatePurchasesDifferenceExplanation = useCallback((id: string, field: keyof DifferenceExplanation, value: any) => {
    setPurchasesDifferenceExplanations(prev => 
      prev.map(item => item.id === id ? { ...item, [field]: value } : item)
    );
  }, []);

  const removePurchasesDifferenceExplanation = useCallback((id: string) => {
    setPurchasesDifferenceExplanations(prev => prev.filter(item => item.id !== id));
  }, []);

  const salesExplainedDifferenceTotal = useMemo(() => {
    return salesDifferenceExplanations.reduce((sum, explanation) => sum + explanation.amount, 0);
  }, [salesDifferenceExplanations]);

  const purchasesExplainedDifferenceTotal = useMemo(() => {
    return purchasesDifferenceExplanations.reduce((sum, explanation) => sum + explanation.amount, 0);
  }, [purchasesDifferenceExplanations]);

  return {
    taxDifferenceFactors,
    setTaxDifferenceFactors,
    addTaxDifferenceFactor,
    updateTaxDifferenceFactor,
    removeTaxDifferenceFactor,
    salesDifferenceExplanations,
    setSalesDifferenceExplanations,
    addSalesDifferenceExplanation,
    updateSalesDifferenceExplanation,
    removeSalesDifferenceExplanation,
    purchasesDifferenceExplanations,
    setPurchasesDifferenceExplanations,
    addPurchasesDifferenceExplanation,
    updatePurchasesDifferenceExplanation,
    removePurchasesDifferenceExplanation,
    salesExplainedDifferenceTotal,
    purchasesExplainedDifferenceTotal
  };
};
