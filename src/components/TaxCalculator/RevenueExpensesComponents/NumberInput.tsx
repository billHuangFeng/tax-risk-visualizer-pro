
import React, { useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';

interface NumberInputProps {
  value: string;
  onChange: (value: string) => void;
  suffix?: string;
  className?: string;
  disabled?: boolean;
  id?: string;
}

const NumberInput: React.FC<NumberInputProps> = ({
  value,
  onChange,
  suffix = "万元",
  className = "",
  disabled = false,
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
    <div className="flex items-center min-w-[220px] max-w-full justify-end pdf-text-visible relative">
      <Input
        id={id}
        ref={inputRef}
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`text-right w-full min-w-[180px] pr-8 ${className}`}
        disabled={disabled}
        data-value={value} /* Add data attribute for PDF export */
      />
      <div className="pdf-value absolute right-3 top-0 bottom-0 flex items-center justify-center h-full pointer-events-none opacity-0">
        {value || '0'}
      </div>
      <span className="ml-2 text-sm whitespace-nowrap">{suffix}</span>
    </div>
  );
};

export default NumberInput;
