
import { useState } from 'react';

// 测试数据 - 上线前请删除
const TEST_MODE = true; // 上线前设置为 false
const TEST_DATA = {
  totalRevenue: '1000',
  invoicedRevenue: '800',
  nonInvoicedRevenue: '100',
  newInvoicedRevenue: '100',
  totalExpenses: '600',
  invoicedExpenses: '400',
  nonInvoicedExpenses: '50',
  personalTax: '80',
  socialSecurity: '30',
  depreciation: '20',
  otherExpenses: '20'
};

export const useRevenueExpenses = () => {
  // 根据测试模式决定初始值
  const [totalRevenue, setTotalRevenue] = useState(TEST_MODE ? TEST_DATA.totalRevenue : '');
  const [invoicedRevenue, setInvoicedRevenue] = useState(TEST_MODE ? TEST_DATA.invoicedRevenue : '');
  const [nonInvoicedRevenue, setNonInvoicedRevenue] = useState(TEST_MODE ? TEST_DATA.nonInvoicedRevenue : '');
  const [newInvoicedRevenue, setNewInvoicedRevenue] = useState(TEST_MODE ? TEST_DATA.newInvoicedRevenue : '');
  
  const [totalExpenses, setTotalExpenses] = useState(TEST_MODE ? TEST_DATA.totalExpenses : '');
  const [invoicedExpenses, setInvoicedExpenses] = useState(TEST_MODE ? TEST_DATA.invoicedExpenses : '');
  const [nonInvoicedExpenses, setNonInvoicedExpenses] = useState(TEST_MODE ? TEST_DATA.nonInvoicedExpenses : '');
  const [personalTax, setPersonalTax] = useState(TEST_MODE ? TEST_DATA.personalTax : '');
  const [socialSecurity, setSocialSecurity] = useState(TEST_MODE ? TEST_DATA.socialSecurity : '');
  const [depreciation, setDepreciation] = useState(TEST_MODE ? TEST_DATA.depreciation : '');
  const [otherExpenses, setOtherExpenses] = useState(TEST_MODE ? TEST_DATA.otherExpenses : '');

  return {
    totalRevenue,
    setTotalRevenue,
    invoicedRevenue,
    setInvoicedRevenue,
    nonInvoicedRevenue,
    setNonInvoicedRevenue,
    newInvoicedRevenue,
    setNewInvoicedRevenue,
    totalExpenses,
    setTotalExpenses,
    invoicedExpenses,
    setInvoicedExpenses,
    nonInvoicedExpenses,
    setNonInvoicedExpenses,
    personalTax,
    setPersonalTax,
    socialSecurity,
    setSocialSecurity,
    depreciation,
    setDepreciation,
    otherExpenses,
    setOtherExpenses,
  };
};
