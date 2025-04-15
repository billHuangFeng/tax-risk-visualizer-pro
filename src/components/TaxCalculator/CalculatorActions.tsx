
import React from 'react';
import { Button } from '@/components/ui/button';
import { PhoneCall } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import ContactForm from './ContactForm';

interface CalculatorActionsProps {
  riskPercentage: number;
}

const CalculatorActions = ({ riskPercentage }: CalculatorActionsProps) => {
  // Only show button for medium (>= 30%) and high risk (>= 70%) scenarios
  if (riskPercentage < 30) return null;

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
