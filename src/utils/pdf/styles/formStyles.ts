
import { PdfTemplate } from '@/types/pdfTemplates';

export const formatLabelValue = (container: HTMLElement, template?: PdfTemplate) => {
  try {
    const borderColor = template?.styles.formFieldStyle.borderColor || '#000';
    const padding = template?.styles.formFieldStyle.padding || '4px 8px';
    const labelColor = template?.styles.formFieldStyle.labelColor || '#000';
    
    // 查找包含表单字段的所有网格布局
    const formRows = container.querySelectorAll('[class*="grid"]');
    formRows.forEach((row) => {
      if (row instanceof HTMLElement && !row.classList.contains('grid-cols-1')) {
        // 设置网格布局样式
        row.style.display = 'grid';
        row.style.gridTemplateColumns = '1fr 1fr';
        row.style.gap = '16px';
        row.style.alignItems = 'center';
        row.style.marginBottom = '8px';
        
        // 获取直接子元素（应该是标签和值）
        const children = Array.from(row.children);
        
        if (children.length >= 2) {
          // 设置标签元素（第一个子元素）的样式
          const labelEl = children[0];
          if (labelEl instanceof HTMLElement) {
            labelEl.style.textAlign = 'left';
            labelEl.style.fontWeight = 'normal';
            labelEl.style.fontSize = '14px';
            labelEl.style.display = 'block';
            labelEl.style.color = labelColor;
          }
          
          // 设置值元素（第二个子元素）的样式
          const valueEl = children[1];
          if (valueEl instanceof HTMLElement) {
            valueEl.style.textAlign = 'right';
            
            // 处理输入值
            const input = valueEl.querySelector('input');
            if (input instanceof HTMLInputElement) {
              const value = input.value || input.getAttribute('data-value') || '';
              
              // 创建或查找值显示元素
              let valueDisplay = valueEl.querySelector('.pdf-value');
              if (!valueDisplay) {
                valueDisplay = document.createElement('span');
                valueDisplay.className = 'pdf-value';
                valueEl.appendChild(valueDisplay);
              }
              
              // 设置值显示样式
              if (valueDisplay instanceof HTMLElement) {
                valueDisplay.textContent = value;
                valueDisplay.style.minWidth = '120px';
                valueDisplay.style.border = `1px solid ${borderColor}`; 
                valueDisplay.style.display = 'inline-block';
                valueDisplay.style.padding = padding;
                valueDisplay.style.textAlign = 'right';
              }
              
              // 如果指定了单位标签，添加它
              if (input.dataset.unit) {
                let unitLabel = valueEl.querySelector('.unit-label');
                if (!unitLabel) {
                  unitLabel = document.createElement('span');
                  unitLabel.className = 'unit-label';
                  if (unitLabel instanceof HTMLElement) {
                    unitLabel.textContent = input.dataset.unit;
                    unitLabel.style.marginLeft = '4px';
                    valueEl.appendChild(unitLabel);
                  }
                }
              }
              
              // 隐藏原始输入
              input.style.display = 'none';
            }
          }
        }
      }
    });
    
    // 处理公司名称特定字段
    const companyNameField = container.querySelector('.basic-info-companyName');
    if (companyNameField instanceof HTMLElement) {
      companyNameField.style.marginBottom = '24px';
    }
  } catch (error) {
    console.error('Error formatting label-value pairs:', error);
  }
};

export const enhanceCheckboxes = (container: HTMLElement, template?: PdfTemplate) => {
  try {
    const borderColor = template?.styles.formFieldStyle.borderColor || '#000';
    
    // 增强复选框样式
    const checkboxes = container.querySelectorAll('[role="checkbox"]');
    checkboxes.forEach((checkbox) => {
      if (checkbox instanceof HTMLElement) {
        // 基本复选框样式
        checkbox.style.width = '16px';
        checkbox.style.height = '16px';
        checkbox.style.border = `1px solid ${borderColor}`;
        checkbox.style.display = 'inline-block';
        checkbox.style.verticalAlign = 'middle';
        checkbox.style.marginRight = '8px';
        checkbox.style.position = 'relative';
        checkbox.style.backgroundColor = 'white';
        
        // 为选中状态添加对勾
        if (checkbox.getAttribute('data-state') === 'checked') {
          let checkmark = checkbox.querySelector('.checkmark');
          
          // 如果不存在，创建对勾
          if (!checkmark) {
            checkmark = document.createElement('span');
            checkmark.className = 'checkmark';
            checkmark.textContent = '✓';
            if (checkmark instanceof HTMLElement) {
              checkmark.style.position = 'absolute';
              checkmark.style.top = '-2px';
              checkmark.style.left = '2px';
              checkmark.style.fontSize = '14px';
              checkbox.appendChild(checkmark);
            }
          }
          
          if (checkmark instanceof HTMLElement) {
            checkmark.style.color = 'black';
            checkmark.style.fontWeight = 'bold';
          }
        }
        
        // 设置跟随复选框的标签的样式
        const label = checkbox.nextElementSibling;
        if (label instanceof HTMLElement) {
          label.style.display = 'inline-block';
          label.style.verticalAlign = 'middle';
          label.style.marginLeft = '4px';
          label.style.fontSize = '14px';
        }
      }
    });
    
    // 为更好的布局设置复选框容器的样式
    const checkboxContainers = container.querySelectorAll('.checkbox-container, [class*="checkbox"]');
    checkboxContainers.forEach((container) => {
      if (container instanceof HTMLElement) {
        container.style.display = 'flex';
        container.style.alignItems = 'center';
        container.style.marginBottom = '8px';
      }
    });
  } catch (error) {
    console.error('Error enhancing checkboxes:', error);
  }
};
