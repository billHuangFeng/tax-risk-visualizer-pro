
import { useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { exportToPDF } from '@/utils/pdf';

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
        title: "准备导出PDF",
        description: "正在处理数据...",
      });
      
      // 收集用于PDF的所有输入值
      const collectFormData = () => {
        const data: Record<string, any> = {};
        
        // 获取所有输入字段
        const inputs = document.querySelectorAll('input') as NodeListOf<HTMLInputElement>;
        inputs.forEach(input => {
          if (input.id) {
            if (input.type === 'checkbox' || input.getAttribute('role') === 'checkbox') {
              data[input.id] = input.checked || input.getAttribute('data-state') === 'checked';
            } else {
              data[input.id] = input.value || '';
            }
          }
        });
        
        // 获取特定数据
        data.riskValue = riskValue;
        data.riskPercentage = riskPercentage;
        data.riskLevel = getRiskLevel(riskPercentage);
        
        return data;
      };
      
      const formData = collectFormData();
      console.log("收集的表单数据:", formData);
      
      // 导出PDF
      await exportToPDF(formData);
      
      toast({
        title: "PDF导出成功",
        description: "文件已保存到您的下载文件夹",
        variant: "default",
      });
      
      return true;
    } catch (error) {
      console.error("PDF export error:", error);
      
      toast({
        title: "PDF导出失败",
        description: error instanceof Error ? error.message : "未知错误",
        variant: "destructive",
      });
      
      throw error;
    }
  }, [riskValue, riskPercentage, toast]);

  return {
    handleReset,
    handleExport
  };
};
