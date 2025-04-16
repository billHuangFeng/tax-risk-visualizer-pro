
import { PdfTemplate } from "@/types/pdfTemplates";
import { DEFAULT_TEMPLATES } from "@/constants/pdfTemplates";

// 根据模板ID获取模板
export const getTemplateById = (templateId: string): PdfTemplate => {
  const template = DEFAULT_TEMPLATES.find(t => t.id === templateId);
  return template || DEFAULT_TEMPLATES[0]; // 如果找不到，返回默认模板
};

// 应用模板样式到DOM元素
export const applyTemplateStyles = (container: HTMLElement, template: PdfTemplate) => {
  const { styles } = template;
  
  try {
    // 应用全局样式
    container.style.fontFamily = styles.fontFamily;
    container.style.padding = styles.layout.pageMargin;
    
    // 应用标题样式
    const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headings.forEach(heading => {
      if (heading instanceof HTMLElement) {
        heading.style.fontSize = styles.headingStyle.fontSize;
        heading.style.fontWeight = styles.headingStyle.fontWeight;
        heading.style.color = styles.headingStyle.color;
        heading.style.borderBottom = styles.headingStyle.borderBottom || '';
        heading.style.marginBottom = styles.headingStyle.marginBottom || '16px';
        heading.style.paddingBottom = '8px';
      }
    });
    
    // 应用表格样式
    const tables = container.querySelectorAll('table');
    tables.forEach(table => {
      if (table instanceof HTMLElement) {
        table.style.borderCollapse = 'collapse';
        table.style.width = '100%';
        table.style.marginBottom = styles.layout.sectionSpacing;
        
        // 应用表头样式
        const headerCells = table.querySelectorAll('th');
        headerCells.forEach(cell => {
          if (cell instanceof HTMLElement) {
            cell.style.backgroundColor = styles.tableStyle.headerBgColor;
            cell.style.padding = styles.tableStyle.cellPadding;
            cell.style.border = `1px solid ${styles.tableStyle.borderColor}`;
          }
        });
        
        // 应用单元格样式
        const cells = table.querySelectorAll('td');
        cells.forEach(cell => {
          if (cell instanceof HTMLElement) {
            cell.style.padding = styles.tableStyle.cellPadding;
            cell.style.border = `1px solid ${styles.tableStyle.borderColor}`;
          }
        });
      }
    });
    
    // 应用表单字段样式
    const labels = container.querySelectorAll('.label-field');
    labels.forEach(label => {
      if (label instanceof HTMLElement) {
        label.style.color = styles.formFieldStyle.labelColor;
      }
    });
    
    const valueFields = container.querySelectorAll('.pdf-value');
    valueFields.forEach(field => {
      if (field instanceof HTMLElement) {
        field.style.border = `1px solid ${styles.formFieldStyle.borderColor}`;
        field.style.padding = styles.formFieldStyle.padding;
      }
    });
    
    // 应用部分间距
    const sections = container.querySelectorAll('section, [class*="section"]');
    sections.forEach(section => {
      if (section instanceof HTMLElement) {
        section.style.marginBottom = styles.layout.sectionSpacing;
      }
    });
    
    // 应用复选框样式
    const checkboxes = container.querySelectorAll('[role="checkbox"]');
    checkboxes.forEach(checkbox => {
      if (checkbox instanceof HTMLElement) {
        checkbox.style.border = `1px solid ${styles.formFieldStyle.borderColor}`;
      }
    });
    
    console.log("Template styles applied successfully");
  } catch (error) {
    console.error("Error applying template styles:", error);
  }
};
