
export const formatLabelValue = (container: HTMLElement) => {
  try {
    // Find all grid layouts that contain form fields
    const formRows = container.querySelectorAll('[class*="grid"]');
    formRows.forEach((row) => {
      if (row instanceof HTMLElement && !row.classList.contains('grid-cols-1')) {
        // Set up grid layout styling
        row.style.display = 'grid';
        row.style.gridTemplateColumns = '1fr 1fr';
        row.style.gap = '16px';
        row.style.alignItems = 'center';
        row.style.marginBottom = '8px';
        
        // Get direct children (should be label and value)
        const children = Array.from(row.children);
        
        if (children.length >= 2) {
          // Style label element (first child)
          const labelEl = children[0];
          if (labelEl instanceof HTMLElement) {
            labelEl.style.textAlign = 'left';
            labelEl.style.fontWeight = 'normal';
            labelEl.style.fontSize = '14px';
            labelEl.style.display = 'block';
          }
          
          // Style value element (second child)
          const valueEl = children[1];
          if (valueEl instanceof HTMLElement) {
            valueEl.style.textAlign = 'right';
            
            // Handle input values
            const input = valueEl.querySelector('input');
            if (input instanceof HTMLInputElement) {
              const value = input.value || input.getAttribute('data-value') || '';
              
              // Create or find value display element
              let valueDisplay = valueEl.querySelector('.pdf-value');
              if (!valueDisplay) {
                valueDisplay = document.createElement('span');
                valueDisplay.className = 'pdf-value';
                valueEl.appendChild(valueDisplay);
              }
              
              // Style value display
              if (valueDisplay instanceof HTMLElement) {
                valueDisplay.textContent = value;
                valueDisplay.style.minWidth = '120px';
                valueDisplay.style.border = '1px solid #000'; 
                valueDisplay.style.display = 'inline-block';
                valueDisplay.style.padding = '4px 8px';
                valueDisplay.style.textAlign = 'right';
              }
              
              // Add unit label if specified
              if (input.dataset.unit) {
                let unitLabel = valueEl.querySelector('.unit-label');
                if (!unitLabel) {
                  unitLabel = document.createElement('span');
                  unitLabel.className = 'unit-label';
                  unitLabel.textContent = input.dataset.unit;
                  unitLabel.style.marginLeft = '4px';
                  valueEl.appendChild(unitLabel);
                }
              }
              
              // Hide the original input
              input.style.display = 'none';
            }
          }
        }
      }
    });
    
    // Handle specific field for company name
    const companyNameField = container.querySelector('.basic-info-companyName');
    if (companyNameField instanceof HTMLElement) {
      companyNameField.style.marginBottom = '24px';
    }
  } catch (error) {
    console.error('Error formatting label-value pairs:', error);
  }
};

export const enhanceCheckboxes = (container: HTMLElement) => {
  try {
    // Enhance checkbox styling
    const checkboxes = container.querySelectorAll('[role="checkbox"]');
    checkboxes.forEach((checkbox) => {
      if (checkbox instanceof HTMLElement) {
        // Basic checkbox styling
        checkbox.style.width = '16px';
        checkbox.style.height = '16px';
        checkbox.style.border = '1px solid #000';
        checkbox.style.display = 'inline-block';
        checkbox.style.verticalAlign = 'middle';
        checkbox.style.marginRight = '8px';
        checkbox.style.position = 'relative';
        checkbox.style.backgroundColor = 'white';
        
        // Add checkmark for checked state
        if (checkbox.getAttribute('data-state') === 'checked') {
          let checkmark = checkbox.querySelector('.checkmark');
          
          // Create checkmark if it doesn't exist
          if (!checkmark) {
            checkmark = document.createElement('span');
            checkmark.className = 'checkmark';
            checkmark.textContent = '✓';
            checkmark.style.position = 'absolute';
            checkmark.style.top = '-2px';
            checkmark.style.left = '2px';
            checkmark.style.fontSize = '14px';
            checkbox.appendChild(checkmark);
          }
          
          if (checkmark instanceof HTMLElement) {
            checkmark.style.color = 'black';
            checkmark.style.fontWeight = 'bold';
          }
        }
        
        // Style label that follows checkbox
        const label = checkbox.nextElementSibling;
        if (label instanceof HTMLElement) {
          label.style.display = 'inline-block';
          label.style.verticalAlign = 'middle';
          label.style.marginLeft = '4px';
          label.style.fontSize = '14px';
        }
      }
    });
    
    // Style checkbox containers for better layout
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
