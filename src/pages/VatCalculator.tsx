import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import CalculatorHeader from '@/components/TaxCalculator/CalculatorHeader';
import TaxNavbar from '@/components/TaxNavbar';
import CalculatorLayout from '@/components/TaxCalculator/CalculatorLayout';
import VatSalesSection from '@/components/VatCalculator/VatSalesSection';
import VatPurchasesSection from '@/components/VatCalculator/VatPurchasesSection';
import VatSummary from '@/components/VatCalculator/VatSummary';
import { useVatCalculator } from '@/hooks/useVatCalculator';
import vatInfoData from '@/constants/vatInfoData';
import type { TaxInfoPanelItem } from '@/types/calculator';
import CalculatorActions from '@/components/TaxCalculator/CalculatorActions';

const VatCalculator = () => {
  const vatCalculator = useVatCalculator();
  const [selectedInfoItem, setSelectedInfoItem] = useState<TaxInfoPanelItem | null>(null);

  const onInfoClick = (infoKey: string) => {
    setSelectedInfoItem(vatInfoData[infoKey]);
  };

  return (
    <>
      <CalculatorHeader 
        title="增值税风险评测计算器" 
        description="本计算器用于评估增值税的潜在风险，数据仅供参考，请根据实际情况谨慎使用" 
      />
      <TaxNavbar />
      <CalculatorLayout 
        selectedInfoItem={selectedInfoItem}
      >
        <VatSalesSection 
          salesData={vatCalculator.salesData}
          addSalesItem={vatCalculator.addSalesItem}
          updateSalesItem={vatCalculator.updateSalesItem}
          removeSalesItem={vatCalculator.removeSalesItem}
          salesTotal={vatCalculator.salesTotal}
          bankSalesAmount={vatCalculator.bankSalesAmount}
          setBankSalesAmount={vatCalculator.setBankSalesAmount}
          onInfoClick={onInfoClick}
          differenceExplanations={vatCalculator.differenceExplanations}
          addDifferenceExplanation={vatCalculator.addDifferenceExplanation}
          updateDifferenceExplanation={vatCalculator.updateDifferenceExplanation}
          removeDifferenceExplanation={vatCalculator.removeDifferenceExplanation}
          explainedDifferenceTotal={vatCalculator.explainedDifferenceTotal}
        />

        <VatPurchasesSection 
          purchasesData={vatCalculator.purchasesData}
          addPurchaseItem={vatCalculator.addPurchaseItem}
          updatePurchaseItem={vatCalculator.updatePurchaseItem}
          removePurchaseItem={vatCalculator.removePurchaseItem}
          purchasesTotal={vatCalculator.purchasesTotal}
          bankPurchasesAmount={vatCalculator.bankPurchasesAmount}
          setBankPurchasesAmount={vatCalculator.setBankPurchasesAmount}
          onInfoClick={onInfoClick}
          differenceExplanations={vatCalculator.differenceExplanations}
          addDifferenceExplanation={vatCalculator.addDifferenceExplanation}
          updateDifferenceExplanation={vatCalculator.updateDifferenceExplanation}
          removeDifferenceExplanation={vatCalculator.removeDifferenceExplanation}
          explainedDifferenceTotal={vatCalculator.explainedDifferenceTotal}
        />

        <VatSummary 
          payableTax={vatCalculator.payableTax}
          actualTax={vatCalculator.actualTax}
          setActualTax={vatCalculator.setActualTax}
          taxDifference={vatCalculator.taxDifference}
          taxDifferencePercentage={vatCalculator.taxDifferencePercentage}
          differenceFactors={vatCalculator.differenceFactors}
          addDifferenceFactor={vatCalculator.addDifferenceFactor}
          updateDifferenceFactor={vatCalculator.updateDifferenceFactor}
          removeDifferenceFactor={vatCalculator.removeDifferenceFactor}
          unexplainedDifference={vatCalculator.unexplainedDifference}
          riskLevel={vatCalculator.riskLevel}
          onInfoClick={onInfoClick}
        />

        <Card className="w-full px-4 py-4 bg-white border-t border-gray-200 shadow-sm">
          <CalculatorActions
            riskPercentage={Math.abs(vatCalculator.taxDifferencePercentage)}
            onReset={vatCalculator.handleReset}
          />
        </Card>
      </CalculatorLayout>
    </>
  );
};

export default VatCalculator;
