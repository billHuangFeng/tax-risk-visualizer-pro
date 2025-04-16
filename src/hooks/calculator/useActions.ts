
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

  const loadTestData = () => {
    // Save current basic info
    const companyName = localStorage.getItem('companyName') || '';
    const creditCode = localStorage.getItem('creditCode') || '';
    const contactPerson = localStorage.getItem('contactPerson') || '';
    const contactPhone = localStorage.getItem('contactPhone') || '';
    
    // Set test data in localStorage
    localStorage.setItem('companyName', companyName || '测试科技有限公司');
    localStorage.setItem('creditCode', creditCode || '91310000XXXXXXXXXX');
    localStorage.setItem('contactPerson', contactPerson || '张经理');
    localStorage.setItem('contactPhone', contactPhone || '13800138000');
    
    // Set enterprise info
    localStorage.setItem('isHighTechEnterprise', 'true');
    localStorage.setItem('totalAssets', '1200000');
    localStorage.setItem('employeeCount', '25');
    
    // Set revenue and expenses
    localStorage.setItem('totalRevenue', '1850000');
    localStorage.setItem('invoicedRevenue', '1680000');
    localStorage.setItem('nonInvoicedRevenue', '170000');
    localStorage.setItem('totalExpenses', '1350000');
    localStorage.setItem('invoicedExpenses', '1180000');
    localStorage.setItem('nonInvoicedExpenses', '170000');
    localStorage.setItem('personalTax', '56000');
    localStorage.setItem('socialSecurity', '78000');
    localStorage.setItem('depreciation', '42000');
    localStorage.setItem('otherExpenses', '35000');
    
    // Set tax adjustments
    localStorage.setItem('entertainmentExpenses', '65000');
    localStorage.setItem('insuranceExpenses', '21000');
    localStorage.setItem('rdExpenses', '120000');
    localStorage.setItem('advertisingExpenses', '43000');
    localStorage.setItem('educationExpenses', '16000');
    localStorage.setItem('welfareExpenses', '32000');
    localStorage.setItem('nonDeductibleExpenses', '18000');
    
    // Set tax summary
    localStorage.setItem('actualTax', '35000');
    
    // Set tax difference factors (using JSON string)
    const taxDifferenceFactors = [
      { id: '1', description: '研发费用加计扣除', amount: 36000 },
      { id: '2', description: '高新技术企业优惠', amount: 16500 }
    ];
    localStorage.setItem('taxDifferenceFactors', JSON.stringify(taxDifferenceFactors));
    
    // Flag to indicate we're loading test data
    localStorage.setItem('isLoadingTestData', 'true');
    
    // Reload the page to apply test data
    window.location.reload();
    
    toast({
      title: "测试数据已加载",
      description: "企业所得税计算器测试数据已成功加载",
      variant: "default",
    });
  };

  return {
    handleReset,
    loadTestData
  };
};
