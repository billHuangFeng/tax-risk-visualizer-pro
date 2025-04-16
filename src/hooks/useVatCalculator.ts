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
    // Calculate total explained difference from both sales and purchases difference factors
    const salesExplainedAmount = differences.salesDifferenceFactors.reduce(
      (sum, factor) => sum + factor.amount, 
      0
    );
    
    const purchasesExplainedAmount = differences.purchasesDifferenceFactors.reduce(
      (sum, factor) => sum + factor.amount, 
      0
    );
    
    // Calculate total unexplained difference
    const unexplained = tax.taxDifference - (salesExplainedAmount + purchasesExplainedAmount);
    tax.setUnexplainedDifference(unexplained);
    
    // Calculate sales unexplained difference percentage
    const salesTotalWithTax = sales.salesTotal.amount + sales.salesTotal.tax;
    const salesDifference = salesTotalWithTax - sales.bankSalesAmount;
    const salesUnexplainedDifference = salesDifference - differences.salesExplainedDifferenceTotal;
    const salesUnexplainedPercentage = salesTotalWithTax !== 0 
      ? (Math.abs(salesUnexplainedDifference) / salesTotalWithTax) * 100 
      : 0;
    
    // Calculate purchases unexplained difference percentage
    const purchasesTotalWithTax = purchases.purchasesTotal.amount + purchases.purchasesTotal.tax;
    const purchasesDifference = purchasesTotalWithTax - purchases.bankPurchasesAmount;
    const purchasesUnexplainedDifference = purchasesDifference - differences.purchasesExplainedDifferenceTotal;
    const purchasesUnexplainedPercentage = purchasesTotalWithTax !== 0 
      ? (Math.abs(purchasesUnexplainedDifference) / purchasesTotalWithTax) * 100 
      : 0;
    
    // Risk assessment logic based on specified criteria
    if (
      salesUnexplainedPercentage > 30 || 
      purchasesUnexplainedPercentage > 30 ||
      (Math.abs(unexplained) > sales.salesTotal.tax * 0.1)
    ) {
      tax.setRiskLevel('风险非常高');
    }
    else if (
      (salesUnexplainedPercentage > 10 && salesUnexplainedPercentage <= 30) ||
      (purchasesUnexplainedPercentage > 10 && purchasesUnexplainedPercentage <= 30) ||
      (Math.abs(unexplained) > Math.abs(tax.payableTax) * 0.3)
    ) {
      tax.setRiskLevel('风险较高');
    }
    else if (Math.abs(unexplained) > Math.abs(tax.payableTax) * 0.1) {
      tax.setRiskLevel('风险中等');
    }
    else {
      tax.setRiskLevel('风险较低');
    }
  }, [
    tax.taxDifference,
    differences.salesDifferenceFactors,
    differences.purchasesDifferenceFactors,
    differences.salesExplainedDifferenceTotal,
    differences.purchasesExplainedDifferenceTotal,
    tax.payableTax,
    sales.salesTotal,
    purchases.purchasesTotal,
    sales.bankSalesAmount,
    purchases.bankPurchasesAmount
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
    
    // Reset difference factors for both sales and purchases
    differences.setSalesDifferenceFactors([
      { id: '1', description: '销售差异原因1', amount: 0 }
    ]);
    differences.setPurchasesDifferenceFactors([
      { id: '1', description: '采购差异原因1', amount: 0 }
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
