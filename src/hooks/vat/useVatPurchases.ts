
import { useState, useCallback } from 'react';
import type { VatPurchaseItem } from '../types';

export const useVatPurchases = () => {
  const [purchasesData, setPurchasesData] = useState<VatPurchaseItem[]>([
    { id: '1', productName: '采购物料或服务1', purchaseAmount: 2400, vatRate: 13, inputTax: 312 },
    { id: '2', productName: '采购物料或服务2', purchaseAmount: 3000, vatRate: 6, inputTax: 180 },
    { id: '3', productName: '采购物料或服务3', purchaseAmount: 4000, vatRate: 13, inputTax: 520 },
    { id: '4', productName: '采购物料或服务4', purchaseAmount: 100, vatRate: 1, inputTax: 1 }
  ]);

  const [purchasesTotal, setPurchasesTotal] = useState({
    amount: 0,
    tax: 0
  });

  const [bankPurchasesAmount, setBankPurchasesAmount] = useState<number>(6000);

  const addPurchaseItem = useCallback(() => {
    const newId = (purchasesData.length + 1).toString();
    setPurchasesData([
      ...purchasesData,
      { id: newId, productName: `采购物料或服务${newId}`, purchaseAmount: 0, vatRate: 13, inputTax: 0 }
    ]);
  }, [purchasesData]);

  const updatePurchaseItem = useCallback((id: string, field: keyof VatPurchaseItem, value: any) => {
    setPurchasesData(prevData => {
      return prevData.map(item => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };
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

  return {
    purchasesData,
    setPurchasesData,
    purchasesTotal,
    setPurchasesTotal,
    bankPurchasesAmount,
    setBankPurchasesAmount,
    addPurchaseItem,
    updatePurchaseItem,
    removePurchaseItem
  };
};
