
import { useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { exportToPDF } from '@/utils/pdf';
import { PdfTemplate } from '@/types/pdfTemplates';

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

  const handleExport = useCallback(async (template?: PdfTemplate) => {
    try {
      // 确保计算器内容存在
      const calculatorContent = document.getElementById('calculator-content');
      if (!calculatorContent) {
        throw new Error('计算器内容未找到');
      }
      
      // 等一下确保所有DOM更新都已处理
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // 定义导出数据
      const companyNameInput = document.querySelector('input#companyName') as HTMLInputElement | null;
      const companyName = companyNameInput?.value || '税务计算';
      
      // 收集用于PDF的所有输入值
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
      
      // 使用导出到PDF函数
      await exportToPDF({
        riskValue,
        riskPercentage,
        companyName,
        ...collectFormData()
      }, template || (window as any).currentPdfTemplate);
      
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
