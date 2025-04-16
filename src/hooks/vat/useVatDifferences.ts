import { useState, useCallback, useMemo } from 'react';
import type { DifferenceFactor, DifferenceExplanation } from '../types';

export const useVatDifferences = () => {
  const [salesDifferenceFactors, setSalesDifferenceFactors] = useState<DifferenceFactor[]>([
    { id: '1', description: '销售差异原因1', amount: 0 }
  ]);

  const [purchasesDifferenceFactors, setPurchasesDifferenceFactors] = useState<DifferenceFactor[]>([
    { id: '1', description: '采购差异原因1', amount: 0 }
  ]);

  const [salesDifferenceExplanations, setSalesDifferenceExplanations] = useState<DifferenceExplanation[]>([
    { id: '1', reason: '', amount: 0 }
  ]);

  const [purchasesDifferenceExplanations, setPurchasesDifferenceExplanations] = useState<DifferenceExplanation[]>([
    { id: '1', reason: '', amount: 0 }
  ]);

  const addSalesDifferenceFactor = useCallback(() => {
    const newId = (salesDifferenceFactors.length + 1).toString();
    setSalesDifferenceFactors([
      ...salesDifferenceFactors,
      { id: newId, description: `销售差异原因${newId}`, amount: 0 }
    ]);
  }, [salesDifferenceFactors]);

  const updateSalesDifferenceFactor = useCallback((id: string, field: keyof DifferenceFactor, value: any) => {
    setSalesDifferenceFactors(prevFactors => {
      return prevFactors.map(factor => {
        if (factor.id === id) {
          return { ...factor, [field]: value };
        }
        return factor;
      });
    });
  }, []);

  const removeSalesDifferenceFactor = useCallback((id: string) => {
    setSalesDifferenceFactors(prevFactors => prevFactors.filter(factor => factor.id !== id));
  }, []);

  const addPurchasesDifferenceFactor = useCallback(() => {
    const newId = (purchasesDifferenceFactors.length + 1).toString();
    setPurchasesDifferenceFactors([
      ...purchasesDifferenceFactors,
      { id: newId, description: `采购差异原因${newId}`, amount: 0 }
    ]);
  }, [purchasesDifferenceFactors]);

  const updatePurchasesDifferenceFactor = useCallback((id: string, field: keyof DifferenceFactor, value: any) => {
    setPurchasesDifferenceFactors(prevFactors => {
      return prevFactors.map(factor => {
        if (factor.id === id) {
          return { ...factor, [field]: value };
        }
        return factor;
      });
    });
  }, []);

  const removePurchasesDifferenceFactor = useCallback((id: string) => {
    setPurchasesDifferenceFactors(prevFactors => prevFactors.filter(factor => factor.id !== id));
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
    salesDifferenceFactors,
    setSalesDifferenceFactors,
    addSalesDifferenceFactor,
    updateSalesDifferenceFactor,
    removeSalesDifferenceFactor,
    purchasesDifferenceFactors,
    setPurchasesDifferenceFactors,
    addPurchasesDifferenceFactor,
    updatePurchasesDifferenceFactor,
    removePurchasesDifferenceFactor,
    salesDifferenceExplanations,
    addSalesDifferenceExplanation,
    updateSalesDifferenceExplanation,
    removeSalesDifferenceExplanation,
    purchasesDifferenceExplanations,
    addPurchasesDifferenceExplanation,
    updatePurchasesDifferenceExplanation,
    removePurchasesDifferenceExplanation,
    salesExplainedDifferenceTotal,
    purchasesExplainedDifferenceTotal
  };
};
