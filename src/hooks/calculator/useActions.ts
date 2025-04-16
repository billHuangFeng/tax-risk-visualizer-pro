
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { DifferenceFactor } from '@/components/TaxCalculator/TaxSummaryComponents/DifferenceFactors';

export const useActions = (riskValue: string, riskPercentage: number) => {
  const { toast } = useToast();

  const handleReset = () => {
    if (confirm('确定要重置所有数据吗？')) {
      // Reset all form fields except for basic info
      // We'll reload the page but preserve basic info in localStorage
      const companyName = localStorage.getItem('companyName') || '';
      const creditCode = localStorage.getItem('creditCode') || '';
      const contactPerson = localStorage.getItem('contactPerson') || '';
      const contactPhone = localStorage.getItem('contactPhone') || '';
      
      // Save current basic info to localStorage before reset
      localStorage.setItem('companyName', companyName);
      localStorage.setItem('creditCode', creditCode);
      localStorage.setItem('contactPerson', contactPerson);
      localStorage.setItem('contactPhone', contactPhone);
      
      // Flag to indicate we're doing a reset (not a full page reload)
      localStorage.setItem('isResetting', 'true');
      
      window.location.reload();
      
      toast({
        title: "表单已重置",
        description: "您已成功重置企业所得税计算器数据",
        variant: "default",
      });
    }
  };

  return {
    handleReset,
  };
};
