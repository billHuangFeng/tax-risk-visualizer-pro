
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
      
      // Clear any existing duplicate elements before export
      const duplicateElements = document.querySelectorAll('span:not(.pdf-value)[style*="position: absolute"]');
      duplicateElements.forEach(el => {
        if (el.parentElement) {
          el.parentElement.removeChild(el);
        }
      });
      
      // Pre-process all inputs for better visibility in PDF
      const inputs = document.querySelectorAll('input') as NodeListOf<HTMLInputElement>;
      inputs.forEach(input => {
        // Make sure the data-value attribute is set (backup)
        if (input.value) {
          input.setAttribute('data-value', input.value);
        }
      });
      
      // Make sure all PDF values are visible but don't create duplicates
      const pdfValues = document.querySelectorAll('.pdf-value') as NodeListOf<HTMLElement>;
      pdfValues.forEach(element => {
        // Mark as a PDF value to prevent duplication
        element.setAttribute('data-pdf-value', 'true');
        
        if (element.parentElement) {
          const input = element.parentElement.querySelector('input') as HTMLInputElement;
          if (input) {
            element.textContent = input.value || '0';
          }
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
