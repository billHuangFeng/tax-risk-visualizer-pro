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
    
    // 应用标题样式 - 改为与预览一致的样式
    const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headings.forEach(heading => {
      if (heading instanceof HTMLElement) {
        // 对于h1（公司名称标题），应用居中样式
        if (heading.tagName === 'H1') {
          heading.style.fontSize = '20px';
          heading.style.fontWeight = 'normal';
          heading.style.textAlign = 'center';
          heading.style.marginBottom = '8px';
        } else {
          // 对于其他标题（如h2）
          heading.style.fontSize = styles.headingStyle.fontSize;
          heading.style.fontWeight = 'normal';
          heading.style.color = styles.headingStyle.color;
          heading.style.marginBottom = '16px';
          heading.style.paddingBottom = '2px';
        }
      }
    });
    
    // 应用表格样式
    const tables = container.querySelectorAll('table');
    tables.forEach(table => {
      if (table instanceof HTMLTableElement) {
        table.style.borderCollapse = 'collapse';
        table.style.width = '100%';
        table.style.marginBottom = styles.layout.sectionSpacing;
        
        // 应用表头样式
        const headerCells = table.querySelectorAll('th');
        headerCells.forEach(cell => {
          if (cell instanceof HTMLTableCellElement) {
            cell.style.backgroundColor = '#ffffff';
            cell.style.padding = styles.tableStyle.cellPadding;
            cell.style.border = `1px solid ${styles.tableStyle.borderColor}`;
            cell.style.fontWeight = 'normal';
            
            if (cell === headerCells[0]) {
              cell.style.textAlign = 'left';
            } else {
              cell.style.textAlign = 'right';
            }
          }
        });
        
        // 应用单元格样式
        const cells = table.querySelectorAll('td');
        cells.forEach(cell => {
          if (cell instanceof HTMLTableCellElement) {
            cell.style.padding = styles.tableStyle.cellPadding;
            cell.style.border = `1px solid ${styles.tableStyle.borderColor}`;
            
            const row = cell.parentElement;
            if (row instanceof HTMLTableRowElement) {
              const isFirstCell = Array.from(row.cells).indexOf(cell) === 0;
              cell.style.textAlign = isFirstCell ? 'left' : 'right';
              
              const tbody = row.parentElement;
              if (tbody instanceof HTMLTableSectionElement && 
                  Array.from(tbody.rows).indexOf(row) === tbody.rows.length - 1) {
                cell.style.fontWeight = 'bold';
              }
            }
          }
        });
      }
    });
    
    // 应用表单字段样式
    const valueFields = container.querySelectorAll('.pdf-value, [class*="border"]');
    valueFields.forEach(field => {
      if (field instanceof HTMLElement) {
        field.style.border = `1px solid #000`;
        field.style.padding = '4px 8px';
      }
    });
    
    // 适用复选框的正确样式
    const checkboxes = container.querySelectorAll('[role="checkbox"]');
    checkboxes.forEach(checkbox => {
      if (checkbox instanceof HTMLElement) {
        checkbox.style.display = 'inline-block';
        checkbox.style.width = '14px';
        checkbox.style.height = '14px';
        checkbox.style.border = '1px solid #000';
        checkbox.style.position = 'relative';
        
        // 添加勾选标记
        if (checkbox.getAttribute('data-state') === 'checked') {
          if (!checkbox.querySelector('.checkmark')) {
            const checkmark = document.createElement('span');
            checkmark.className = 'checkmark';
            checkmark.textContent = '✓';
            checkmark.style.position = 'absolute';
            checkmark.style.top = '-3px';
            checkmark.style.left = '1px';
            checkmark.style.fontSize = '14px';
            checkbox.appendChild(checkmark);
          }
        }
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
