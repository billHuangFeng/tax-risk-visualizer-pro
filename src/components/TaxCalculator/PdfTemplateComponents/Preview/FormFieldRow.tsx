
import React from 'react';
import { PdfTemplate } from "@/types/pdfTemplates";

interface FormFieldRowProps {
  label: string;
  value: string | number;
  styles: PdfTemplate['styles'];
}

export const FormFieldRow: React.FC<FormFieldRowProps> = ({
  label,
  value,
  styles
}) => {
  return (
    <div className="flex justify-between">
      <span style={{ color: styles.formFieldStyle.labelColor }}>{label}</span>
      <span style={{ 
        border: `1px solid ${styles.formFieldStyle.borderColor}`,
        padding: styles.formFieldStyle.padding
      }}>{value}</span>
    </div>
  );
};
