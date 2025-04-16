
// Functions for handling layout structure in PDF export

export const enhanceLayoutStructure = (container: HTMLElement) => {
  try {
    // 处理标题和页眉
    const companyHeader = container.querySelector('.company-header');
    if (companyHeader instanceof HTMLElement) {
      companyHeader.style.textAlign = 'center';
      companyHeader.style.marginBottom = '20px';
      
      const headerH1 = companyHeader.querySelector('h1');
      if (headerH1 instanceof HTMLElement) {
        headerH1.style.fontSize = '18px';
        headerH1.style.fontWeight = 'normal';
        headerH1.style.margin = '0';
      }
      
      const headerSubtitle = companyHeader.querySelector('div:not(h1)');
      if (headerSubtitle instanceof HTMLElement) {
        headerSubtitle.style.fontSize = '14px';
        headerSubtitle.style.margin = '5px 0';
      }
    }
    
    // 处理使用说明框
    const instructionBox = container.querySelector('.instruction-box');
    if (instructionBox instanceof HTMLElement) {
      instructionBox.style.border = '1px solid #000';
      instructionBox.style.borderRadius = '5px';
      instructionBox.style.padding = '20px';
      instructionBox.style.marginBottom = '30px';
      instructionBox.style.textAlign = 'center';
      
      const icon = instructionBox.querySelector('.info-icon');
      if (icon instanceof HTMLElement) {
        icon.style.display = 'inline-block';
        icon.style.border = '1px solid #000';
        icon.style.borderRadius = '50%';
        icon.style.width = '20px';
        icon.style.height = '20px';
        icon.style.lineHeight = '20px';
        icon.style.marginBottom = '10px';
        icon.style.textAlign = 'center';
      }
    }
    
    // 处理基本信息标题
    const basicInfoTitle = container.querySelector('.section-title.basic-info');
    if (basicInfoTitle instanceof HTMLElement) {
      basicInfoTitle.style.display = 'flex';
      basicInfoTitle.style.alignItems = 'center';
      basicInfoTitle.style.marginBottom = '10px';
      
      const titleBar = basicInfoTitle.querySelector('.title-bar');
      if (titleBar instanceof HTMLElement) {
        titleBar.style.width = '3px';
        titleBar.style.height = '16px';
        titleBar.style.backgroundColor = '#000';
        titleBar.style.marginRight = '5px';
      }
      
      const titleText = basicInfoTitle.querySelector('.title-text');
      if (titleText instanceof HTMLElement) {
        titleText.style.fontSize = '16px';
        titleText.style.fontWeight = 'bold';
      }
    }
    
    // 处理分隔线
    const separators = container.querySelectorAll('.separator');
    separators.forEach(separator => {
      if (separator instanceof HTMLElement) {
        separator.style.height = '1px';
        separator.style.backgroundColor = '#000';
        separator.style.marginBottom = '20px';
      }
    });
    
    // 处理表单字段
    const formFields = container.querySelectorAll('.form-field');
    formFields.forEach(field => {
      if (field instanceof HTMLElement) {
        field.style.marginBottom = '15px';
        
        const label = field.querySelector('.field-label');
        if (label instanceof HTMLElement) {
          label.style.marginBottom = '5px';
        }
        
        const input = field.querySelector('.field-input');
        if (input instanceof HTMLElement) {
          input.style.border = '1px solid #000';
          input.style.padding = '8px';
          input.style.width = '100%';
          input.style.boxSizing = 'border-box';
        }
      }
    });
    
    // 处理复选框
    const checkboxes = container.querySelectorAll('.checkbox-container');
    checkboxes.forEach(checkbox => {
      if (checkbox instanceof HTMLElement) {
        checkbox.style.display = 'flex';
        checkbox.style.alignItems = 'flex-start';
        checkbox.style.marginBottom = '15px';
        
        const box = checkbox.querySelector('.checkbox');
        if (box instanceof HTMLElement) {
          box.style.minWidth = '20px';
          box.style.height = '20px';
          box.style.border = '1px solid #000';
          box.style.marginRight = '8px';
          
          if (box.classList.contains('checked')) {
            box.style.position = 'relative';
            
            const checkmark = box.querySelector('.checkmark');
            if (!checkmark) {
              const mark = document.createElement('span');
              mark.className = 'checkmark';
              mark.style.position = 'absolute';
              mark.style.top = '-3px';
              mark.style.left = '3px';
              mark.textContent = '✓';
              box.appendChild(mark);
            }
          }
        }
        
        const label = checkbox.querySelector('.checkbox-label');
        if (label instanceof HTMLElement) {
          label.style.flex = '1';
        }
      }
    });
    
    // 处理表格
    const tables = container.querySelectorAll('table');
    tables.forEach(table => {
      if (table instanceof HTMLElement) {
        table.style.borderCollapse = 'collapse';
        table.style.width = '100%';
        
        const cells = table.querySelectorAll('td, th');
        cells.forEach(cell => {
          if (cell instanceof HTMLElement) {
            cell.style.border = '1px solid #000';
            cell.style.padding = '8px';
            cell.style.textAlign = 'right';
          }
        });
      }
    });
  } catch (error) {
    console.error('Error in enhanceLayoutStructure:', error);
  }
};
