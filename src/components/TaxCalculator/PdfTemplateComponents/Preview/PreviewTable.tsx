
import React from 'react';
import { PdfTemplate } from "@/types/pdfTemplates";

interface TableRow {
  label: string;
  value: string | number;
  isBold?: boolean;
}

interface PreviewTableProps {
  rows: TableRow[];
  styles: PdfTemplate['styles'];
}

export const PreviewTable: React.FC<PreviewTableProps> = ({
  rows,
  styles
}) => {
  return (
    <table style={{
      width: "100%",
      borderCollapse: "collapse",
      marginBottom: "16px",
    }}>
      <thead>
        <tr>
          <th style={{
            border: `1px solid ${styles.tableStyle.borderColor}`,
            padding: styles.tableStyle.cellPadding,
            backgroundColor: styles.tableStyle.headerBgColor,
            textAlign: "left"
          }}>
            项目
          </th>
          <th style={{
            border: `1px solid ${styles.tableStyle.borderColor}`,
            padding: styles.tableStyle.cellPadding,
            backgroundColor: styles.tableStyle.headerBgColor,
            textAlign: "right"
          }}>
            金额（元）
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={index}>
            <td style={{
              border: `1px solid ${styles.tableStyle.borderColor}`,
              padding: styles.tableStyle.cellPadding,
              textAlign: "left",
              fontWeight: row.isBold ? "bold" : "normal"
            }}>
              {row.label}
            </td>
            <td style={{
              border: `1px solid ${styles.tableStyle.borderColor}`,
              padding: styles.tableStyle.cellPadding,
              textAlign: "right",
              fontWeight: row.isBold ? "bold" : "normal"
            }}>
              {row.value}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
