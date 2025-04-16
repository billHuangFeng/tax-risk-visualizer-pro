
import React from 'react';
import { PdfTemplate } from "@/types/pdfTemplates";

interface TemplateGridProps {
  templates: PdfTemplate[];
  selectedTemplate: PdfTemplate;
  onSelectTemplate: (template: PdfTemplate) => void;
}

export const TemplateGrid: React.FC<TemplateGridProps> = ({
  templates,
  selectedTemplate,
  onSelectTemplate,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
      {templates.map((template) => (
        <div 
          key={template.id}
          className={`border rounded-lg p-4 cursor-pointer transition-all ${
            selectedTemplate.id === template.id 
              ? 'border-primary bg-primary/5 shadow-sm' 
              : 'border-border hover:border-primary/50'
          }`}
          onClick={() => onSelectTemplate(template)}
        >
          <h3 className="font-medium text-lg mb-2">{template.name}</h3>
          <p className="text-sm text-muted-foreground mb-4">{template.description}</p>
          <div className="h-32 bg-accent/30 rounded flex items-center justify-center">
            <div className="text-xs text-center p-4">
              <div style={{ 
                fontFamily: template.styles.fontFamily,
                marginBottom: '8px'
              }}>
                <div style={{ 
                  fontSize: template.styles.headingStyle.fontSize,
                  fontWeight: template.styles.headingStyle.fontWeight,
                  color: template.styles.headingStyle.color,
                  borderBottom: template.styles.headingStyle.borderBottom,
                  paddingBottom: '4px',
                  marginBottom: '8px'
                }}>
                  模板预览
                </div>
                
                <div className="flex justify-between" style={{
                  marginBottom: '6px'
                }}>
                  <span>字段名称：</span>
                  <span style={{
                    border: `1px solid ${template.styles.formFieldStyle.borderColor}`,
                    padding: '2px 4px',
                  }}>字段值</span>
                </div>
                
                <div style={{
                  border: `1px solid ${template.styles.tableStyle.borderColor}`,
                  marginTop: '8px',
                  fontSize: '0.65rem'
                }}>
                  <div style={{
                    backgroundColor: template.styles.tableStyle.headerBgColor,
                    padding: '2px 4px',
                    textAlign: 'center'
                  }}>
                    表格标题
                  </div>
                  <div style={{
                    display: 'flex',
                    borderTop: `1px solid ${template.styles.tableStyle.borderColor}`
                  }}>
                    <div style={{
                      padding: '2px 4px',
                      borderRight: `1px solid ${template.styles.tableStyle.borderColor}`,
                      width: '50%'
                    }}>
                      项目
                    </div>
                    <div style={{
                      padding: '2px 4px',
                      width: '50%',
                      textAlign: 'right'
                    }}>
                      金额
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
