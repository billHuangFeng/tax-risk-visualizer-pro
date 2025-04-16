
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
        description: "正在生成报告...",
      });
      
      // 收集用于PDF的数据 - 保持原有的数据收集逻辑
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
        
        // 获取表单中的选择框和复选框数据
        const checkboxes = document.querySelectorAll('[role="checkbox"]') as NodeListOf<HTMLElement>;
        checkboxes.forEach(checkbox => {
          const id = checkbox.id || checkbox.getAttribute('data-id');
          if (id) {
            data[id] = checkbox.getAttribute('data-state') === 'checked';
          }
        });
        
        // 获取特定数据
        data.riskValue = riskValue;
        data.riskPercentage = riskPercentage;
        data.riskLevel = getRiskLevel(riskPercentage);
        
        // 获取企业基本信息
        const companyNameInput = document.getElementById('companyName') as HTMLInputElement;
        if (companyNameInput) {
          data.companyName = companyNameInput.value || '测试科技有限公司';
        }
        
        // 获取所有数值输入
        const numericInputs = [
          'totalAssets', 'employeeCount', 'totalRevenue', 'invoicedRevenue', 
          'nonInvoicedRevenue', 'newInvoicedRevenue', 'totalExpenses', 
          'invoicedExpenses', 'nonInvoicedExpenses', 'personalTax', 
          'socialSecurity', 'depreciation', 'otherExpenses', 'rdExpenses',
          'entertainmentExpenses', 'advertisingExpenses', 'educationExpenses',
          'welfareExpenses', 'insuranceExpenses', 'nonDeductibleExpenses',
          'totalAdjustment', 'taxableIncome', 'theoreticalTax', 'actualTax'
        ];
        
        numericInputs.forEach(inputId => {
          const input = document.getElementById(inputId) as HTMLInputElement;
          if (input) {
            data[inputId] = input.value || '0';
          } else {
            console.log(`未找到ID为${inputId}的输入元素`);
          }
        });
        
        // 特殊字段 - 是否高新技术企业和是否享受研发费加计扣除
        const isHighTechCheckbox = document.querySelector('[data-id="isHighTechEnterprise"]') as HTMLElement;
        if (isHighTechCheckbox) {
          data.isHighTechEnterprise = isHighTechCheckbox.getAttribute('data-state') === 'checked';
        }
        
        const exemptBusinessCheckbox = document.querySelector('[data-id="exemptBusiness"]') as HTMLElement;
        if (exemptBusinessCheckbox) {
          data.exemptBusiness = exemptBusinessCheckbox.getAttribute('data-state') === 'checked';
        }
        
        // 添加税率
        const taxRateInput = document.getElementById('taxRate') as HTMLInputElement;
        if (taxRateInput) {
          data.taxRate = taxRateInput.value || '25';
        }
        
        console.log("收集的表单数据:", data);
        return data;
      };
      
      const formData = collectFormData();
      
      // 导出PDF，使用新的基于屏幕的方法
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
