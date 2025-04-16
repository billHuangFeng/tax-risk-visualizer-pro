
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

  // Load values from localStorage on component mount
  useEffect(() => {
    const isLoadingTestData = localStorage.getItem('isLoadingTestData') === 'true';
    
    if (isLoadingTestData) {
      setTotalRevenue(localStorage.getItem('totalRevenue') || '');
      setInvoicedRevenue(localStorage.getItem('invoicedRevenue') || '');
      setNonInvoicedRevenue(localStorage.getItem('nonInvoicedRevenue') || '');
      setTotalExpenses(localStorage.getItem('totalExpenses') || '');
      setInvoicedExpenses(localStorage.getItem('invoicedExpenses') || '');
      setNonInvoicedExpenses(localStorage.getItem('nonInvoicedExpenses') || '');
      setPersonalTax(localStorage.getItem('personalTax') || '');
      setSocialSecurity(localStorage.getItem('socialSecurity') || '');
      setDepreciation(localStorage.getItem('depreciation') || '');
      setOtherExpenses(localStorage.getItem('otherExpenses') || '');
    }
  }, []);
  
  // Add event listener for storage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const isLoadingTestData = localStorage.getItem('isLoadingTestData') === 'true';
      
      if (isLoadingTestData) {
        setTotalRevenue(localStorage.getItem('totalRevenue') || '');
        setInvoicedRevenue(localStorage.getItem('invoicedRevenue') || '');
        setNonInvoicedRevenue(localStorage.getItem('nonInvoicedRevenue') || '');
        setTotalExpenses(localStorage.getItem('totalExpenses') || '');
        setInvoicedExpenses(localStorage.getItem('invoicedExpenses') || '');
        setNonInvoicedExpenses(localStorage.getItem('nonInvoicedExpenses') || '');
        setPersonalTax(localStorage.getItem('personalTax') || '');
        setSocialSecurity(localStorage.getItem('socialSecurity') || '');
        setDepreciation(localStorage.getItem('depreciation') || '');
        setOtherExpenses(localStorage.getItem('otherExpenses') || '');
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
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
