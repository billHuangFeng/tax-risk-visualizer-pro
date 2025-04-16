
import { useState, useEffect } from 'react';
import { useBasicInfo } from '@/contexts/BasicInfoContext';

export const useVatBasicInfo = () => {
  // Use the shared context for basic info across calculators
  const contextBasicInfo = useBasicInfo();
  
  // Initialize with values from context
  const [companyName, setCompanyName] = useState<string>(contextBasicInfo.companyName || '');
  const [creditCode, setCreditCode] = useState<string>(contextBasicInfo.creditCode || '');
  const [contactPerson, setContactPerson] = useState<string>(contextBasicInfo.contactPerson || '');
  const [contactPhone, setContactPhone] = useState<string>(contextBasicInfo.contactPhone || '');
  
  // Sync with context when it changes
  useEffect(() => {
    setCompanyName(contextBasicInfo.companyName);
    setCreditCode(contextBasicInfo.creditCode);
    setContactPerson(contextBasicInfo.contactPerson);
    setContactPhone(contextBasicInfo.contactPhone);
  }, [contextBasicInfo.companyName, contextBasicInfo.creditCode, 
      contextBasicInfo.contactPerson, contextBasicInfo.contactPhone]);
  
  // Update context when local state changes
  useEffect(() => {
    contextBasicInfo.setCompanyName(companyName);
  }, [companyName]);
  
  useEffect(() => {
    contextBasicInfo.setCreditCode(creditCode);
  }, [creditCode]);
  
  useEffect(() => {
    contextBasicInfo.setContactPerson(contactPerson);
  }, [contactPerson]);
  
  useEffect(() => {
    contextBasicInfo.setContactPhone(contactPhone);
  }, [contactPhone]);
  
  return {
    companyName,
    setCompanyName,
    creditCode,
    setCreditCode,
    contactPerson,
    setContactPerson,
    contactPhone,
    setContactPhone,
  };
};
