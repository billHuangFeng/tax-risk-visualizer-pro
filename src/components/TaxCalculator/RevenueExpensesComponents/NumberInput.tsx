
import React, { useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';

interface NumberInputProps {
  value: string;
  onChange: (value: string) => void;
  suffix?: string;
  className?: string;
  disabled?: boolean;
  id?: string;
  isPercentage?: boolean;
}

const NumberInput: React.FC<NumberInputProps> = ({
  value,
  onChange,
  suffix = "万元",
  className = "",
  disabled = false,
  id,
  isPercentage = false
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.setAttribute('data-value', value);
      inputRef.current.setAttribute('data-unit', isPercentage ? '%' : suffix);
    }
  }, [value, suffix, isPercentage]);

  return (
    <div className="flex items-center min-w-[220px] max-w-full justify-end relative">
      <Input
        id={id}
        ref={inputRef}
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`text-right w-full min-w-[180px] pr-8 ${className}`}
        disabled={disabled}
        data-value={value}
        data-unit={isPercentage ? '%' : suffix}
      />
      <div className="pdf-value absolute right-3 top-0 bottom-0 flex items-center justify-center h-full pointer-events-none opacity-0 hidden print:block">
        {value}
      </div>
      <span className="ml-2 text-sm whitespace-nowrap">{isPercentage ? '%' : suffix}</span>
    </div>
  );
};

export default NumberInput;
