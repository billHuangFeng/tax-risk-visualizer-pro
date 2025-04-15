import React from 'react';
import TaxInputRow from './TaxSummaryComponents/TaxInputRow';
import { InfoData } from '@/types/tax';

interface ExpenseValues {
  actual: string;
  deductible: string;
  adjustment: string;
}

interface TaxAdjustmentsProps {
  rdExpenses: ExpenseValues;
  setRdExpenses: (value: ExpenseValues) => void;
  entertainmentExpenses: ExpenseValues;
  setEntertainmentExpenses: (value: ExpenseValues) => void;
  advertisingExpenses: ExpenseValues;
  setAdvertisingExpenses: (value: ExpenseValues) => void;
  educationExpenses: ExpenseValues;
  setEducationExpenses: (value: ExpenseValues) => void;
  welfareExpenses: ExpenseValues;
  setWelfareExpenses: (value: ExpenseValues) => void;
  insuranceExpenses: ExpenseValues;
  setInsuranceExpenses: (value: ExpenseValues) => void;
  totalAdjustment: string;
  onInfoClick?: (infoKey: string) => void;
  infoData?: InfoData;
  isExcludedIndustry: boolean;
}

const TaxAdjustments: React.FC<TaxAdjustmentsProps> = ({
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
  onInfoClick,
  infoData,
  isExcludedIndustry,
}) => {
  const formatNumber = (value: string): string => {
    const num = parseFloat(value);
    return isNaN(num) ? '0.00' : num.toFixed(2);
  };

  const calculateAdjustment = (actual: string, deductible: string): string => {
    const actualNum = parseFloat(actual);
    const deductibleNum = parseFloat(deductible);
    const adjustment = deductibleNum - actualNum;
    return adjustment.toFixed(2);
  };

  const handleChange = (value: string, type: keyof ExpenseValues, isExcludedIndustry: boolean = false) => {
    const formattedValue = value === '' ? '0' : value;

    const updateExpense = (expense: ExpenseValues, setExpense: (value: ExpenseValues) => void) => {
      const newExpense = { ...expense, [type]: formattedValue };
      let deductibleValue = newExpense.actual;

      if (type === 'actual') {
        if (type === 'actual' && type === 'actual' && infoData && infoData.entertainmentExpenses && !isExcludedIndustry) {
          const revenue = 3000; // 假设收入为3000
          const limit = revenue * 0.005;
          deductibleValue = Math.min(parseFloat(newExpense.actual), limit).toString();
        }
        newExpense.deductible = formatNumber(deductibleValue);
        newExpense.adjustment = calculateAdjustment(newExpense.actual, newExpense.deductible);
      }

      setExpense(newExpense);
    };

    switch (type) {
      case 'actual':
        updateExpense(rdExpenses, setRdExpenses);
        updateExpense(entertainmentExpenses, setEntertainmentExpenses);
        updateExpense(advertisingExpenses, setAdvertisingExpenses);
        updateExpense(educationExpenses, setEducationExpenses);
        updateExpense(welfareExpenses, setWelfareExpenses);
        updateExpense(insuranceExpenses, setInsuranceExpenses);
        break;
      default:
        break;
    }
  };

  return (
    <div className="space-y-6 border rounded-lg p-6 bg-white">
      <h2 className="text-xl font-bold border-l-4 border-tax-blue pl-3">纳税调整项目</h2>
      
      <div className="space-y-4">
        <TaxInputRow
          label="1. 研发费用加计扣除"
          value={rdExpenses.actual}
          onChange={(value) => {
            handleChange(value, 'actual')
            setRdExpenses({...rdExpenses, actual: value})
          }}
          type="number"
          showInfo
          onInfoClick={() => onInfoClick?.('rdExpenses')}
        />
        
        <TaxInputRow
          label="2. 超标业务招待费调整"
          value={entertainmentExpenses.actual}
          onChange={(value) => {
            handleChange(value, 'actual', isExcludedIndustry)
            setEntertainmentExpenses({...entertainmentExpenses, actual: value})
          }}
          type="number"
          showInfo
          onInfoClick={() => onInfoClick?.('entertainmentExpenses')}
        />
        
        <TaxInputRow
          label="3. 超标广告费和业务宣传费调整"
          value={advertisingExpenses.actual}
          onChange={(value) => {
            handleChange(value, 'actual')
            setAdvertisingExpenses({...advertisingExpenses, actual: value})
          }}
          type="number"
          showInfo
          onInfoClick={() => onInfoClick?.('entertainmentExpenses')}
        />
        
        <TaxInputRow
          label="4. 职工教育经费调整"
          value={educationExpenses.actual}
          onChange={(value) => {
            handleChange(value, 'actual')
            setEducationExpenses({...educationExpenses, actual: value})
          }}
          type="number"
          showInfo
          onInfoClick={() => onInfoClick?.('entertainmentExpenses')}
        />
        
        <TaxInputRow
          label="5. 职工福利费调整"
          value={welfareExpenses.actual}
          onChange={(value) => {
            handleChange(value, 'actual')
            setWelfareExpenses({...welfareExpenses, actual: value})
          }}
          type="number"
          showInfo
          onInfoClick={() => onInfoClick?.('entertainmentExpenses')}
        />
        
        <TaxInputRow
          label="6. 社保费调整"
          value={insuranceExpenses.actual}
          onChange={(value) => {
            handleChange(value, 'actual')
            setInsuranceExpenses({...insuranceExpenses, actual: value})
          }}
          type="number"
          showInfo
          onInfoClick={() => onInfoClick?.('entertainmentExpenses')}
        />
        
        <TaxInputRow
          label="纳税调整总额"
          value={totalAdjustment}
          readOnly
          showInfo
          onInfoClick={() => onInfoClick?.('entertainmentExpenses')}
        />
      </div>
    </div>
  );
};

export default TaxAdjustments;
