
import { useBasicInfo } from './calculator/useBasicInfo';
import { useRevenueExpenses } from './calculator/useRevenueExpenses';
import { useTaxAdjustments } from './calculator/useTaxAdjustments';
import { useTaxSummary } from './calculator/useTaxSummary';
import { useCalculations } from './calculator/useCalculations';
import { useActions } from './calculator/useActions';

export const useCalculator = () => {
  const basicInfo = useBasicInfo();
  const revenueExpenses = useRevenueExpenses();
  const taxAdjustments = useTaxAdjustments();
  const taxSummary = useTaxSummary();
  const actions = useActions(taxSummary.riskValue, taxSummary.riskPercentage);

  useCalculations(
    revenueExpenses.totalRevenue,
    revenueExpenses.totalExpenses,
    taxAdjustments.entertainmentExpenses,
    taxAdjustments.insuranceExpenses,
    taxSummary.taxRate,
    taxSummary.actualTax,
    taxAdjustments.setTotalAdjustment,
    taxSummary.setTaxableIncome,
    taxSummary.setTheoreticalTax,
    taxSummary.setRiskValue,
    taxSummary.setRiskPercentage,
  );

  return {
    ...basicInfo,
    ...revenueExpenses,
    ...taxAdjustments,
    ...taxSummary,
    ...actions,
  };
};
