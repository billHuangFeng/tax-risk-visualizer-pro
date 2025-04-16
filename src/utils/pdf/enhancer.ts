import { removeRedundantTextElements } from './textProcessing';
import { enhanceLayoutStructure } from './layoutStructure';
import { createCompanyHeader, enhanceHeadings } from './styles/headerStyles';
import { enhanceTableLayout } from './styles/tableStyles';
import { formatLabelValue, enhanceCheckboxes } from './styles/formStyles';
import { processTextElements } from './styles/textStyles';
import { processInputFields } from './styles/inputStyles';
import { enhanceSpecificSections } from './styles/sectionStyles';
import { PdfTemplate } from '@/types/pdfTemplates';
import { ensureElementsVisibility } from './styles/visibilityStyles';

export const enhanceLayout = (container: HTMLElement, template?: PdfTemplate) => {
  try {
    console.log("Starting PDF layout enhancement");
    
    // 应用全局样式
    container.style.fontFamily = template?.styles.fontFamily || "SimSun, serif";
    container.style.color = "#000000";
    container.style.backgroundColor = "#ffffff";
    container.style.padding = template?.styles.layout.pageMargin || "40px";
    container.style.width = "100%";
    container.style.boxSizing = "border-box";
    
    // 添加PDF导出类用于CSS定位
    container.classList.add('for-pdf-export');
    
    // 按正确顺序应用模板样式
    createCompanyHeader(container);
    enhanceHeadings(container, template);
    
    // 处理所有元素以确保正确的样式
    processTextElements(container);
    processInputFields(container);
    
    // 增强表单元素和布局
    enhanceCheckboxes(container, template);
    formatLabelValue(container, template);
    enhanceTableLayout(container, template);
    enhanceLayoutStructure(container);
    enhanceSpecificSections(container);
    
    // 添加分隔线，类似于图片中的样式
    addSectionSeparators(container);
    
    // 在标题前添加黑色方块标识符
    addSectionMarkers(container);
    
    // 移除冗余元素以获得更清晰的输出
    removeRedundantTextElements(container);
    
    // 强制为可能遗漏样式的特定元素应用样式
    forceApplyStyles(container, template);
    
    // 确保所有元素可见
    ensureElementsVisibility(container);
    
    console.log("PDF layout enhancement completed");
  } catch (error) {
    console.error('Error in layout enhancement:', error);
  }
};

const addSectionSeparators = (container: HTMLElement) => {
  try {
    const sections = container.querySelectorAll('h2, .section-title');
    sections.forEach(section => {
      if (section instanceof HTMLElement) {
        // 创建分隔线
        const separator = document.createElement('div');
        separator.style.height = '1px';
        separator.style.backgroundColor = '#000';
        separator.style.width = '100%';
        separator.style.marginTop = '8px';
        separator.style.marginBottom = '16px';
        
        // 如果section后面没有分隔线，添加一个
        if (!section.nextElementSibling || !section.nextElementSibling.classList.contains('pdf-separator')) {
          separator.className = 'pdf-separator';
          section.after(separator);
        }
      }
    });
  } catch (error) {
    console.error('Error adding section separators:', error);
  }
};

const addSectionMarkers = (container: HTMLElement) => {
  try {
    const mainSections = container.querySelectorAll('h2');
    mainSections.forEach(section => {
      if (section instanceof HTMLElement && !section.classList.contains('with-marker')) {
        section.classList.add('with-marker');
        
        // 创建黑色方块标识符
        const marker = document.createElement('span');
        marker.innerHTML = '&#9632; '; // 黑色方块 Unicode 字符
        marker.style.marginRight = '8px';
        marker.style.fontSize = '12px';
        
        // 添加标识符到标题前
        section.insertBefore(marker, section.firstChild);
      }
    });
  } catch (error) {
    console.error('Error adding section markers:', error);
  }
};

const forceApplyStyles = (container: HTMLElement, template?: PdfTemplate) => {
  try {
    const borderColor = template?.styles.tableStyle.borderColor || "#000";
    const headerBgColor = template?.styles.tableStyle.headerBgColor || "#f5f5f5";
    const cellPadding = template?.styles.tableStyle.cellPadding || "8px";
    
    // 强制对所有元素应用可见性和样式
    const allElements = container.querySelectorAll('*');
    allElements.forEach(el => {
      if (el instanceof HTMLElement) {
        el.style.visibility = 'visible';
        el.style.color = '#000';
        
        // 不显示应该隐藏的元素
        if (el.classList.contains('pdf-duplicate') || 
            el.classList.contains('hidden') || 
            el.tagName === 'BUTTON' ||
            (el.style.display === 'none' && !el.classList.contains('pdf-value'))) {
          el.style.display = 'none';
        }
      }
    });
    
    // 确保复选框选中状态可见
    const checkboxes = container.querySelectorAll('[role="checkbox"]');
    checkboxes.forEach((checkbox) => {
      if (checkbox instanceof HTMLElement) {
        checkbox.style.border = `1px solid ${borderColor}`;
        checkbox.style.minWidth = '14px';
        checkbox.style.minHeight = '14px';
        checkbox.style.display = 'inline-block';
        
        if (checkbox.getAttribute('data-state') === 'checked') {
          // 如果不存在，创建勾选标记
          if (!checkbox.querySelector('.checkmark')) {
            const checkmark = document.createElement('div');
            checkmark.className = 'checkmark';
            checkmark.textContent = '✓';
            checkmark.style.position = 'absolute';
            checkmark.style.top = '-2px';
            checkmark.style.left = '2px';
            checkmark.style.fontSize = '14px';
            checkmark.style.fontWeight = 'bold';
            checkbox.appendChild(checkmark);
          }
        }
      }
    });
    
    // 正确设置表格样式
    const tables = container.querySelectorAll('table');
    tables.forEach((table) => {
      if (table instanceof HTMLElement) {
        table.style.borderCollapse = 'collapse';
        table.style.width = '100%';
        table.style.marginBottom = '20px';
        
        // 表头单元格
        const headerCells = table.querySelectorAll('th');
        headerCells.forEach((cell) => {
          if (cell instanceof HTMLElement) {
            cell.style.border = `1px solid ${borderColor}`;
            cell.style.padding = cellPadding;
            cell.style.backgroundColor = headerBgColor;
            cell.style.fontWeight = 'bold';
          }
        });
        
        // 表格单元格
        const cells = table.querySelectorAll('td');
        cells.forEach((cell) => {
          if (cell instanceof HTMLElement) {
            cell.style.border = `1px solid ${borderColor}`;
            cell.style.padding = cellPadding;
            cell.style.textAlign = 'right';
            
            // 第一列左对齐
            if (cell instanceof HTMLTableCellElement && cell.cellIndex === 0) {
              cell.style.textAlign = 'left';
            }
          }
        });
      }
    });
    
    // 确保表单网格正确显示
    const gridRows = container.querySelectorAll('[class*="grid"]');
    gridRows.forEach((row) => {
      if (row instanceof HTMLElement && !row.classList.contains('grid-cols-1')) {
        row.style.display = 'grid';
        row.style.gridTemplateColumns = 'repeat(2, 1fr)';
        row.style.gap = '20px';
        row.style.alignItems = 'center';
        row.style.marginBottom = '12px';
      }
    });
  } catch (error) {
    console.error('Error forcing styles:', error);
  }
};
