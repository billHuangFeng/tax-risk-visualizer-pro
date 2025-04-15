
import React from 'react';
import { Input } from '@/components/ui/input';

interface NumberInputProps {
  value: string;
  onChange: (value: string) => void;
  suffix?: string;
  className?: string;
}

const NumberInput: React.FC<NumberInputProps> = ({
  value,
  onChange,
  suffix = "万元",
  className
}) => {
  return (
    <div className="flex items-center whitespace-nowrap">
      <div className="w-input-text">
        <Input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`text-right w-full ${className}`}
        />
      </div>
      <span className="ml-2 text-sm whitespace-nowrap">{suffix}</span>
    </div>
  );
};

export default NumberInput;
