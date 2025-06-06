
import { useState, useEffect } from 'react';

export const useBasicInfo = () => {
  const [companyName, setCompanyName] = useState('');
  const [creditCode, setCreditCode] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [isExcludedIndustry, setIsExcludedIndustry] = useState(false);
  const [isHighTechEnterprise, setIsHighTechEnterprise] = useState(false);
  const [totalAssets, setTotalAssets] = useState('');
  const [employeeCount, setEmployeeCount] = useState('');

  // Load basic info from localStorage when the component mounts
  useEffect(() => {
    // Load saved basic info
    const savedCompanyName = localStorage.getItem('companyName');
    const savedCreditCode = localStorage.getItem('creditCode');
    const savedContactPerson = localStorage.getItem('contactPerson');
    const savedContactPhone = localStorage.getItem('contactPhone');
    
    // Set company info if available
    if (savedCompanyName) setCompanyName(savedCompanyName);
    if (savedCreditCode) setCreditCode(savedCreditCode);
    if (savedContactPerson) setContactPerson(savedContactPerson);
    if (savedContactPhone) setContactPhone(savedContactPhone);
    
    // Check if we're loading test data
    const isLoadingTestData = localStorage.getItem('isLoadingTestData') === 'true';
    
    if (isLoadingTestData) {
      const isHighTech = localStorage.getItem('isHighTechEnterprise') === 'true';
      setIsHighTechEnterprise(isHighTech);
      setTotalAssets(localStorage.getItem('totalAssets') || '');
      setEmployeeCount(localStorage.getItem('employeeCount') || '');
    }
  }, []);

  // Add event listener for storage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const isLoadingTestData = localStorage.getItem('isLoadingTestData') === 'true';
      
      if (isLoadingTestData) {
        const isHighTech = localStorage.getItem('isHighTechEnterprise') === 'true';
        setIsHighTechEnterprise(isHighTech);
        setTotalAssets(localStorage.getItem('totalAssets') || '');
        setEmployeeCount(localStorage.getItem('employeeCount') || '');
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Save basic info to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('companyName', companyName);
    localStorage.setItem('creditCode', creditCode);
    localStorage.setItem('contactPerson', contactPerson);
    localStorage.setItem('contactPhone', contactPhone);
  }, [companyName, creditCode, contactPerson, contactPhone]);

  return {
    companyName,
    setCompanyName,
    creditCode,
    setCreditCode,
    contactPerson,
    setContactPerson,
    contactPhone,
    setContactPhone,
    isExcludedIndustry,
    setIsExcludedIndustry,
    isHighTechEnterprise,
    setIsHighTechEnterprise,
    totalAssets,
    setTotalAssets,
    employeeCount,
    setEmployeeCount,
  };
};
