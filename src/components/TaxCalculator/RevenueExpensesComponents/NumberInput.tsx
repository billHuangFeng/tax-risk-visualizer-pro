
import React from 'react';
import { Input } from '@/components/ui/input';

interface NumberInputProps {
  value: string;
  onChange: (value: string) => void;
  suffix?: string;
  className?: string;
  disabled?: boolean;
}

const NumberInput: React.FC<NumberInputProps> = ({
  value,
  onChange,
  suffix = "万元",
  className = "",
  disabled = false
}) => {
  return (
    <div className="flex items-center min-w-[160px] max-w-full justify-end">
      <Input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`text-right w-full min-w-[120px] ${className}`}
        disabled={disabled}
      />
      <span className="ml-2 text-sm whitespace-nowrap">{suffix}</span>
    </div>
  );
};

export default NumberInput;
