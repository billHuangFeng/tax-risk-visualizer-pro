
// Functions for styling input fields in PDF export
export const processInputFields = (container: HTMLElement) => {
  try {
    // Process all inputs
    const inputs = container.querySelectorAll('input');
    inputs.forEach((input) => {
      if (input instanceof HTMLInputElement) {
        const value = input.value || input.getAttribute('data-value') || '';
        
        const parentElement = input.parentElement;
        if (parentElement instanceof HTMLElement) {
          let valueDisplay = parentElement.querySelector('.pdf-value');
          if (!valueDisplay) {
            valueDisplay = document.createElement('div');
            valueDisplay.className = 'pdf-value';
            parentElement.appendChild(valueDisplay);
          }
          
          if (valueDisplay instanceof HTMLElement) {
            valueDisplay.textContent = value;
            valueDisplay.style.display = 'inline-block';
            valueDisplay.style.visibility = 'visible';
            valueDisplay.style.opacity = '1';
            valueDisplay.style.fontWeight = 'normal';
            valueDisplay.style.border = '1px solid #000';
            valueDisplay.style.padding = '4px 8px';
            valueDisplay.style.minWidth = '120px';
            valueDisplay.style.minHeight = '20px';
            valueDisplay.style.textAlign = 'right';
          }
          
          input.style.display = 'none';
        }
      }
    });

    // Special handling for number inputs
    const numberInputs = container.querySelectorAll('.pdf-text-visible, [class*="grid"] > div:nth-child(2)');
    numberInputs.forEach(container => {
      if (container instanceof HTMLElement) {
        container.style.display = 'flex';
        container.style.justifyContent = 'flex-end';
        container.style.alignItems = 'center';
        
        const input = container.querySelector('input');
        if (input instanceof HTMLInputElement) {
          const value = input.value || '0';
          
          let valueDisplay = container.querySelector('.pdf-value');
          if (!valueDisplay) {
            valueDisplay = document.createElement('div');
            valueDisplay.className = 'pdf-value';
            container.appendChild(valueDisplay);
          }
          
          if (valueDisplay instanceof HTMLElement) {
            valueDisplay.textContent = value;
            valueDisplay.style.display = 'inline-block';
            valueDisplay.style.visibility = 'visible';
            valueDisplay.style.opacity = '1';
            valueDisplay.style.border = '1px solid #000';
            valueDisplay.style.padding = '4px 8px';
            valueDisplay.style.minWidth = '120px';
            valueDisplay.style.minHeight = '20px';
            valueDisplay.style.textAlign = 'right';
          }
          
          if (input.id && (
            input.id.includes('Revenue') || 
            input.id.includes('Expense') || 
            input.id.includes('Tax') || 
            input.id.includes('Assets')
          )) {
            const unitLabel = document.createElement('span');
            unitLabel.textContent = ' 万元';
            unitLabel.style.marginLeft = '4px';
            container.appendChild(unitLabel);
          }
          
          input.style.display = 'none';
        }
      }
    });
  } catch (error) {
    console.warn('Error processing input fields:', error);
  }
};

