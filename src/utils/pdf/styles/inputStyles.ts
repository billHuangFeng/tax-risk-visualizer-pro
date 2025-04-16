
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
        if (parentElement instanceof HTMLElement) {
          let valueDisplay = parentElement.querySelector('.pdf-value');
          
          if (!valueDisplay) {
            valueDisplay = document.createElement('div');
            valueDisplay.className = 'pdf-value';
            parentElement.appendChild(valueDisplay);
          }
          
          // Style the value display element
          if (valueDisplay instanceof HTMLElement) {
            valueDisplay.textContent = value;
            valueDisplay.style.minWidth = '120px';
            valueDisplay.style.display = 'inline-block';
            valueDisplay.style.visibility = 'visible';
            valueDisplay.style.opacity = '1';
            valueDisplay.style.border = '1px solid #000';
            valueDisplay.style.padding = '4px 8px';
            valueDisplay.style.textAlign = 'right';
            
            // Handle number inputs specially
            if (input.type === 'number' || 
                input.id?.includes('Revenue') || 
                input.id?.includes('Expense') || 
                input.id?.includes('Amount') || 
                input.id?.includes('Value')) {
              try {
                // Format number values
                if (value && !isNaN(Number(value))) {
                  valueDisplay.textContent = Number(value).toLocaleString('zh-CN', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  });
                }
              } catch (e) {
                console.warn('Number formatting error:', e);
              }
              
              // Add unit suffix if needed
              if (input.dataset.unit || 
                  input.id?.includes('Revenue') || 
                  input.id?.includes('Expense') || 
                  input.id?.includes('Tax')) {
                const unitLabel = document.createElement('span');
                unitLabel.className = 'unit-label';
                unitLabel.textContent = input.dataset.unit || ' 万元';
                unitLabel.style.marginLeft = '4px';
                parentElement.appendChild(unitLabel);
              }
            }
          }
          
          // Hide the original input
          input.style.display = 'none';
        }
      }
    });
    
    // Handle special case of company name field
    const companyNameField = container.querySelector('#companyName, input[name="companyName"]');
    if (companyNameField instanceof HTMLInputElement) {
      const value = companyNameField.value || '';
      const parentElement = companyNameField.parentElement;
      
      if (parentElement) {
        let valueDisplay = parentElement.querySelector('.pdf-value');
        
        if (!valueDisplay) {
          valueDisplay = document.createElement('div');
          valueDisplay.className = 'pdf-value';
          parentElement.appendChild(valueDisplay);
        }
        
        if (valueDisplay instanceof HTMLElement) {
          valueDisplay.textContent = value;
          valueDisplay.style.border = '1px solid #000';
          valueDisplay.style.padding = '4px 8px';
          valueDisplay.style.display = 'inline-block';
          valueDisplay.style.minWidth = '200px';
          valueDisplay.style.textAlign = 'center';
        }
        
        companyNameField.style.display = 'none';
      }
    }
  } catch (error) {
    console.warn('Error processing input fields:', error);
  }
};
