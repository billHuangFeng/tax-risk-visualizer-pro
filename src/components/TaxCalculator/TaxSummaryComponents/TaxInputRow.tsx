
import React, { useRef, useEffect } from 'react';
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
  id?: string;
}

const TaxInputRow: React.FC<TaxInputRowProps> = ({
  label,
  value,
  onChange,
  readOnly = false,
  showInfo = false,
  onInfoClick,
  type = "text",
  className = "",
  id
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Add a data attribute with the value for PDF export
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.setAttribute('data-value', value);
    }
  }, [value]);
  
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
      <div className="md:col-span-3 flex items-center justify-end w-full pdf-text-visible">
        <div className="min-w-[220px] w-full max-w-[300px] relative">
          <Input
            id={id}
            ref={inputRef}
            type={type}
            value={value}
            onChange={onChange ? (e) => onChange(e.target.value) : undefined}
            readOnly={readOnly}
            className="text-right font-bold pr-8 w-full overflow-visible letter-spacing-normal"
            data-value={value} /* Add data attribute for PDF export */
          />
          <div className="absolute right-3 top-0 bottom-0 flex items-center justify-end h-full pointer-events-none pdf-value">
            {value}
          </div>
        </div>
        <span className="ml-2 text-sm whitespace-nowrap">万元</span>
      </div>
    </div>
  );
};

export default TaxInputRow;
