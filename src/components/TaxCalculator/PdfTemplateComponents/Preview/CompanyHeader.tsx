
import React from 'react';
import { PdfTemplate } from "@/types/pdfTemplates";

interface CompanyHeaderProps {
  styles: PdfTemplate['styles'];
}

export const CompanyHeader: React.FC<CompanyHeaderProps> = ({ styles }) => {
  return (
    <div 
      className="text-center"
      style={{
        marginBottom: styles.layout.sectionSpacing,
      }}
    >
      <h1 style={{
        fontSize: "20px",
        fontWeight: styles.headingStyle.fontWeight,
        marginBottom: "12px",
        borderBottom: styles.headingStyle.borderBottom,
        paddingBottom: "8px"
      }}>
        示例公司名称
      </h1>
      <p>2023年度税务报告</p>
    </div>
  );
};
