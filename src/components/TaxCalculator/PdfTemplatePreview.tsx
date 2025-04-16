
import React from 'react';
import { PdfTemplate } from "@/types/pdfTemplates";
import { PreviewHeader } from "./PdfTemplateComponents/Preview/PreviewHeader";
import { CompanyHeader } from "./PdfTemplateComponents/Preview/CompanyHeader";
import { PreviewSection } from "./PdfTemplateComponents/Preview/PreviewSection";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PdfTemplatePreviewProps {
  template: PdfTemplate;
  onBack: () => void;
}

export const PdfTemplatePreview: React.FC<PdfTemplatePreviewProps> = ({
  template,
  onBack
}) => {
  const { styles } = template;
  
  return (
    <div className="space-y-4 w-full">
      <PreviewHeader templateName={template.name} onBack={onBack} />
      
      <ScrollArea className="h-[calc(100vh-200px)] w-full rounded-lg border">
        <div 
          className="p-6 bg-white w-full"
          style={{
            fontFamily: styles.fontFamily,
          }}
        >
          <CompanyHeader styles={styles} />
          
          <PreviewSection title="基本信息" styles={styles}>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex justify-between">
                <span style={{ color: styles.formFieldStyle.labelColor }}>公司名称：</span>
                <span style={{ 
                  border: `1px solid ${styles.formFieldStyle.borderColor}`,
                  padding: styles.formFieldStyle.padding
                }}>示例公司名称</span>
              </div>
              
              <div className="flex justify-between">
                <span style={{ color: styles.formFieldStyle.labelColor }}>员工数量：</span>
                <span style={{ 
                  border: `1px solid ${styles.formFieldStyle.borderColor}`,
                  padding: styles.formFieldStyle.padding
                }}>50</span>
              </div>
              
              <div className="flex justify-between">
                <span style={{ color: styles.formFieldStyle.labelColor }}>是否高新企业：</span>
                <div className="flex items-center">
                  <div style={{
                    width: "16px",
                    height: "16px",
                    border: `1px solid ${styles.formFieldStyle.borderColor}`,
                    display: "inline-block",
                    position: "relative",
                    marginRight: "6px"
                  }}>
                    <span style={{
                      position: "absolute",
                      top: "-2px",
                      left: "2px"
                    }}>✓</span>
                  </div>
                  <span>是</span>
                </div>
              </div>
              
              <div className="flex justify-between">
                <span style={{ color: styles.formFieldStyle.labelColor }}>总资产：</span>
                <span style={{ 
                  border: `1px solid ${styles.formFieldStyle.borderColor}`,
                  padding: styles.formFieldStyle.padding
                }}>¥ 10,000,000.00</span>
              </div>
            </div>
          </PreviewSection>
          
          <PreviewSection title="收入与支出" styles={styles}>
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
                <tr>
                  <td style={{
                    border: `1px solid ${styles.tableStyle.borderColor}`,
                    padding: styles.tableStyle.cellPadding,
                    textAlign: "left"
                  }}>
                    总收入
                  </td>
                  <td style={{
                    border: `1px solid ${styles.tableStyle.borderColor}`,
                    padding: styles.tableStyle.cellPadding,
                    textAlign: "right"
                  }}>
                    5,000,000.00
                  </td>
                </tr>
                <tr>
                  <td style={{
                    border: `1px solid ${styles.tableStyle.borderColor}`,
                    padding: styles.tableStyle.cellPadding,
                    textAlign: "left"
                  }}>
                    总支出
                  </td>
                  <td style={{
                    border: `1px solid ${styles.tableStyle.borderColor}`,
                    padding: styles.tableStyle.cellPadding,
                    textAlign: "right"
                  }}>
                    3,500,000.00
                  </td>
                </tr>
                <tr>
                  <td style={{
                    border: `1px solid ${styles.tableStyle.borderColor}`,
                    padding: styles.tableStyle.cellPadding,
                    textAlign: "left",
                    fontWeight: "bold"
                  }}>
                    应纳税所得额
                  </td>
                  <td style={{
                    border: `1px solid ${styles.tableStyle.borderColor}`,
                    padding: styles.tableStyle.cellPadding,
                    textAlign: "right",
                    fontWeight: "bold"
                  }}>
                    1,500,000.00
                  </td>
                </tr>
              </tbody>
            </table>
          </PreviewSection>
          
          <PreviewSection title="税务总结" styles={styles}>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex justify-between">
                <span style={{ color: styles.formFieldStyle.labelColor }}>适用税率：</span>
                <span style={{ 
                  border: `1px solid ${styles.formFieldStyle.borderColor}`,
                  padding: styles.formFieldStyle.padding
                }}>25%</span>
              </div>
              
              <div className="flex justify-between">
                <span style={{ color: styles.formFieldStyle.labelColor }}>理论应缴税额：</span>
                <span style={{ 
                  border: `1px solid ${styles.formFieldStyle.borderColor}`,
                  padding: styles.formFieldStyle.padding
                }}>¥ 375,000.00</span>
              </div>
              
              <div className="flex justify-between">
                <span style={{ color: styles.formFieldStyle.labelColor }}>实际缴纳税额：</span>
                <span style={{ 
                  border: `1px solid ${styles.formFieldStyle.borderColor}`,
                  padding: styles.formFieldStyle.padding
                }}>¥ 300,000.00</span>
              </div>
              
              <div className="flex justify-between">
                <span style={{ color: styles.formFieldStyle.labelColor }}>风险评估：</span>
                <span style={{ 
                  border: `1px solid ${styles.formFieldStyle.borderColor}`,
                  padding: styles.formFieldStyle.padding,
                  backgroundColor: "#FEF7CD"
                }}>中等风险 (30%)</span>
              </div>
            </div>
          </PreviewSection>
        </div>
      </ScrollArea>
    </div>
  );
};
