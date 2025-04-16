
export const formatLabelValue = (container: HTMLElement) => {
  const gridRows = container.querySelectorAll('[class*="grid"]');
  gridRows.forEach((row) => {
    if (row instanceof HTMLElement) {
      const children = Array.from(row.children);
      
      if (children.length >= 2) {
        const labelEl = children[0];
        const valueEl = children[1];
        
        if (labelEl instanceof HTMLElement) {
          labelEl.style.textAlign = 'left';
          labelEl.style.paddingRight = '16px';
        }
        
        if (valueEl instanceof HTMLElement) {
          valueEl.style.textAlign = 'right';
          
          const input = valueEl.querySelector('input');
          if (input instanceof HTMLInputElement) {
            const value = input.value || input.getAttribute('data-value') || '';
            
            let valueDisplay = valueEl.querySelector('.pdf-value');
            if (!valueDisplay) {
              valueDisplay = document.createElement('div');
              valueDisplay.className = 'pdf-value';
              valueEl.appendChild(valueDisplay);
            }
            
            if (valueDisplay instanceof HTMLElement) {
              const numValue = Number(value);
              valueDisplay.textContent = isNaN(numValue) ? value : 
                numValue.toLocaleString('zh-CN', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                });
            }
            
            input.style.display = 'none';
          }
        }
      }
    }
  });
};

export const enhanceCheckboxes = (container: HTMLElement) => {
  const checkboxes = container.querySelectorAll('[role="checkbox"]');
  checkboxes.forEach((checkbox) => {
    if (checkbox instanceof HTMLElement) {
      checkbox.style.width = '16px';
      checkbox.style.height = '16px';
      checkbox.style.border = '1px solid #000';
      checkbox.style.display = 'inline-block';
      checkbox.style.verticalAlign = 'middle';
      checkbox.style.marginRight = '8px';
      
      const isChecked = checkbox.getAttribute('data-state') === 'checked';
      
      if (isChecked) {
        checkbox.style.backgroundColor = '#000';
        checkbox.textContent = '✓';
        checkbox.style.color = '#fff';
        checkbox.style.textAlign = 'center';
        checkbox.style.lineHeight = '14px';
        checkbox.style.fontSize = '12px';
        checkbox.style.fontWeight = 'bold';
      } else {
        checkbox.style.backgroundColor = '#fff';
      }
    }
  });
};
