
import { useState, useCallback } from 'react';
import type { VatSalesItem } from '../types';

export const useVatSales = () => {
  const [salesData, setSalesData] = useState<VatSalesItem[]>([
    { id: '1', productName: '产品类别1', salesAmount: 3000, vatRate: 13, outputTax: 390 },
    { id: '2', productName: '产品类别2', salesAmount: 2000, vatRate: 9, outputTax: 180 },
    { id: '3', productName: '产品类别3', salesAmount: 4500, vatRate: 6, outputTax: 270 },
    { id: '4', productName: '产品类别4', salesAmount: 120, vatRate: 6, outputTax: 7.2 }
  ]);

  const [salesTotal, setSalesTotal] = useState({
    amount: 0,
    tax: 0
  });

  const [bankSalesAmount, setBankSalesAmount] = useState<number>(12000);

  const addSalesItem = useCallback(() => {
    const newId = (salesData.length + 1).toString();
    setSalesData([
      ...salesData,
      { id: newId, productName: `产品类别${newId}`, salesAmount: 0, vatRate: 13, outputTax: 0 }
    ]);
  }, [salesData]);

  const updateSalesItem = useCallback((id: string, field: keyof VatSalesItem, value: any) => {
    setSalesData(prevData => {
      return prevData.map(item => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };
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

  return {
    salesData,
    setSalesData,
    salesTotal,
    setSalesTotal,
    bankSalesAmount,
    setBankSalesAmount,
    addSalesItem,
    updateSalesItem,
    removeSalesItem
  };
};
