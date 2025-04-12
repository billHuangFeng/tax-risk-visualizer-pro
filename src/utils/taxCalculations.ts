
// Tax calculation utility functions

// Calculate deductible R&D expenses
export const calculateDeductibleRD = (actualRD: number): number => {
  return actualRD * 2; // 200% deduction for R&D expenses
};

// Calculate excess business entertainment expenses
export const calculateExcessEntertainment = (
  actualEntertainment: number,
  revenue: number
): { deductible: number; excess: number } => {
  const limit = revenue * 0.005; // 0.5% of revenue limit
  if (actualEntertainment <= limit) {
    return {
      deductible: actualEntertainment,
      excess: 0
    };
  }
  return {
    deductible: limit,
    excess: actualEntertainment - limit
  };
};

// Calculate tax adjustments
export const calculateTaxAdjustments = (
  adjustments: { actual: number; deductible: number }[]
): number => {
  return adjustments.reduce((total, item) => {
    return total + (item.deductible - item.actual);
  }, 0);
};

// Calculate corporate income tax
export const calculateCorporateIncomeTax = (
  revenue: number, 
  expenses: number,
  adjustments: number,
  taxRate: number
): {
  taxableIncome: number;
  theoreticalTax: number;
  actualTax: number;
  riskValue: number;
} => {
  const taxableIncome = revenue - expenses + adjustments;
  const theoreticalTax = Math.max(0, taxableIncome * (taxRate / 100));
  // For demo purposes, we're setting actual tax to a fixed value
  // In a real system, this would be user input
  const actualTax = theoreticalTax * 0.6; // Example: 60% of theoretical tax
  const riskValue = Math.abs(theoreticalTax - actualTax);

  return {
    taxableIncome,
    theoreticalTax,
    actualTax,
    riskValue
  };
};

// Format currency for display
export const formatCurrency = (value: number): string => {
  return value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
};
