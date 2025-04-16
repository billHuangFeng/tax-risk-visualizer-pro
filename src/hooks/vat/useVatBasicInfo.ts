
import { useState } from 'react';

export const useVatBasicInfo = () => {
  const [companyName, setCompanyName] = useState<string>('');
  const [creditCode, setCreditCode] = useState<string>('');
  const [contactPerson, setContactPerson] = useState<string>('');
  const [contactPhone, setContactPhone] = useState<string>('');
  
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
