
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, OctagonAlert } from 'lucide-react';

interface RiskPromptProps {
  onViewDetails: () => void;
}

const RiskPrompt: React.FC<RiskPromptProps> = ({ onViewDetails }) => {
  return (
    <div className="flex flex-col items-center space-y-4 mt-4 bg-blue-50 p-4 rounded-lg border border-blue-200">
      <div className="flex items-center space-x-3">
        <OctagonAlert 
          className="text-red-600 w-12 h-12" 
          strokeWidth={2.5} 
        />
        <p className="text-lg font-semibold text-blue-800">想看看风险到底有多高？</p>
      </div>
      <div className="flex gap-4">
        <Button 
          variant="default"
          onClick={onViewDetails}
          className="px-8 bg-blue-600 hover:bg-blue-700"
        >
          <Check className="mr-2 h-4 w-4" />
          好的
        </Button>
      </div>
    </div>
  );
};

export default RiskPrompt;
