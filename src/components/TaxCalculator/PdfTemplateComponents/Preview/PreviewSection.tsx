
import React from 'react';
import { PdfTemplate } from "@/types/pdfTemplates";

interface PreviewSectionProps {
  title: string;
  styles: PdfTemplate['styles'];
  children: React.ReactNode;
}

export const PreviewSection: React.FC<PreviewSectionProps> = ({
  title,
  styles,
  children
}) => {
  return (
    <div style={{
      marginBottom: styles.layout.sectionSpacing,
    }}>
      <h2 style={{
        fontSize: styles.headingStyle.fontSize,
        fontWeight: styles.headingStyle.fontWeight,
        color: styles.headingStyle.color,
        borderBottom: styles.headingStyle.borderBottom,
        marginBottom: "16px",
        paddingBottom: "4px"
      }}>
        {title}
      </h2>
      {children}
    </div>
  );
};
