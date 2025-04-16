
import React, { createContext, useContext, useState } from 'react';

interface BasicInfoContextType {
  companyName: string;
  setCompanyName: (value: string) => void;
  creditCode: string;
  setCreditCode: (value: string) => void;
  contactPerson: string;
  setContactPerson: (value: string) => void;
  contactPhone: string;
  setContactPhone: (value: string) => void;
}

const BasicInfoContext = createContext<BasicInfoContextType | undefined>(undefined);

export const BasicInfoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [companyName, setCompanyName] = useState('');
  const [creditCode, setCreditCode] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [contactPhone, setContactPhone] = useState('');

  return (
    <BasicInfoContext.Provider value={{
      companyName,
      setCompanyName,
      creditCode,
      setCreditCode,
      contactPerson,
      setContactPerson,
      contactPhone,
      setContactPhone,
    }}>
      {children}
    </BasicInfoContext.Provider>
  );
};

export const useBasicInfo = () => {
  const context = useContext(BasicInfoContext);
  if (context === undefined) {
    throw new Error('useBasicInfo must be used within a BasicInfoProvider');
  }
  return context;
};
