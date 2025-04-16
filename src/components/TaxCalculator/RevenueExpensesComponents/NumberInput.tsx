
import React from 'react';

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
    <div className="flex items-center min-w-[120px] max-w-full justify-end">
      <input
        type="number"
        inputMode="decimal"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`flex h-12 w-full md:w-[120px] rounded-md border border-input bg-background px-3 py-2 text-base text-right ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ${className}`}
        disabled={disabled}
      />
      <span className="ml-2 text-sm whitespace-nowrap">{suffix}</span>
    </div>
  );
};

export default NumberInput;
