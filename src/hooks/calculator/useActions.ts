
import { useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { exportToPDF } from '@/utils/pdfExport';

export const useActions = (riskValue: string, riskPercentage: number) => {
  const { toast } = useToast();

  const getRiskLevel = (percentage: number) => {
    if (percentage < 30) return '低风险';
    if (percentage < 70) return '中等风险';
    return '高风险';
  };

  const handleReset = useCallback(() => {
    toast({
      title: "表单已重置",
      description: "您已成功重置输入数据",
      variant: "default",
    });
  }, [toast]);

  const handleExport = useCallback(async () => {
    try {
      // Get calculator content element to see if it exists
      const calculatorContent = document.querySelector('#calculator-content');
      if (!calculatorContent) {
        throw new Error('计算器内容未找到');
      }
      
      // Prepare inputs for PDF export
      const inputs = calculatorContent.querySelectorAll('input') as NodeListOf<HTMLInputElement>;
      inputs.forEach(input => {
        // Make sure the data-value attribute is set (backup)
        if (input.value && !input.hasAttribute('data-value')) {
          input.setAttribute('data-value', input.value);
        }
      });
      
      // Collect all the calculator data
      const formData: Record<string, string> = {};
      inputs.forEach(input => {
        if (input.id) {
          formData[input.id] = input.value;
        }
      });
      
      // Properly type the input element before accessing its value
      const companyNameInput = document.querySelector('input#companyName') as HTMLInputElement | null;
      const companyName = companyNameInput?.value || '税务计算';
      
      // Pass the full calculator data to the export function
      await exportToPDF({
        riskValue,
        riskPercentage,
        companyName,
        ...formData
      });
      
    } catch (error) {
      console.error("PDF export error:", error);
      throw error;
    }
  }, [riskValue, riskPercentage]);

  return {
    handleReset,
    handleExport,
  };
};
