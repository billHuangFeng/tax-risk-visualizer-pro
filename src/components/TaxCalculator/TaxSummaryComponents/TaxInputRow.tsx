
import React from 'react';
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
      <div className={`md:col-span-3 break-words font-medium ${className}`}>
        {label}
        {showInfo && (
          <button 
            className="ml-2 text-tax-blue hover:text-tax-light-blue shrink-0 inline-flex"
            onClick={onInfoClick}
            title={`查看${label}说明`}
          >
            <Info size={16} />
          </button>
        )}
      </div>
      <div className="md:col-span-3 flex items-center justify-end w-full">
        <div className="min-w-[120px] w-[120px]">
          <input
            type={type}
            value={value}
            onChange={onChange ? (e) => onChange(e.target.value) : undefined}
            readOnly={readOnly}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base text-right ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm font-bold pr-2"
          />
        </div>
        <span className="ml-2 text-sm whitespace-nowrap">万元</span>
      </div>
    </div>
  );
};

export default TaxInputRow;
