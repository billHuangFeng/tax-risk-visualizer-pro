
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
      // Ensure calculator content exists
      const calculatorContent = document.getElementById('calculator-content');
      if (!calculatorContent) {
        throw new Error('计算器内容未找到');
      }
      
      // Define data for export
      const companyNameInput = document.querySelector('input#companyName') as HTMLInputElement | null;
      const companyName = companyNameInput?.value || '税务计算';
      
      // Collect all input values for the PDF
      const collectFormData = () => {
        const data: Record<string, string> = {};
        const inputs = document.querySelectorAll('input') as NodeListOf<HTMLInputElement>;
        
        inputs.forEach(input => {
          if (input.id) {
            data[input.id] = input.value || '';
          }
        });
        
        return data;
      };
      
      // Execute the PDF export with collected data
      await exportToPDF({
        riskValue,
        riskPercentage,
        companyName,
        ...collectFormData()
      });
      
      return true;
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
