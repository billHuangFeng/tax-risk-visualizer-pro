
import { useState } from 'react';
import { DifferenceFactor } from '@/components/TaxCalculator/TaxSummaryComponents/DifferenceFactors';

export const useActions = (riskValue: string, riskPercentage: number) => {
  const resetDefaults = () => {
    // Default values to reset to
    const defaultTaxDifferenceFactors: DifferenceFactor[] = [
      { id: '1', description: '差异原因1', amount: 0 }
    ];
    
    // Reset all form fields
    window.location.reload();
  };

  const handleReset = () => {
    if (confirm('确定要重置所有数据吗？')) {
      resetDefaults();
    }
  };

  return {
    handleReset,
  };
};
