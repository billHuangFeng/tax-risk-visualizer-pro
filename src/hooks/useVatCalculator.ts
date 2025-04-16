
import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface VatSalesItem {
  id: string;
  productName: string;
  salesAmount: number;
  vatRate: number;
  outputTax: number;
}

export interface VatPurchaseItem {
  id: string;
  productName: string;
  purchaseAmount: number;
  vatRate: number;
  inputTax: number;
}

export interface DifferenceFactor {
  id: string;
  description: string;
  amount: number;
}

export const useVatCalculator = () => {
  const { toast } = useToast();
  
  // Sales data
  const [salesData, setSalesData] = useState<VatSalesItem[]>([
    { id: '1', productName: '产品类别1', salesAmount: 3000, vatRate: 13, outputTax: 390 },
    { id: '2', productName: '产品类别2', salesAmount: 2000, vatRate: 9, outputTax: 180 },
    { id: '3', productName: '产品类别3', salesAmount: 4500, vatRate: 6, outputTax: 270 },
    { id: '4', productName: '产品类别4', salesAmount: 120, vatRate: 6, outputTax: 7.2 }
  ]);
  
  // Purchases data
  const [purchasesData, setPurchasesData] = useState<VatPurchaseItem[]>([
    { id: '1', productName: '采购物料或服务1', purchaseAmount: 2400, vatRate: 13, inputTax: 312 },
    { id: '2', productName: '采购物料或服务2', purchaseAmount: 3000, vatRate: 6, inputTax: 180 },
    { id: '3', productName: '采购物料或服务3', purchaseAmount: 4000, vatRate: 13, inputTax: 520 },
    { id: '4', productName: '采购物料或服务4', purchaseAmount: 100, vatRate: 1, inputTax: 1 }
  ]);
  
  // Bank transaction amounts
  const [bankSalesAmount, setBankSalesAmount] = useState<number>(12000);
  const [bankPurchasesAmount, setBankPurchasesAmount] = useState<number>(6000);
  
  // Actual tax and calculations
  const [actualTax, setActualTax] = useState<number>(200);
  const [differenceFactors, setDifferenceFactors] = useState<DifferenceFactor[]>([
    { id: '1', description: '差异原因1', amount: 100 },
    { id: '2', description: '差异原因2', amount: 130 },
    { id: '3', description: '差异原因3', amount: -140 }
  ]);
  
  // Calculated totals
  const [salesTotal, setSalesTotal] = useState({
    amount: 0,
    tax: 0
  });
  
  const [purchasesTotal, setPurchasesTotal] = useState({
    amount: 0,
    tax: 0
  });
  
  // Calculated tax values
  const [payableTax, setPayableTax] = useState<number>(0);
  const [taxDifference, setTaxDifference] = useState<number>(0);
  const [taxDifferencePercentage, setTaxDifferencePercentage] = useState<number>(0);
  const [unexplainedDifference, setUnexplainedDifference] = useState<number>(0);
  const [riskLevel, setRiskLevel] = useState<string>('');
  
  // Calculate sales totals
  useEffect(() => {
    const totalAmount = salesData.reduce((sum, item) => sum + item.salesAmount, 0);
    const totalTax = salesData.reduce((sum, item) => sum + item.outputTax, 0);
    
    setSalesTotal({
      amount: totalAmount,
      tax: totalTax
    });
  }, [salesData]);
  
  // Calculate purchases totals
  useEffect(() => {
    const totalAmount = purchasesData.reduce((sum, item) => sum + item.purchaseAmount, 0);
    const totalTax = purchasesData.reduce((sum, item) => sum + item.inputTax, 0);
    
    setPurchasesTotal({
      amount: totalAmount,
      tax: totalTax
    });
  }, [purchasesData]);
  
  // Calculate payable tax
  useEffect(() => {
    const calculatedPayableTax = salesTotal.tax - purchasesTotal.tax;
    setPayableTax(calculatedPayableTax);
  }, [salesTotal.tax, purchasesTotal.tax]);
  
  // Calculate tax difference
  useEffect(() => {
    const difference = payableTax - actualTax;
    setTaxDifference(difference);
    
    // Calculate percentage difference
    const percentage = payableTax !== 0 
      ? (Math.abs(difference) / Math.abs(payableTax)) * 100 
      : 0;
    setTaxDifferencePercentage(parseFloat(percentage.toFixed(0)));
  }, [payableTax, actualTax]);
  
  // Calculate unexplained difference and risk level
  useEffect(() => {
    const explainedAmount = differenceFactors.reduce((sum, factor) => sum + factor.amount, 0);
    const unexplained = taxDifference - explainedAmount;
    setUnexplainedDifference(unexplained);
    
    // Set risk level based on unexplained difference
    if (Math.abs(unexplained) > Math.abs(payableTax) * 0.2) {
      setRiskLevel('风险非常高');
    } else if (Math.abs(unexplained) > Math.abs(payableTax) * 0.1) {
      setRiskLevel('风险较高');
    } else if (Math.abs(unexplained) > Math.abs(payableTax) * 0.05) {
      setRiskLevel('风险中等');
    } else {
      setRiskLevel('风险较低');
    }
  }, [taxDifference, differenceFactors, payableTax]);
  
  // Sales data handlers
  const addSalesItem = useCallback(() => {
    const newId = (salesData.length + 1).toString();
    setSalesData([
      ...salesData,
      { 
        id: newId, 
        productName: `产品类别${newId}`, 
        salesAmount: 0, 
        vatRate: 13, 
        outputTax: 0 
      }
    ]);
  }, [salesData]);
  
  const updateSalesItem = useCallback((id: string, field: keyof VatSalesItem, value: any) => {
    setSalesData(prevData => {
      return prevData.map(item => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };
          
          // If salesAmount or vatRate changed, recalculate outputTax
          if (field === 'salesAmount' || field === 'vatRate') {
            updatedItem.outputTax = parseFloat((updatedItem.salesAmount * (updatedItem.vatRate / 100)).toFixed(2));
          }
          
          return updatedItem;
        }
        return item;
      });
    });
  }, []);
  
  const removeSalesItem = useCallback((id: string) => {
    setSalesData(prevData => prevData.filter(item => item.id !== id));
  }, []);
  
  // Purchases data handlers
  const addPurchaseItem = useCallback(() => {
    const newId = (purchasesData.length + 1).toString();
    setPurchasesData([
      ...purchasesData,
      { 
        id: newId, 
        productName: `采购物料或服务${newId}`, 
        purchaseAmount: 0, 
        vatRate: 13, 
        inputTax: 0 
      }
    ]);
  }, [purchasesData]);
  
  const updatePurchaseItem = useCallback((id: string, field: keyof VatPurchaseItem, value: any) => {
    setPurchasesData(prevData => {
      return prevData.map(item => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };
          
          // If purchaseAmount or vatRate changed, recalculate inputTax
          if (field === 'purchaseAmount' || field === 'vatRate') {
            updatedItem.inputTax = parseFloat((updatedItem.purchaseAmount * (updatedItem.vatRate / 100)).toFixed(2));
          }
          
          return updatedItem;
        }
        return item;
      });
    });
  }, []);
  
  const removePurchaseItem = useCallback((id: string) => {
    setPurchasesData(prevData => prevData.filter(item => item.id !== id));
  }, []);
  
  // Difference factors handlers
  const addDifferenceFactor = useCallback(() => {
    const newId = (differenceFactors.length + 1).toString();
    setDifferenceFactors([
      ...differenceFactors,
      { id: newId, description: `差异原因${newId}`, amount: 0 }
    ]);
  }, [differenceFactors]);
  
  const updateDifferenceFactor = useCallback((id: string, field: keyof DifferenceFactor, value: any) => {
    setDifferenceFactors(prevFactors => {
      return prevFactors.map(factor => {
        if (factor.id === id) {
          return { ...factor, [field]: value };
        }
        return factor;
      });
    });
  }, []);
  
  const removeDifferenceFactor = useCallback((id: string) => {
    setDifferenceFactors(prevFactors => prevFactors.filter(factor => factor.id !== id));
  }, []);
  
  // Reset calculator
  const handleReset = useCallback(() => {
    setSalesData([
      { id: '1', productName: '产品类别1', salesAmount: 0, vatRate: 13, outputTax: 0 }
    ]);
    setPurchasesData([
      { id: '1', productName: '采购物料或服务1', purchaseAmount: 0, vatRate: 13, inputTax: 0 }
    ]);
    setBankSalesAmount(0);
    setBankPurchasesAmount(0);
    setActualTax(0);
    setDifferenceFactors([
      { id: '1', description: '差异原因1', amount: 0 }
    ]);
    
    toast({
      title: "表单已重置",
      description: "您已成功重置增值税计算器数据",
      variant: "default",
    });
  }, [toast]);
  
  return {
    // Sales data
    salesData,
    addSalesItem,
    updateSalesItem,
    removeSalesItem,
    salesTotal,
    
    // Purchases data
    purchasesData,
    addPurchaseItem,
    updatePurchaseItem,
    removePurchaseItem,
    purchasesTotal,
    
    // Bank transaction amounts
    bankSalesAmount,
    setBankSalesAmount,
    bankPurchasesAmount,
    setBankPurchasesAmount,
    
    // Tax calculations
    payableTax,
    actualTax,
    setActualTax,
    taxDifference,
    taxDifferencePercentage,
    
    // Difference analysis
    differenceFactors,
    addDifferenceFactor,
    updateDifferenceFactor,
    removeDifferenceFactor,
    unexplainedDifference,
    riskLevel,
    
    // Actions
    handleReset
  };
};
