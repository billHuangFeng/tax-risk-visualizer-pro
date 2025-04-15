
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { PhoneCall } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import ContactForm from './ContactForm';

interface CalculatorActionsProps {
  riskPercentage: number;
  onCalculate?: () => void;
  onReset?: () => void;
  onExport?: () => void;
}

const CalculatorActions = ({ 
  riskPercentage, 
  onCalculate, 
  onReset, 
  onExport 
}: CalculatorActionsProps) => {
  const [showRiskDetails, setShowRiskDetails] = useState(false);
  
  // Listen for the custom event from RiskIndicator component
  useEffect(() => {
    const handleRiskDetailsVisibilityChange = (event: CustomEvent<{ showRiskDetails: boolean }>) => {
      setShowRiskDetails(event.detail.showRiskDetails);
    };
    
    // Add event listener
    document.addEventListener(
      'riskDetailsVisibilityChange', 
      handleRiskDetailsVisibilityChange as EventListener
    );
    
    // Clean up
    return () => {
      document.removeEventListener(
        'riskDetailsVisibilityChange', 
        handleRiskDetailsVisibilityChange as EventListener
      );
    };
  }, []);

  if (riskPercentage < 30 || !showRiskDetails) return null;

  return (
    <div className="flex justify-center mt-6">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-tax-blue hover:bg-tax-light-blue text-white">
            <PhoneCall className="mr-2 h-4 w-4" />
            联系税务顾问
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>联系税务顾问</DialogTitle>
          </DialogHeader>
          <ContactForm />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CalculatorActions;
