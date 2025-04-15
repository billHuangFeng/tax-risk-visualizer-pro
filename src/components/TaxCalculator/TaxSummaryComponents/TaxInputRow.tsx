
import React from 'react';
import { Input } from '@/components/ui/input';
import { Info } from 'lucide-react';

interface TaxInputRowProps {
  label: string;
  value: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  showInfo?: boolean;
  onInfoClick?: () => void;
  type?: "text" | "number";
  className?: string;
}

const TaxInputRow: React.FC<TaxInputRowProps> = ({
  label,
  value,
  onChange,
  readOnly = false,
  showInfo = false,
  onInfoClick,
  type = "text",
  className = ""
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
      <div className={`md:col-span-2 font-medium ${className}`}>
        {label}
        {showInfo && (
          <button 
            className="ml-2 text-tax-blue hover:text-tax-light-blue"
            onClick={onInfoClick}
            title={`查看${label}说明`}
          >
            <Info size={16} />
          </button>
        )}
      </div>
      <div className="md:col-span-3"></div>
      <div className="md:col-span-1 flex items-center">
        <div className="w-[144rem] relative">
          <Input
            type={type}
            value={value}
            onChange={onChange ? (e) => onChange(e.target.value) : undefined}
            readOnly={readOnly}
            className="text-right font-bold pr-2 w-full"
          />
        </div>
        <span className="ml-2 text-sm whitespace-nowrap">万元</span>
      </div>
    </div>
  );
};

export default TaxInputRow;
