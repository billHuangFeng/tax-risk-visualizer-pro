
import React from 'react';
import { PdfTemplate } from "@/types/pdfTemplates";

interface FormFieldRowProps {
  label: string;
  value: string | number;
  styles: PdfTemplate['styles'];
  width?: string;
  align?: 'left' | 'right';
  unit?: string;
  bold?: boolean;
  isPercentage?: boolean;
}

export const FormFieldRow: React.FC<FormFieldRowProps> = ({
  label,
  value,
  styles,
  width = "auto",
  align = "right",
  unit,
  bold = false,
  isPercentage = false
}) => {
  const formattedValue = (() => {
    if (isPercentage) {
      return `${value}%`;
    }
    if (typeof value === 'number') {
      return value.toLocaleString('zh-CN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    }
    return value;
  })();

  return (
    <div className="flex items-baseline justify-between mb-2">
      <span 
        style={{ 
          color: styles.formFieldStyle.labelColor,
          fontWeight: bold ? 'bold' : 'normal'
        }}
        className="mr-4"
      >
        {label}
      </span>
      <div className="flex items-baseline">
        <span 
          style={{ 
            border: `1px solid ${styles.formFieldStyle.borderColor}`,
            padding: styles.formFieldStyle.padding,
            minWidth: width,
            textAlign: align,
            fontWeight: bold ? 'bold' : 'normal'
          }}
        >
          {formattedValue}
        </span>
        {unit && <span className="ml-1" style={{ fontSize: '14px' }}>{unit}</span>}
      </div>
    </div>
  );
};
