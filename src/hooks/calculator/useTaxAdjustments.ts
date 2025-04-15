
import { useState, useEffect } from 'react';

export const useTaxAdjustments = () => {
  const [rdExpenses, setRdExpenses] = useState({
    actual: '2000',
    deductible: '2000.00',
    adjustment: '0.00',
  });
  
  const [entertainmentExpenses, setEntertainmentExpenses] = useState({
    actual: '30',
    deductible: '15.00',
    adjustment: '15.00',
  });
  
  const [advertisingExpenses, setAdvertisingExpenses] = useState({
    actual: '840',
    deductible: '450.00',
    adjustment: '390.00',
  });
  
  const [educationExpenses, setEducationExpenses] = useState({
    actual: '126',
    deductible: '16.00',
    adjustment: '110.00',
  });
  
  const [welfareExpenses, setWelfareExpenses] = useState({
    actual: '1220',
    deductible: '28.00',
    adjustment: '1192.00',
  });
  
  const [insuranceExpenses, setInsuranceExpenses] = useState({
    actual: '1227',
    deductible: '10.00',
    adjustment: '1217.00',
  });
  
  const [totalAdjustment, setTotalAdjustment] = useState('2924.00');

  // Calculate total adjustment whenever any individual adjustment changes
  useEffect(() => {
    const calculateTotal = () => {
      const adjustments = [
        parseFloat(rdExpenses.adjustment) || 0,
        parseFloat(entertainmentExpenses.adjustment) || 0,
        parseFloat(advertisingExpenses.adjustment) || 0,
        parseFloat(educationExpenses.adjustment) || 0,
        parseFloat(welfareExpenses.adjustment) || 0,
        parseFloat(insuranceExpenses.adjustment) || 0
      ];
      
      const total = adjustments.reduce((sum, curr) => sum + curr, 0);
      setTotalAdjustment(total.toFixed(2));
    };

    calculateTotal();
  }, [
    rdExpenses.adjustment,
    entertainmentExpenses.adjustment,
    advertisingExpenses.adjustment,
    educationExpenses.adjustment,
    welfareExpenses.adjustment,
    insuranceExpenses.adjustment
  ]);

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
