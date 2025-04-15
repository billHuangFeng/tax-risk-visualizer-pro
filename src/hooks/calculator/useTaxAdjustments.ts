
import { useState } from 'react';

export const useTaxAdjustments = () => {
  const [rdExpenses, setRdExpenses] = useState({
    actual: '2000',
    deductible: '4000.00',
    adjustment: '-2000.00', // Corrected value based on actual - deductible
  });
  
  const [entertainmentExpenses, setEntertainmentExpenses] = useState({
    actual: '30',
    deductible: '15.00',
    adjustment: '15.00', // Corrected value
  });
  
  const [advertisingExpenses, setAdvertisingExpenses] = useState({
    actual: '340',
    deductible: '340.00',
    adjustment: '0.00',
  });
  
  const [educationExpenses, setEducationExpenses] = useState({
    actual: '6',
    deductible: '6.00',
    adjustment: '0.00',
  });
  
  const [welfareExpenses, setWelfareExpenses] = useState({
    actual: '20',
    deductible: '20.00',
    adjustment: '0.00',
  });
  
  const [insuranceExpenses, setInsuranceExpenses] = useState({
    actual: '7',
    deductible: '0.00',
    adjustment: '7.00', // Corrected value
  });
  
  const [totalAdjustment, setTotalAdjustment] = useState('-1978.00'); // Corrected total

  return {
    rdExpenses,
    setRdExpenses,
    entertainmentExpenses,
    setEntertainmentExpenses,
    advertisingExpenses,
    setAdvertisingExpenses,
    educationExpenses,
    setEducationExpenses,
    welfareExpenses,
    setWelfareExpenses,
    insuranceExpenses,
    setInsuranceExpenses,
    totalAdjustment,
    setTotalAdjustment,
  };
};
