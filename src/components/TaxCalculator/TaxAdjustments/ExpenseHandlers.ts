
interface ExpenseValues {
  actual: string;
  deductible: string;
  adjustment: string;
}

interface ExpenseCalculationParams {
  revenue: string;
  personalTax: string;
}

export const handleRdExpenses = (value: string, currentValues: ExpenseValues, isExcludedIndustry: boolean): ExpenseValues => {
  const actualValue = parseFloat(value) || 0;
  const multiplier = isExcludedIndustry ? 2 : 1;
  const deductibleAmount = actualValue * multiplier;
  
  return {
    actual: value,
    deductible: deductibleAmount.toFixed(2),
    adjustment: ((multiplier - 1) * actualValue).toFixed(2),
  };
};

export const handleEntertainmentExpenses = (
  value: string, 
  currentValues: ExpenseValues, 
  isExcludedIndustry: boolean,
  params: ExpenseCalculationParams
): ExpenseValues => {
  const actualValue = parseFloat(value) || 0;
  const revenue = parseFloat(params.revenue) || 0;
  
  // 可抵除 = min(实际发生 × 60%, 销售收入 × 0.5%)
  const maxByRevenue = revenue * 0.005; // 0.5% of revenue
  const maxByExpense = actualValue * 0.6; // 60% of actual expense
  const deductibleAmount = Math.min(maxByRevenue, maxByExpense);
  
  return {
    actual: value,
    deductible: deductibleAmount.toFixed(2),
    adjustment: (-Math.max(0, actualValue - deductibleAmount)).toFixed(2),
  };
};

export const handleAdvertisingExpenses = (
  value: string,
  currentValues: ExpenseValues,
  isExcludedIndustry: boolean,
  params: ExpenseCalculationParams
): ExpenseValues => {
  const actualValue = parseFloat(value) || 0;
  const revenue = parseFloat(params.revenue) || 0;
  
  // 可抵除 = min(实际发生, 销售收入 × 15%)
  const maxDeductible = revenue * 0.15;
  const deductibleAmount = Math.min(actualValue, maxDeductible);
  
  return {
    actual: value,
    deductible: deductibleAmount.toFixed(2),
    adjustment: (-Math.max(0, actualValue - deductibleAmount)).toFixed(2),
  };
};

export const handleEducationExpenses = (
  value: string,
  currentValues: ExpenseValues,
  isExcludedIndustry: boolean,
  params: ExpenseCalculationParams
): ExpenseValues => {
  const actualValue = parseFloat(value) || 0;
  const personalTax = parseFloat(params.personalTax) || 0;
  
  // 可抵除 = min(实际发生, 已申报个税的薪资 × 8%)
  const maxDeductible = personalTax * 0.08;
  const deductibleAmount = Math.min(actualValue, maxDeductible);
  
  return {
    actual: value,
    deductible: deductibleAmount.toFixed(2),
    adjustment: (-Math.max(0, actualValue - deductibleAmount)).toFixed(2),
  };
};

export const handleWelfareExpenses = (
  value: string,
  currentValues: ExpenseValues,
  isExcludedIndustry: boolean,
  params: ExpenseCalculationParams
): ExpenseValues => {
  const actualValue = parseFloat(value) || 0;
  const personalTax = parseFloat(params.personalTax) || 0;
  
  // 可抵除 = min(实际发生, 已申报个税的薪资 × 14%)
  const maxDeductible = personalTax * 0.14;
  const deductibleAmount = Math.min(actualValue, maxDeductible);
  
  return {
    actual: value,
    deductible: deductibleAmount.toFixed(2),
    adjustment: (-Math.max(0, actualValue - deductibleAmount)).toFixed(2),
  };
};

export const handleInsuranceExpenses = (
  value: string,
  currentValues: ExpenseValues,
  isExcludedIndustry: boolean,
  params: ExpenseCalculationParams
): ExpenseValues => {
  const actualValue = parseFloat(value) || 0;
  const personalTax = parseFloat(params.personalTax) || 0;
  
  // 可抵除 = min(实际发生, 已申报个税的薪资 × 5%)
  const maxDeductible = personalTax * 0.05;
  const deductibleAmount = Math.min(actualValue, maxDeductible);
  
  return {
    actual: value,
    deductible: deductibleAmount.toFixed(2),
    adjustment: (-Math.max(0, actualValue - deductibleAmount)).toFixed(2),
  };
};
