
import { PdfTemplate } from '@/types/pdfTemplates';

export const enhanceTableLayout = (container: HTMLElement, template?: PdfTemplate) => {
  try {
    const tables = container.querySelectorAll('table');
    const borderColor = template?.styles.tableStyle.borderColor || "#000";
    const headerBgColor = template?.styles.tableStyle.headerBgColor || "#f5f5f5";
    const cellPadding = template?.styles.tableStyle.cellPadding || "8px";
    
    tables.forEach((table) => {
      if (table instanceof HTMLElement) {
        // 基本表格样式
        table.style.width = '100%';
        table.style.borderCollapse = 'collapse';
        table.style.marginBottom = '24px';
        table.style.pageBreakInside = 'avoid';
        table.style.border = `1px solid ${borderColor}`;
        
        // 处理所有表格单元格
        const cells = table.querySelectorAll('td, th');
        cells.forEach((cell) => {
          if (cell instanceof HTMLElement) {
            // 公共单元格样式
            cell.style.border = `1px solid ${borderColor}`;
            cell.style.padding = cellPadding;
            
            // 确定文本对齐方式
            if (cell.classList.contains('label-cell') || 
                cell.textContent?.includes('项目') || 
                cell.textContent?.includes('名称') ||
                (cell instanceof HTMLTableCellElement && cell.cellIndex === 0)) {
              cell.style.textAlign = 'left';
            } else {
              cell.style.textAlign = 'right';
            }
            
            // 格式化数字值
            const numValue = cell.textContent?.trim();
            if (numValue && !isNaN(Number(numValue)) && numValue !== '' && !numValue.includes('¥')) {
              try {
                cell.textContent = Number(numValue).toLocaleString('zh-CN', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                });
              } catch (e) {
                console.warn('Number formatting error:', e);
              }
            }
            
            // 处理单元格中的输入元素
            const input = cell.querySelector('input');
            if (input instanceof HTMLInputElement) {
              const value = input.value || input.getAttribute('data-value') || '0';
              
              try {
                // 格式化输入中的数字值
                if (!isNaN(Number(value))) {
                  cell.textContent = Number(value).toLocaleString('zh-CN', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  });
                } else {
                  cell.textContent = value;
                }
              } catch (e) {
                cell.textContent = value;
                console.warn('Input value formatting error:', e);
              }
              
              // 隐藏原始输入
              input.style.display = 'none';
            }
          }
        });
        
        // 不同地设置标题单元格的样式
        const headerCells = table.querySelectorAll('th');
        headerCells.forEach((cell) => {
          if (cell instanceof HTMLElement) {
            cell.style.fontWeight = 'bold';
            cell.style.backgroundColor = headerBgColor;
          }
        });
      }
    });
  } catch (error) {
    console.error('Error enhancing table layout:', error);
  }
};
