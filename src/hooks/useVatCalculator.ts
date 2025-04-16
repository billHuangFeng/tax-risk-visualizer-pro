
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

  // Calculate tax difference
  useEffect(() => {
    const difference = tax.payableTax - tax.actualTax;
    tax.setTaxDifference(difference);
    
    const percentage = tax.payableTax !== 0 
      ? (Math.abs(difference) / Math.abs(tax.payableTax)) * 100 
      : 0;
    tax.setTaxDifferencePercentage(parseFloat(percentage.toFixed(0)));
  }, [tax.payableTax, tax.actualTax]);

  // Calculate unexplained difference and risk level
  useEffect(() => {
    const explainedAmount = differences.differenceFactors.reduce((sum, factor) => sum + factor.amount, 0);
    const unexplained = tax.taxDifference - explainedAmount;
    tax.setUnexplainedDifference(unexplained);
    
    // Calculate sales unexplained difference percentage
    const salesTotalWithTax = sales.salesTotal.amount + sales.salesTotal.tax;
    const salesDifference = salesTotalWithTax - sales.bankSalesAmount;
    const salesExplainedDifference = differences.differenceExplanations.reduce((sum, exp) => sum + exp.amount, 0);
    const salesUnexplainedDifference = salesDifference - salesExplainedDifference;
    const salesUnexplainedPercentage = salesTotalWithTax !== 0 
      ? (Math.abs(salesUnexplainedDifference) / salesTotalWithTax) * 100 
      : 0;
    
    // Calculate purchases unexplained difference percentage
    const purchasesTotalWithTax = purchases.purchasesTotal.amount + purchases.purchasesTotal.tax;
    const purchasesDifference = purchasesTotalWithTax - purchases.bankPurchasesAmount;
    const purchasesExplainedDifference = differences.differenceExplanations.reduce((sum, exp) => sum + exp.amount, 0);
    const purchasesUnexplainedDifference = purchasesDifference - purchasesExplainedDifference;
    const purchasesUnexplainedPercentage = purchasesTotalWithTax !== 0 
      ? (Math.abs(purchasesUnexplainedDifference) / purchasesTotalWithTax) * 100 
      : 0;
    
    // New risk assessment logic based on specified criteria
    // 1. Very high risk criteria
    if (
      salesUnexplainedPercentage > 30 || 
      purchasesUnexplainedPercentage > 30 ||
      (Math.abs(unexplained) > sales.salesTotal.tax * 0.1)
    ) {
      tax.setRiskLevel('风险非常高');
    }
    // 2. High risk criteria
    else if (
      (salesUnexplainedPercentage > 10 && salesUnexplainedPercentage <= 30) ||
      (purchasesUnexplainedPercentage > 10 && purchasesUnexplainedPercentage <= 30) ||
      (Math.abs(unexplained) > Math.abs(tax.payableTax) * 0.3)
    ) {
      tax.setRiskLevel('风险较高');
    }
    // 3. Medium risk
    else if (Math.abs(unexplained) > Math.abs(tax.payableTax) * 0.1) {
      tax.setRiskLevel('风险中等');
    }
    // 4. Low risk
    else {
      tax.setRiskLevel('风险较低');
    }
  }, [
    tax.taxDifference, 
    differences.differenceFactors, 
    tax.payableTax, 
    sales.salesTotal, 
    purchases.purchasesTotal,
    sales.bankSalesAmount,
    purchases.bankPurchasesAmount,
    differences.differenceExplanations
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
    differences.setDifferenceFactors([
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
