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
    const difference = tax.payableTax - tax.actualTax;
    tax.setTaxDifference(difference);
    
    // 使用应交增值税作为基数计算差异幅度
    const riskPercentage = tax.payableTax !== 0 
      ? (difference / tax.payableTax) * 100 
      : 0;
    
    tax.setTaxDifferencePercentage(parseFloat(riskPercentage.toFixed(2)));

    let riskLevel = '';
    if (Math.abs(riskPercentage) > 50) {
      riskLevel = '风险非常高';
    } else if (Math.abs(riskPercentage) > 20) {
      riskLevel = '风险比较高';
    } else if (Math.abs(riskPercentage) > 10) {
      riskLevel = '存在风险';
    } else {
      riskLevel = '基本安全';
    }
    
    tax.setRiskLevel(riskLevel);
  }, [tax.payableTax, tax.actualTax]);

  // Calculate unexplained difference
  useEffect(() => {
    const explainedAmount = differences.taxDifferenceFactors.reduce(
      (sum, factor) => sum + factor.amount, 
      0
    );
    
    const unexplained = tax.taxDifference - explainedAmount;
    tax.setUnexplainedDifference(unexplained);
    
    // 这段逻辑在上面的 useEffect 中已经实现了基于百分比的风险评估
    // 所以这里只处理特殊情况
    if (Math.abs(unexplained) > 0 && Math.abs(tax.taxDifferencePercentage) <= 10) {
      // 如果有未解释差异但百分比较低，至少标记为"存在风险"
      tax.setRiskLevel('存在风险');
    }
  }, [
    tax.taxDifference,
    differences.taxDifferenceFactors,
    tax.taxDifferencePercentage
  ]);

  const handleReset = () => {
    basicInfo.setCompanyName('');
    sales.setSalesData([
      { id: '1', productName: '产品类别1', salesAmount: 0, vatRate: 13, outputTax: 0 }
    ]);
    purchases.setPurchasesData([
      { id: '1', productName: '采购物料或服务1', purchaseAmount: 0, vatRate: 13, inputTax: 0 }
    ]);
    sales.setBankSalesAmount(0);
    purchases.setBankPurchasesAmount(0);
    tax.setActualTax(0);
    
    differences.setTaxDifferenceFactors([
      { id: '1', description: '差异原因1', amount: 0 }
    ]);
    
    toast({
      title: "表单已重置",
      description: "您已成功重置增值税计算器数据",
      variant: "default",
    });
  };

  return {
    ...basicInfo,
    ...sales,
    ...purchases,
    ...differences,
    ...tax,
    handleReset
  };
};
