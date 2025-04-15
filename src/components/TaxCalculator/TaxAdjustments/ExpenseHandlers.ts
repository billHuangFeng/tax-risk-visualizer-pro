interface ExpenseValues {
  actual: string;
  deductible: string;
  adjustment: string;
}

export const handleRdExpenses = (value: string, currentValues: ExpenseValues, isExcludedIndustry: boolean): ExpenseValues => {
  const actualValue = parseFloat(value) || 0;
  
  // isExcludedIndustry = true means the company CAN enjoy the R&D deduction policy
  // If the checkbox is checked (isExcludedIndustry = true), deductible should be 200% of actual
  // If the checkbox is not checked (isExcludedIndustry = false), deductible should be 100% of actual
  const multiplier = isExcludedIndustry ? 2 : 1;
  
  return {
    actual: value,
    deductible: (actualValue * multiplier).toFixed(2),
    adjustment: (actualValue * (multiplier - 1)).toFixed(2), // Calculate the adjustment based on the extra deduction
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
