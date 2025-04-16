
import { useEffect } from 'react';
import { useToast } from './use-toast';
import { useVatBasicInfo } from './vat/useVatBasicInfo';
import { useVatSales } from './vat/useVatSales';
import { useVatPurchases } from './vat/useVatPurchases';
import { useVatDifferences } from './vat/useVatDifferences';
import { useVatTax } from './vat/useVatTax';
import { VatSalesItem, VatPurchaseItem, DifferenceFactor, DifferenceExplanation } from './types';

export {
  VatSalesItem,
  VatPurchaseItem,
  DifferenceFactor,
  DifferenceExplanation
};

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
    
    if (Math.abs(unexplained) > Math.abs(tax.payableTax) * 0.2) {
      tax.setRiskLevel('风险非常高');
    } else if (Math.abs(unexplained) > Math.abs(tax.payableTax) * 0.1) {
      tax.setRiskLevel('风险较高');
    } else if (Math.abs(unexplained) > Math.abs(tax.payableTax) * 0.05) {
      tax.setRiskLevel('风险较低');
    } else {
      tax.setRiskLevel('风险较低');
    }
  }, [tax.taxDifference, differences.differenceFactors, tax.payableTax]);

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
