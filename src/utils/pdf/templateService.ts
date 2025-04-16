
import { PdfTemplate, PdfSection, PdfField } from "@/types/pdfTemplates";
import { DEFAULT_TEMPLATES } from "@/constants/pdfTemplates";

// 根据模板ID获取模板
export const getTemplateById = (templateId: string): PdfTemplate => {
  const template = DEFAULT_TEMPLATES.find(t => t.id === templateId);
  return template || DEFAULT_TEMPLATES[0]; // 如果找不到，返回默认模板
};

// 应用模板样式到DOM元素
export const applyTemplateStyles = (container: HTMLElement, template: PdfTemplate) => {
  const { styles, layout } = template;
  
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
    
    // 应用模板布局 - 隐藏不可见部分和字段
    applyLayoutVisibility(container, layout.sections);
    
    console.log("Template styles applied successfully");
  } catch (error) {
    console.error("Error applying template styles:", error);
  }
};

// 应用布局可见性设置
const applyLayoutVisibility = (container: HTMLElement, sections: PdfSection[]) => {
  try {
    // 处理节区可见性
    sections.forEach(section => {
      const sectionElement = container.querySelector(`[data-section="${section.id}"], [data-section-type="${section.type}"]`);
      if (sectionElement instanceof HTMLElement) {
        sectionElement.style.display = section.visible ? 'block' : 'none';
        
        // 处理字段可见性
        if (section.fields) {
          section.fields.forEach(field => {
            const fieldSelector = `[data-field="${field.sourceField}"], [data-field-id="${field.id}"]`;
            const fieldElement = sectionElement.querySelector(fieldSelector);
            
            if (fieldElement instanceof HTMLElement) {
              fieldElement.style.display = field.visible ? '' : 'none';
              
              // 应用字段样式（如果有）
              if (field.style) {
                if (field.style.fontWeight) fieldElement.style.fontWeight = field.style.fontWeight;
                if (field.style.color) fieldElement.style.color = field.style.color;
                if (field.style.alignment) fieldElement.style.textAlign = field.style.alignment;
              }
              
              // 应用前缀和后缀（如果有）
              if (field.type === 'number' || field.type === 'text') {
                const textContent = fieldElement.textContent || '';
                
                if (field.prefix || field.suffix) {
                  const value = textContent.replace(field.prefix || '', '').replace(field.suffix || '', '');
                  fieldElement.textContent = `${field.prefix || ''}${value}${field.suffix || ''}`;
                }
              }
            }
          });
        }
      }
    });
  } catch (error) {
    console.error("Error applying layout visibility:", error);
  }
};
