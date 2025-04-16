import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Copyright } from 'lucide-react';
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

  useEffect(() => {
    const newRiskPercentage = vatCalculator.calculateRiskPercentage(
      vatCalculator.unexplainedDifference, 
      vatCalculator.payableTax,
      vatCalculator.salesTotal.tax
    );
    vatCalculator.setRiskPercentage(newRiskPercentage);
  }, [
    vatCalculator.unexplainedDifference, 
    vatCalculator.payableTax, 
    vatCalculator.salesTotal.tax
  ]);

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
          differenceExplanations={vatCalculator.salesDifferenceExplanations}
          addDifferenceExplanation={vatCalculator.addSalesDifferenceExplanation}
          updateDifferenceExplanation={vatCalculator.updateSalesDifferenceExplanation}
          removeDifferenceExplanation={vatCalculator.removeSalesDifferenceExplanation}
          explainedDifferenceTotal={vatCalculator.salesExplainedDifferenceTotal}
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
          differenceExplanations={vatCalculator.purchasesDifferenceExplanations}
          addDifferenceExplanation={vatCalculator.addPurchasesDifferenceExplanation}
          updateDifferenceExplanation={vatCalculator.updatePurchasesDifferenceExplanation}
          removeDifferenceExplanation={vatCalculator.removePurchasesDifferenceExplanation}
          explainedDifferenceTotal={vatCalculator.purchasesExplainedDifferenceTotal}
        />

        <VatSummary 
          payableTax={vatCalculator.payableTax}
          actualTax={vatCalculator.actualTax}
          setActualTax={vatCalculator.setActualTax}
          taxDifference={vatCalculator.taxDifference}
          taxDifferencePercentage={vatCalculator.taxDifferencePercentage}
          taxDifferenceFactors={vatCalculator.taxDifferenceFactors}
          addTaxDifferenceFactor={vatCalculator.addTaxDifferenceFactor}
          updateTaxDifferenceFactor={vatCalculator.updateTaxDifferenceFactor}
          removeTaxDifferenceFactor={vatCalculator.removeTaxDifferenceFactor}
          unexplainedDifference={vatCalculator.unexplainedDifference}
          riskLevel={vatCalculator.riskLevel}
          riskPercentage={vatCalculator.riskPercentage}
          onInfoClick={onInfoClick}
        />

        <Card className="w-full px-4 py-4 bg-white border-t border-gray-200 shadow-sm">
          <CalculatorActions
            riskPercentage={vatCalculator.riskPercentage}
            onReset={vatCalculator.handleReset}
            onLoadTestData={vatCalculator.loadTestData}
          />
        </Card>
      </CalculatorLayout>

      <footer className="container text-center text-gray-500 text-sm py-4 flex items-center justify-center flex-col">
        <div className="flex items-center">
          <Copyright className="h-4 w-4 mr-2" />
          <span>© 2025 财倍贝企业成长研究院 版权所有</span>
        </div>
        <div className="mt-1 text-xs flex flex-col">
          <div className="flex items-center justify-center">
            <span>著作权人：财倍贝企业成长研究院、无锡市财倍贝企业管理有限公司、黄夕兵</span>
          </div>
          <div className="flex items-center justify-center mt-1">
            <Copyright className="h-3 w-3 mr-1" />
            <span>© 2025 CaiBeiBei Enterprise Growth Research Institute. All Rights Reserved.</span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default VatCalculator;
