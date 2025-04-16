
export const formatLabelValue = (container: HTMLElement) => {
  const rows = container.querySelectorAll('[class*="grid"]');
  rows.forEach((row) => {
    if (row instanceof HTMLElement) {
      const children = Array.from(row.children);
      
      if (children.length >= 2) {
        const labelEl = children[0];
        const valueEl = children[1];
        
        if (labelEl instanceof HTMLElement) {
          labelEl.style.textAlign = 'left';
          labelEl.style.paddingRight = '8px';
          labelEl.style.fontSize = '14px';
          labelEl.style.fontWeight = 'normal';
        }
        
        if (valueEl instanceof HTMLElement) {
          valueEl.style.textAlign = 'left';
          
          const input = valueEl.querySelector('input');
          if (input instanceof HTMLInputElement) {
            const value = input.value || input.getAttribute('data-value') || '';
            
            let valueDisplay = valueEl.querySelector('.pdf-value');
            if (!valueDisplay) {
              valueDisplay = document.createElement('span');
              valueDisplay.className = 'pdf-value';
              valueEl.appendChild(valueDisplay);
            }
            
            if (valueDisplay instanceof HTMLElement) {
              valueDisplay.textContent = value;
              valueDisplay.style.borderBottom = '1px solid #000';
              valueDisplay.style.minWidth = '120px';
              valueDisplay.style.display = 'inline-block';
              valueDisplay.style.padding = '4px';
            }
            
            // Add unit label if needed
            if (input.dataset.unit) {
              const unitLabel = document.createElement('span');
              unitLabel.className = 'unit-label';
              unitLabel.textContent = input.dataset.unit;
              unitLabel.style.marginLeft = '4px';
              valueEl.appendChild(unitLabel);
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
      checkbox.style.width = '14px';
      checkbox.style.height = '14px';
      checkbox.style.border = '1px solid #000';
      checkbox.style.display = 'inline-block';
      checkbox.style.verticalAlign = 'middle';
      checkbox.style.marginRight = '8px';
      checkbox.style.position = 'relative';
      
      if (checkbox.getAttribute('data-state') === 'checked') {
        const checkmark = document.createElement('span');
        checkmark.textContent = '✓';
        checkmark.style.position = 'absolute';
        checkmark.style.top = '-3px';
        checkmark.style.left = '2px';
        checkmark.style.fontSize = '14px';
        checkbox.appendChild(checkmark);
      }
    }
  });
};
