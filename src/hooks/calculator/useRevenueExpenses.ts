
import { useState, useEffect } from 'react';

export const useRevenueExpenses = () => {
  const [totalRevenue, setTotalRevenue] = useState('');
  const [invoicedRevenue, setInvoicedRevenue] = useState('');
  const [nonInvoicedRevenue, setNonInvoicedRevenue] = useState('');
  const [newInvoicedRevenue, setNewInvoicedRevenue] = useState('');
  
  const [totalExpenses, setTotalExpenses] = useState('');
  const [invoicedExpenses, setInvoicedExpenses] = useState('');
  const [nonInvoicedExpenses, setNonInvoicedExpenses] = useState('');
  const [personalTax, setPersonalTax] = useState('');
  const [socialSecurity, setSocialSecurity] = useState('');
  const [depreciation, setDepreciation] = useState('');
  const [otherExpenses, setOtherExpenses] = useState('');

  // Load test data if flag is set
  useEffect(() => {
    if (localStorage.getItem('isLoadingTestData') === 'true') {
      // Clear the flag
      localStorage.setItem('isLoadingTestData', 'false');
      
      // Load revenue data
      setTotalRevenue(localStorage.getItem('totalRevenue') || '');
      setInvoicedRevenue(localStorage.getItem('invoicedRevenue') || '');
      setNonInvoicedRevenue(localStorage.getItem('nonInvoicedRevenue') || '');
      
      // Load expenses data
      setTotalExpenses(localStorage.getItem('totalExpenses') || '');
      setInvoicedExpenses(localStorage.getItem('invoicedExpenses') || '');
      setNonInvoicedExpenses(localStorage.getItem('nonInvoicedExpenses') || '');
      setPersonalTax(localStorage.getItem('personalTax') || '');
      setSocialSecurity(localStorage.getItem('socialSecurity') || '');
      setDepreciation(localStorage.getItem('depreciation') || '');
      setOtherExpenses(localStorage.getItem('otherExpenses') || '');
    }
  }, []);

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
