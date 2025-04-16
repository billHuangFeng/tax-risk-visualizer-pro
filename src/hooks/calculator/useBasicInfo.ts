
import { useState } from 'react';

export const useBasicInfo = () => {
  const [companyName, setCompanyName] = useState('');
  const [creditCode, setCreditCode] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [isExcludedIndustry, setIsExcludedIndustry] = useState(false);
  const [isHighTechEnterprise, setIsHighTechEnterprise] = useState(false);
  const [totalAssets, setTotalAssets] = useState('');
  const [employeeCount, setEmployeeCount] = useState('');

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
