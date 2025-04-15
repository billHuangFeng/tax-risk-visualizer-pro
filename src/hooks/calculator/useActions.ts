
import { useToast } from '@/hooks/use-toast';

export const useActions = (riskValue: string, riskPercentage: number) => {
  const { toast } = useToast();

  const getRiskLevel = (percentage: number) => {
    if (percentage < 30) return '低风险';
    if (percentage < 70) return '中等风险';
    return '高风险';
  };

  const handleReset = () => {
    toast({
      title: "表单已重置",
      description: "您已成功重置输入数据",
      variant: "default",
    });
  };

  const handleExport = () => {
    toast({
      title: "导出功能",
      description: "导出功能即将推出",
      variant: "default",
    });
  };

  return {
    handleReset,
    handleExport,
  };
};
