
import { useState } from 'react';

export const useRevenueExpenses = () => {
  const [totalRevenue, setTotalRevenue] = useState('3000');
  const [invoicedRevenue, setInvoicedRevenue] = useState('');
  const [nonInvoicedRevenue, setNonInvoicedRevenue] = useState('');
  const [newInvoicedRevenue, setNewInvoicedRevenue] = useState('');
  
  const [totalExpenses, setTotalExpenses] = useState('1000');
  const [invoicedExpenses, setInvoicedExpenses] = useState('');
  const [nonInvoicedExpenses, setNonInvoicedExpenses] = useState('');
  const [personalTax, setPersonalTax] = useState('200');
  const [socialSecurity, setSocialSecurity] = useState('');
  const [depreciation, setDepreciation] = useState('');
  const [otherExpenses, setOtherExpenses] = useState('800');

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
