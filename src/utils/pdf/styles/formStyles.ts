
import { PdfTemplate } from '@/types/pdfTemplates';

export const formatLabelValue = (container: HTMLElement, template?: PdfTemplate) => {
  try {
    // 查找所有表单字段行
    const formRows = container.querySelectorAll('.form-row');
    formRows.forEach((row) => {
      if (row instanceof HTMLElement) {
        // 设置行样式
        row.style.display = 'flex';
        row.style.marginBottom = '15px';
        
        // 标签列
        const label = row.querySelector('.field-label');
        if (label instanceof HTMLElement) {
          label.style.flex = '1';
        }
        
        // 值列
        const valueColumn = row.querySelector('.field-value');
        if (valueColumn instanceof HTMLElement) {
          valueColumn.style.flex = '1';
          valueColumn.style.textAlign = 'right';
          
          // 输入值显示
          const valueDisplay = valueColumn.querySelector('.value-display');
          if (valueDisplay instanceof HTMLElement) {
            valueDisplay.style.border = '1px solid #000';
            valueDisplay.style.padding = '8px';
            valueDisplay.style.display = 'inline-block';
            valueDisplay.style.minWidth = '150px';
            valueDisplay.style.textAlign = 'right';
          }
          
          // 单位标签
          const unitLabel = valueColumn.querySelector('.unit-label');
          if (unitLabel instanceof HTMLElement) {
            unitLabel.style.marginLeft = '5px';
          }
        }
      }
    });
    
    // 处理复选框行
    const checkboxRows = container.querySelectorAll('.checkbox-row');
    checkboxRows.forEach((row) => {
      if (row instanceof HTMLElement) {
        row.style.display = 'flex';
        row.style.alignItems = 'flex-start';
        row.style.marginBottom = '15px';
        
        // 复选框
        const checkbox = row.querySelector('.checkbox');
        if (checkbox instanceof HTMLElement) {
          checkbox.style.minWidth = '20px';
          checkbox.style.height = '20px';
          checkbox.style.border = '1px solid #000';
          checkbox.style.marginRight = '8px';
          
          // 检查是否选中
          if (checkbox.classList.contains('checked')) {
            checkbox.style.position = 'relative';
            
            // 添加对勾
            if (!checkbox.querySelector('.checkmark')) {
              const checkmark = document.createElement('span');
              checkmark.className = 'checkmark';
              checkmark.textContent = '✓';
              checkmark.style.position = 'absolute';
              checkmark.style.top = '-3px';
              checkmark.style.left = '3px';
              checkbox.appendChild(checkmark);
            }
          }
        }
        
        // 复选框标签
        const label = row.querySelector('.checkbox-label');
        if (label instanceof HTMLElement) {
          label.style.flex = '1';
        }
      }
    });
  } catch (error) {
    console.error('Error formatting label-value pairs:', error);
  }
};

export const enhanceCheckboxes = (container: HTMLElement) => {
  try {
    // 查找所有复选框
    const checkboxes = container.querySelectorAll('.checkbox, [role="checkbox"]');
    checkboxes.forEach((checkbox) => {
      if (checkbox instanceof HTMLElement) {
        // 基本样式
        checkbox.style.minWidth = '20px';
        checkbox.style.height = '20px';
        checkbox.style.border = '1px solid #000';
        checkbox.style.display = 'inline-block';
        checkbox.style.marginRight = '8px';
        checkbox.style.position = 'relative';
        
        // 确定选中状态
        const isChecked = 
          checkbox.getAttribute('data-state') === 'checked' || 
          checkbox.classList.contains('checked') ||
          (checkbox instanceof HTMLInputElement && checkbox.checked);
        
        // 为选中状态添加对勾
        if (isChecked) {
          // 检查是否已有对勾
          if (!checkbox.querySelector('.checkmark')) {
            const checkmark = document.createElement('span');
            checkmark.className = 'checkmark';
            checkmark.textContent = '✓';
            checkmark.style.position = 'absolute';
            checkmark.style.top = '-3px';
            checkmark.style.left = '3px';
            checkbox.appendChild(checkmark);
          }
        }
      }
    });
  } catch (error) {
    console.error('Error enhancing checkboxes:', error);
  }
};
