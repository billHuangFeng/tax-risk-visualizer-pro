
// Calculate total adjustments from entertainment, insurance, and R&D expenses
export const calculateTotalAdjustments = (
  entertainmentAdjustment: string,
  insuranceAdjustment: string,
  rdAdjustment: string
): number => {
  return parseFloat(entertainmentAdjustment || '0') + parseFloat(insuranceAdjustment || '0') + parseFloat(rdAdjustment || '0');
};

// Calculate taxable income using the formula:
// 应纳税所得额 = 销售收入 - 成本费用 + 企业所得税前调增/调减
export const calculateTaxableIncome = (
  totalRevenue: string,
  totalExpenses: string,
  adjustments: number
): number => {
  const revenue = parseFloat(totalRevenue) || 0;
  const expenses = parseFloat(totalExpenses) || 0;
  return revenue - expenses + adjustments;
};

// Calculate theoretical tax
export const calculateTheoreticalTax = (
  taxableIncome: number,
  taxRate: string
): number => {
  const rate = parseFloat(taxRate) / 100;
  return taxableIncome * rate;
};

// Calculate risk values
export const calculateRiskValues = (
  theoreticalTax: number,
  actualTax: string
): { riskValue: number; riskPercentage: number } => {
  const actual = parseFloat(actualTax) || 0;
  const riskValue = Math.abs(theoreticalTax - actual);
  const riskPercentage = Math.min(100, (riskValue / theoreticalTax) * 100);
  
  return { riskValue, riskPercentage };
};
