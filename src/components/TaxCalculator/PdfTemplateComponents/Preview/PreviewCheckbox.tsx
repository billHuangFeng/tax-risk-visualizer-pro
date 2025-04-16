
import React from 'react';
import { PdfTemplate } from "@/types/pdfTemplates";

interface PreviewCheckboxProps {
  label: string;
  checked: boolean;
  styles: PdfTemplate['styles'];
}

export const PreviewCheckbox: React.FC<PreviewCheckboxProps> = ({
  label,
  checked,
  styles
}) => {
  return (
    <div className="flex items-center">
      <div style={{
        width: "16px",
        height: "16px",
        border: `1px solid ${styles.formFieldStyle.borderColor}`,
        display: "inline-block",
        position: "relative",
        marginRight: "6px"
      }}>
        {checked && (
          <span style={{
            position: "absolute",
            top: "-2px",
            left: "2px"
          }}>✓</span>
        )}
      </div>
      <span>{label}</span>
    </div>
  );
};
