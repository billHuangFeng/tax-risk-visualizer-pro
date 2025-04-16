
import { useState, useEffect } from 'react';

export const useTaxAdjustments = () => {
  const [rdExpenses, setRdExpenses] = useState({
    actual: '',
    deductible: '',
    adjustment: '',
  });
  
  const [entertainmentExpenses, setEntertainmentExpenses] = useState({
    actual: '',
    deductible: '',
    adjustment: '',
  });
  
  const [advertisingExpenses, setAdvertisingExpenses] = useState({
    actual: '',
    deductible: '',
    adjustment: '',
  });
  
  const [educationExpenses, setEducationExpenses] = useState({
    actual: '',
    deductible: '',
    adjustment: '',
  });
  
  const [welfareExpenses, setWelfareExpenses] = useState({
    actual: '',
    deductible: '',
    adjustment: '',
  });
  
  const [insuranceExpenses, setInsuranceExpenses] = useState({
    actual: '',
    deductible: '',
    adjustment: '',
  });
  
  const [nonDeductibleExpenses, setNonDeductibleExpenses] = useState({
    actual: '',
    deductible: '',
    adjustment: '',
  });
  
  const [totalAdjustment, setTotalAdjustment] = useState('');

  // Calculate total adjustment whenever any individual adjustment changes
  useEffect(() => {
    const calculateTotal = () => {
      const adjustments = [
        parseFloat(rdExpenses.adjustment) || 0,
        parseFloat(entertainmentExpenses.adjustment) || 0,
        parseFloat(advertisingExpenses.adjustment) || 0,
        parseFloat(educationExpenses.adjustment) || 0,
        parseFloat(welfareExpenses.adjustment) || 0,
        parseFloat(insuranceExpenses.adjustment) || 0,
        parseFloat(nonDeductibleExpenses.adjustment) || 0
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
    insuranceExpenses.adjustment,
    nonDeductibleExpenses.adjustment
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
    nonDeductibleExpenses,
    setNonDeductibleExpenses,
    totalAdjustment,
    setTotalAdjustment,
  };
};
