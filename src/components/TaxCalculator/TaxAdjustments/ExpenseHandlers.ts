interface ExpenseValues {
  actual: string;
  deductible: string;
  adjustment: string;
}

export const handleRdExpenses = (value: string, currentValues: ExpenseValues, isExcludedIndustry: boolean): ExpenseValues => {
  const actualValue = parseFloat(value) || 0;
  
  // If company can enjoy the deduction policy (isExcludedIndustry=true), 
  // then deductible amount = actual * 2 (200%)
  // If company cannot enjoy the deduction policy (isExcludedIndustry=false),
  // then deductible amount = actual (100%)
  const multiplier = isExcludedIndustry ? 2 : 1;
  
  return {
    actual: value,
    deductible: (actualValue * multiplier).toFixed(2),
    adjustment: '0.00',
  };
};

export const handleEntertainmentExpenses = (value: string, currentValues: ExpenseValues, isExcludedIndustry: boolean): ExpenseValues => {
  const actualValue = parseFloat(value) || 0;
  const limit = 15.00;
  return {
    actual: value,
    deductible: limit.toFixed(2),
    adjustment: actualValue > limit ? `-${(actualValue - limit).toFixed(2)}` : '0.00',
  };
};

export const handleGeneralExpenses = (value: string, currentValues: ExpenseValues, isExcludedIndustry: boolean): ExpenseValues => {
  const actualValue = parseFloat(value) || 0;
  return {
    actual: value,
    deductible: actualValue.toFixed(2),
    adjustment: '0.00',
  };
};

export const handleInsuranceExpenses = (value: string, currentValues: ExpenseValues, isExcludedIndustry: boolean): ExpenseValues => {
  const actualValue = parseFloat(value) || 0;
  return {
    actual: value,
    deductible: '0.00',
    adjustment: `-${actualValue.toFixed(2)}`,
  };
};
