
import React, { useState, useEffect } from 'react';
import RiskBar from './RiskBar';
import RiskPrompt from './RiskPrompt';
import RiskDetails from './RiskDetails';

interface RiskIndicatorProps {
  riskPercentage: number;
  riskValue?: string;
  unexplainedDifference?: string;
}

const RiskIndicator: React.FC<RiskIndicatorProps> = ({ 
  riskPercentage, 
  riskValue = '0',
  unexplainedDifference = '0'
}) => {
  const [showRiskDetails, setShowRiskDetails] = useState(false);

  useEffect(() => {
    setShowRiskDetails(false);
  }, [unexplainedDifference, riskPercentage]);

  // Updated to use unexplained difference percentage instead of risk percentage
  const getRiskLevel = (percentage: number) => {
    if (percentage < 30) return '低风险';
    if (percentage < 70) return '中等风险';
    return '风险非常高';
  };

  const calculateRiskDetails = () => {
    // Using unexplained difference instead of risk value
    const baseRisk = parseFloat(unexplainedDifference);
    const taxAmount = baseRisk;
    const lateFee = baseRisk * 0.0005 * 365 * 3;
    const penalty = baseRisk;
    const totalRisk = taxAmount + lateFee + penalty;

    return {
      taxAmount: taxAmount.toFixed(2),
      lateFee: lateFee.toFixed(2),
      penalty: penalty.toFixed(2),
      totalRisk: totalRisk.toFixed(2)
    };
  };

  // Use unexplained difference percentage for risk assessment
  const showRiskAlert = riskPercentage >= 30;
  const riskDetails = calculateRiskDetails();

  useEffect(() => {
    const event = new CustomEvent('riskDetailsVisibilityChange', {
      detail: { showRiskDetails }
    });
    document.dispatchEvent(event);
  }, [showRiskDetails]);

  return (
    <div className="space-y-4 pt-4 border-t">
      <div className="mb-2 flex justify-between">
        <span className="font-bold">税务风险评估</span>
        <span className="font-bold">{getRiskLevel(riskPercentage)}</span>
      </div>
      
      <RiskBar riskPercentage={riskPercentage} />
      
      {showRiskAlert && !showRiskDetails && (
        <RiskPrompt onViewDetails={() => setShowRiskDetails(true)} />
      )}

      {showRiskAlert && showRiskDetails && (
        <RiskDetails riskDetails={riskDetails} />
      )}
    </div>
  );
};

export default RiskIndicator;
