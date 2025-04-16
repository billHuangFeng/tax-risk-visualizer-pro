
import { useEffect } from 'react';
import { useToast } from './use-toast';
import { useVatBasicInfo } from './vat/useVatBasicInfo';
import { useVatSales } from './vat/useVatSales';
import { useVatPurchases } from './vat/useVatPurchases';
import { useVatDifferences } from './vat/useVatDifferences';
import { useVatTax } from './vat/useVatTax';
import type { VatSalesItem, VatPurchaseItem, DifferenceFactor, DifferenceExplanation } from './types';

export type { VatSalesItem, VatPurchaseItem, DifferenceFactor, DifferenceExplanation };

export const useVatCalculator = () => {
  const { toast } = useToast();
  const basicInfo = useVatBasicInfo();
  const sales = useVatSales();
  const purchases = useVatPurchases();
  const differences = useVatDifferences();
  const tax = useVatTax();

  // Calculate sales totals
  useEffect(() => {
    const totalAmount = sales.salesData.reduce((sum, item) => sum + item.salesAmount, 0);
    const totalTax = sales.salesData.reduce((sum, item) => sum + item.outputTax, 0);
    sales.setSalesTotal({ amount: totalAmount, tax: totalTax });
  }, [sales.salesData]);

  // Calculate purchases totals
  useEffect(() => {
    const totalAmount = purchases.purchasesData.reduce((sum, item) => sum + item.purchaseAmount, 0);
    const totalTax = purchases.purchasesData.reduce((sum, item) => sum + item.inputTax, 0);
    purchases.setPurchasesTotal({ amount: totalAmount, tax: totalTax });
  }, [purchases.purchasesData]);

  // Calculate payable tax
  useEffect(() => {
    const calculatedPayableTax = sales.salesTotal.tax - purchases.purchasesTotal.tax;
    tax.setPayableTax(calculatedPayableTax);
  }, [sales.salesTotal.tax, purchases.purchasesTotal.tax]);

  // Calculate tax difference and risk level
  useEffect(() => {
    const difference = tax.actualTax - tax.payableTax;
    tax.setTaxDifference(difference);
    
    // 计算差异幅度百分比：(实缴增值税 - 应交增值税) / 应交增值税 * 100
    const differencePercentage = tax.payableTax !== 0 
      ? ((tax.actualTax - tax.payableTax) / Math.abs(tax.payableTax)) * 100 
      : 0;
    
    tax.setTaxDifferencePercentage(parseFloat(differencePercentage.toFixed(2)));
  }, [tax.payableTax, tax.actualTax]);

  // Calculate unexplained difference
  useEffect(() => {
    const explainedAmount = differences.taxDifferenceFactors.reduce(
      (sum, factor) => sum + factor.amount, 
      0
    );
    
    const unexplained = tax.taxDifference - explainedAmount;
    tax.setUnexplainedDifference(unexplained);
  }, [tax.taxDifference, differences.taxDifferenceFactors]);

  // Update risk level based on risk percentage
  useEffect(() => {
    // 根据风险百分比确定风险等级
    let riskLevel = '';
    if (tax.riskPercentage > 50) {
      riskLevel = '风险非常高';
    } else if (tax.riskPercentage > 20) {
      riskLevel = '风险比较高';
    } else if (tax.riskPercentage > 10) {
      riskLevel = '存在风险';
    } else {
      riskLevel = '基本安全';
    }
    
    tax.setRiskLevel(riskLevel);
    
    // 如果有未解释差异但百分比较低，至少标记为"存在风险"
    if (Math.abs(tax.unexplainedDifference) > 0 && Math.abs(tax.riskPercentage) <= 10) {
      tax.setRiskLevel('存在风险');
    }
  }, [tax.riskPercentage, tax.unexplainedDifference]);

  // Clear all data except basic info
  const resetData = () => {
    // Reset data except basic info
    sales.setSalesData([
      { id: '1', productName: '产品类别1', salesAmount: 0, vatRate: 13, outputTax: 0 }
    ]);
    sales.setSalesTotal({ amount: 0, tax: 0 });
    sales.setBankSalesAmount(0);
    
    purchases.setPurchasesData([
      { id: '1', productName: '采购物料或服务1', purchaseAmount: 0, vatRate: 13, inputTax: 0 }
    ]);
    purchases.setPurchasesTotal({ amount: 0, tax: 0 });
    purchases.setBankPurchasesAmount(0);
    
    tax.setActualTax(0);
    tax.setPayableTax(0);
    tax.setTaxDifference(0);
    tax.setTaxDifferencePercentage(0);
    tax.setRiskPercentage(0);
    tax.setUnexplainedDifference(0);
    tax.setRiskLevel('基本安全');
    
    differences.setTaxDifferenceFactors([
      { id: '1', description: '差异原因1', amount: 0 }
    ]);
    
    differences.setSalesDifferenceExplanations([
      { id: '1', reason: '', amount: 0 }
    ]);
    
    differences.setPurchasesDifferenceExplanations([
      { id: '1', reason: '', amount: 0 }
    ]);
  };

  // Load test data for VAT calculator
  const loadTestData = () => {
    // Test data for sales
    sales.setSalesData([
      { id: '1', productName: '产品A - 标准税率', salesAmount: 85000, vatRate: 13, outputTax: 11050 },
      { id: '2', productName: '产品B - 低税率', salesAmount: 42000, vatRate: 9, outputTax: 3780 },
      { id: '3', productName: '服务C - 低税率', salesAmount: 26500, vatRate: 6, outputTax: 1590 }
    ]);
    sales.setBankSalesAmount(150000);
    
    // Test data for purchases
    purchases.setPurchasesData([
      { id: '1', productName: '原材料采购', purchaseAmount: 53000, vatRate: 13, inputTax: 6890 },
      { id: '2', productName: '设备采购', purchaseAmount: 35000, vatRate: 13, inputTax: 4550 },
      { id: '3', productName: '办公用品', purchaseAmount: 8500, vatRate: 9, inputTax: 765 }
    ]);
    purchases.setBankPurchasesAmount(92000);
    
    // Set actual tax and difference factors
    tax.setActualTax(4000);
    
    differences.setTaxDifferenceFactors([
      { id: '1', description: '上期留抵税额', amount: 1200 },
      { id: '2', description: '不可抵扣进项税额', amount: -320 }
    ]);
    
    // Set difference explanations
    differences.setSalesDifferenceExplanations([
      { id: '1', reason: '下一期收款', amount: 5200 },
      { id: '2', reason: '未开票收入', amount: 3100 }
    ]);
    
    differences.setPurchasesDifferenceExplanations([
      { id: '1', reason: '上期采购本期付款', amount: 4500 }
    ]);
    
    toast({
      title: "测试数据已加载",
      description: "增值税计算器测试数据已成功加载",
      variant: "default",
    });
  };

  const handleReset = () => {
    if (confirm('确定要重置所有数据吗？')) {
      // Save current basic info before reset
      const companyName = basicInfo.companyName;
      const creditCode = basicInfo.creditCode;
      const contactPerson = basicInfo.contactPerson;
      const contactPhone = basicInfo.contactPhone;
      
      // Reset all data
      resetData();
      
      // Restore basic info
      basicInfo.setCompanyName(companyName);
      basicInfo.setCreditCode(creditCode);
      basicInfo.setContactPerson(contactPerson);
      basicInfo.setContactPhone(contactPhone);
      
      toast({
        title: "表单已重置",
        description: "您已成功重置增值税计算器数据",
        variant: "default",
      });
    }
  };

  return {
    ...basicInfo,
    ...sales,
    ...purchases,
    ...differences,
    ...tax,
    handleReset,
    loadTestData
  };
};
