import React from 'react';
import RevenueSection from './RevenueExpensesComponents/RevenueSection';
import ExpensesSection from './RevenueExpensesComponents/ExpensesSection';

interface RevenueExpensesProps {
  totalRevenue: string;
  setTotalRevenue: (value: string) => void;
  invoicedRevenue: string;
  setInvoicedRevenue: (value: string) => void;
  nonInvoicedRevenue: string;
  setNonInvoicedRevenue: (value: string) => void;
  newInvoicedRevenue: string;
  setNewInvoicedRevenue: (value: string) => void;
  totalExpenses: string;
  setTotalExpenses: (value: string) => void;
  invoicedExpenses: string;
  setInvoicedExpenses: (value: string) => void;
  nonInvoicedExpenses: string;
  setNonInvoicedExpenses: (value: string) => void;
  personalTax: string;
  setPersonalTax: (value: string) => void;
  socialSecurity: string;
  setSocialSecurity: (value: string) => void;
  depreciation: string;
  setDepreciation: (value: string) => void;
  otherExpenses: string;
  setOtherExpenses: (value: string) => void;
  onInfoClick?: (infoKey: string) => void;
}

const RevenueExpenses: React.FC<RevenueExpensesProps> = (props) => {
  return (
    <div className="space-y-6 border rounded-lg p-6 bg-white">
      <RevenueSection
        totalRevenue={props.totalRevenue}
        setTotalRevenue={props.setTotalRevenue}
        invoicedRevenue={props.invoicedRevenue}
        setInvoicedRevenue={props.setInvoicedRevenue}
        nonInvoicedRevenue={props.nonInvoicedRevenue}
        setNonInvoicedRevenue={props.setNonInvoicedRevenue}
        newInvoicedRevenue={props.newInvoicedRevenue}
        setNewInvoicedRevenue={props.setNewInvoicedRevenue}
        onInfoClick={props.onInfoClick}
      />

      <ExpensesSection
        totalExpenses={props.totalExpenses}
        setTotalExpenses={props.setTotalExpenses}
        invoicedExpenses={props.invoicedExpenses}
        setInvoicedExpenses={props.setInvoicedExpenses}
        nonInvoicedExpenses={props.nonInvoicedExpenses}
        setNonInvoicedExpenses={props.setNonInvoicedExpenses}
        personalTax={props.personalTax}
        setPersonalTax={props.setPersonalTax}
        socialSecurity={props.socialSecurity}
        setSocialSecurity={props.setSocialSecurity}
        depreciation={props.depreciation}
        setDepreciation={props.setDepreciation}
        otherExpenses={props.otherExpenses}
        setOtherExpenses={props.setOtherExpenses}
      />
    </div>
  );
};

export default RevenueExpenses;
