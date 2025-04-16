
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
    <div className="flex items-center min-w-[220px] max-w-full justify-end pdf-text-visible">
      <Input
        id={id}
        ref={inputRef}
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`text-right w-full min-w-[180px] pr-8 overflow-visible letter-spacing-normal ${className}`}
        disabled={disabled}
        data-value={value} /* Add data attribute for PDF export */
      />
      <span className="ml-2 text-sm whitespace-nowrap">{suffix}</span>
    </div>
  );
};

export default NumberInput;
