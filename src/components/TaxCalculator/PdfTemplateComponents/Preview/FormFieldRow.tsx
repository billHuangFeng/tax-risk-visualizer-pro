
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
}

export const FormFieldRow: React.FC<FormFieldRowProps> = ({
  label,
  value,
  styles,
  width = "auto",
  align = "right",
  unit,
  bold = false
}) => {
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
          {value}
        </span>
        {unit && <span className="ml-1">{unit}</span>}
      </div>
    </div>
  );
};
