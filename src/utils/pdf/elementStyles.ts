
// Functions for styling elements for PDF export

// Process text elements for PDF display
export const processTextElements = (container: HTMLElement) => {
  try {
    // Style all text elements
    const textElements = container.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, label, div');
    textElements.forEach((el) => {
      if (el instanceof HTMLElement) {
        el.style.color = '#000';
        el.style.visibility = 'visible';
        el.style.opacity = '1';
        el.style.fontFamily = 'Arial, sans-serif';
        
        // Default font size
        if (!el.style.fontSize) {
          el.style.fontSize = '14px';
        }
        
        // Make sure text in children is visible too
        const children = el.querySelectorAll('*');
        children.forEach(child => {
          if (child instanceof HTMLElement) {
            child.style.color = '#000';
            child.style.visibility = 'visible';
          }
        });
      }
    });
    
    // Style section headings to match the image
    const headings = container.querySelectorAll('h1, h2, h3');
    headings.forEach(heading => {
      if (heading instanceof HTMLElement) {
        heading.style.fontWeight = 'bold';
        heading.style.marginTop = '16px';
        heading.style.marginBottom = '8px';
        
        if (heading.tagName === 'H1') {
          heading.style.fontSize = '20px';
          heading.style.textAlign = 'center';
        } else if (heading.tagName === 'H2') {
          heading.style.fontSize = '18px';
          heading.style.borderLeft = '4px solid #000';
          heading.style.paddingLeft = '10px';
        } else {
          heading.style.fontSize = '16px';
        }
      }
    });
    
    // Style field labels to match the image
    const labels = container.querySelectorAll('label, .label-text');
    labels.forEach(label => {
      if (label instanceof HTMLElement) {
        label.style.fontWeight = 'normal';
        label.style.fontSize = '14px';
        label.style.marginBottom = '4px';
        label.style.display = 'inline-block';
      }
    });
  } catch (error) {
    console.warn('Error processing text elements:', error);
  }
};

// Process input fields for PDF display
export const processInputFields = (container: HTMLElement) => {
  try {
    // Process all inputs
    const inputs = container.querySelectorAll('input');
    inputs.forEach((input) => {
      if (input instanceof HTMLInputElement) {
        // Get the input value
        const value = input.value || input.getAttribute('data-value') || '';
        
        // Get parent element
        const parentElement = input.parentElement;
        if (parentElement instanceof HTMLElement) {
          // Create a visible display of the input value
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
          
          // Hide the input
          input.style.display = 'none';
        }
      }
    });
    
    // Special handling for number inputs
    const numberInputs = container.querySelectorAll('.pdf-text-visible, [class*="grid"] > div:nth-child(2)');
    numberInputs.forEach(container => {
      if (container instanceof HTMLElement) {
        // Style container
        container.style.display = 'flex';
        container.style.justifyContent = 'flex-end';
        container.style.alignItems = 'center';
        
        // Find input in container
        const input = container.querySelector('input');
        if (input instanceof HTMLInputElement) {
          // Get value
          const value = input.value || '0';
          
          // Find or create value display
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
          
          // Add "万元" label after some inputs
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
          
          // Hide the input
          input.style.display = 'none';
        }
      }
    });
  } catch (error) {
    console.warn('Error processing input fields:', error);
  }
};

// Add extra styling for specific elements
export const enhanceSpecificElements = (container: HTMLElement) => {
  try {
    // Style the 基本信息 section
    const basicInfoSection = container.querySelector('h2:contains("基本信息")');
    if (basicInfoSection && basicInfoSection instanceof HTMLElement) {
      basicInfoSection.style.fontSize = '18px';
      basicInfoSection.style.fontWeight = 'bold';
      basicInfoSection.style.marginBottom = '16px';
      basicInfoSection.style.borderBottom = '1px solid #000';
    }
    
    // Style the 销售收入 section
    const revenueSection = container.querySelector('h2:contains("销售收入")');
    if (revenueSection && revenueSection instanceof HTMLElement) {
      revenueSection.style.fontSize = '18px';
      revenueSection.style.fontWeight = 'bold';
      revenueSection.style.marginTop = '24px';
      revenueSection.style.marginBottom = '16px';
      revenueSection.style.borderBottom = '1px solid #000';
    }
    
    // Style "其中:" labels
    const subheaderLabels = container.querySelectorAll('.subheader-label, div:contains("其中:")');
    subheaderLabels.forEach(label => {
      if (label instanceof HTMLElement) {
        label.style.fontStyle = 'italic';
        label.style.marginLeft = '20px';
        label.style.marginTop = '10px';
        label.style.marginBottom = '8px';
      }
    });
  } catch (error) {
    console.warn('Error enhancing specific elements:', error);
  }
};
