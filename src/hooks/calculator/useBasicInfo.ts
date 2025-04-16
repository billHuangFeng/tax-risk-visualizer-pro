
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
    // Check if we're coming from a reset
    const isResetting = localStorage.getItem('isResetting') === 'true';
    
    if (isResetting) {
      // Clear the reset flag
      localStorage.setItem('isResetting', 'false');
      
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
    }
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
