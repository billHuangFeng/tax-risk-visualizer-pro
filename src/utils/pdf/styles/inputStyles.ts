
// Functions for styling input fields in PDF export
export const processInputFields = (container: HTMLElement) => {
  try {
    // Process all input elements for visibility in PDF
    const inputs = container.querySelectorAll('input');
    inputs.forEach((input) => {
      if (input instanceof HTMLInputElement) {
        const value = input.value || input.getAttribute('data-value') || '';
        
        // Find or create a visible element to display the input value
        const parentElement = input.parentElement;
        if (parentElement) {
          let valueDisplay = parentElement.querySelector('.pdf-value');
          
          if (!valueDisplay) {
            valueDisplay = document.createElement('div');
            valueDisplay.className = 'pdf-value pdf-only';
            const valueDisplayElement = valueDisplay as HTMLElement;
            valueDisplayElement.style.display = 'none';
            parentElement.appendChild(valueDisplay);
          } 
          
          if (valueDisplay instanceof HTMLElement) {
            // Format the value if it's a number
            let displayValue = value;
            if (!isNaN(Number(value))) {
              try {
                displayValue = Number(value).toLocaleString('zh-CN', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                });
              } catch (e) {
                console.warn('Number formatting error:', e);
              }
            }
            
            valueDisplay.textContent = displayValue;
            valueDisplay.style.minWidth = '120px';
            valueDisplay.style.display = 'block';
            valueDisplay.style.visibility = 'visible';
            valueDisplay.style.opacity = '1';
            valueDisplay.style.border = '1px solid #000';
            valueDisplay.style.padding = '4px 8px';
            valueDisplay.style.textAlign = 'right';
            valueDisplay.dataset.pdfOnly = 'true';
            
            // Determine if we need to add a unit
            let unit = '';
            if (input.id?.includes('Percentage') || input.id?.includes('Rate')) {
              unit = '%';
            } else if (input.id?.includes('Revenue') || 
                      input.id?.includes('Expense') || 
                      input.id?.includes('Amount') || 
                      input.id?.includes('Value') ||
                      input.id?.includes('Tax')) {
              unit = input.dataset.unit || ' 万元';
            }
            
            // Add unit if needed
            if (unit) {
              let unitLabel = parentElement.querySelector('.unit-label');
              if (!unitLabel) {
                unitLabel = document.createElement('span');
                unitLabel.className = 'unit-label pdf-only';
                const unitLabelElement = unitLabel as HTMLElement;
                unitLabelElement.style.marginLeft = '4px';
                unitLabelElement.style.fontSize = '14px';
                unitLabelElement.textContent = unit;
                unitLabelElement.style.display = 'none';
                unitLabelElement.dataset.pdfOnly = 'true';
                parentElement.appendChild(unitLabel);
              }
            }
          }
        }
      }
    });
  } catch (error) {
    console.warn('Error processing input fields:', error);
  }
};
