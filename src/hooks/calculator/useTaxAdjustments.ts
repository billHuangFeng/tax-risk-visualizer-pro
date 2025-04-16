
import { useState, useEffect } from 'react';

// 测试数据 - 上线前请删除
const TEST_MODE = true; // 上线前设置为 false
const TEST_DATA = {
  rdExpenses: { actual: '150', deductible: '0', adjustment: '0' },
  entertainmentExpenses: { actual: '50', deductible: '0', adjustment: '0' },
  advertisingExpenses: { actual: '80', deductible: '0', adjustment: '0' },
  educationExpenses: { actual: '30', deductible: '0', adjustment: '0' },
  welfareExpenses: { actual: '40', deductible: '0', adjustment: '0' },
  insuranceExpenses: { actual: '25', deductible: '0', adjustment: '0' },
  nonDeductibleExpenses: { actual: '20', deductible: '0', adjustment: '0' }
};

export const useTaxAdjustments = () => {
  const [rdExpenses, setRdExpenses] = useState(TEST_MODE ? TEST_DATA.rdExpenses : {
    actual: '',
    deductible: '',
    adjustment: '',
  });
  
  const [entertainmentExpenses, setEntertainmentExpenses] = useState(TEST_MODE ? TEST_DATA.entertainmentExpenses : {
    actual: '',
    deductible: '',
    adjustment: '',
  });
  
  const [advertisingExpenses, setAdvertisingExpenses] = useState(TEST_MODE ? TEST_DATA.advertisingExpenses : {
    actual: '',
    deductible: '',
    adjustment: '',
  });
  
  const [educationExpenses, setEducationExpenses] = useState(TEST_MODE ? TEST_DATA.educationExpenses : {
    actual: '',
    deductible: '',
    adjustment: '',
  });
  
  const [welfareExpenses, setWelfareExpenses] = useState(TEST_MODE ? TEST_DATA.welfareExpenses : {
    actual: '',
    deductible: '',
    adjustment: '',
  });
  
  const [insuranceExpenses, setInsuranceExpenses] = useState(TEST_MODE ? TEST_DATA.insuranceExpenses : {
    actual: '',
    deductible: '',
    adjustment: '',
  });
  
  const [nonDeductibleExpenses, setNonDeductibleExpenses] = useState(TEST_MODE ? TEST_DATA.nonDeductibleExpenses : {
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
