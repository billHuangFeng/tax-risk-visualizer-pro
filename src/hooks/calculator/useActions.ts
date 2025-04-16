
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
      toast({
        title: "正在生成PDF",
        description: "正在处理，请稍候...",
      });
      
      // Get calculator content element to see if it exists
      const calculatorContent = document.querySelector('#calculator-content');
      if (!calculatorContent) {
        throw new Error('计算器内容未找到');
      }
      
      // Pass the full calculator data to the export function
      await exportToPDF({
        riskValue,
        riskPercentage,
        companyName: document.querySelector('input#companyName')?.value || '税务计算',
      });
      
      toast({
        title: "导出成功",
        description: "PDF文件已生成并下载",
      });
    } catch (error) {
      console.error("PDF export error:", error);
      toast({
        title: "导出失败",
        description: "无法生成PDF，请稍后重试",
        variant: "destructive",
      });
    }
  }, [riskValue, riskPercentage, toast]);

  return {
    handleReset,
    handleExport,
  };
};
