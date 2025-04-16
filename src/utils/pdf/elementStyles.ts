
// Functions for styling elements for PDF export

// Process text elements for PDF display
export const processTextElements = (container: HTMLElement) => {
  try {
    const textElements = container.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, label, div');
    textElements.forEach((el) => {
      if (el instanceof HTMLElement) {
        el.style.color = '#000';
        el.style.visibility = 'visible';
        el.style.opacity = '1';
        el.style.fontSize = '14px';
        
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
    
    // Make headings stand out
    const headings = container.querySelectorAll('h1, h2, h3, h4, h5');
    headings.forEach(heading => {
      if (heading instanceof HTMLElement) {
        heading.style.fontWeight = 'bold';
        heading.style.marginTop = '16px';
        heading.style.marginBottom = '8px';
        
        if (heading.tagName === 'H1') {
          heading.style.fontSize = '24px';
        } else if (heading.tagName === 'H2') {
          heading.style.fontSize = '20px';
        } else {
          heading.style.fontSize = '16px';
        }
      }
    });
  } catch (error) {
    console.warn('Error processing text elements:', error);
  }
};

// Process input fields for PDF display
export const processInputFields = (container: HTMLElement) => {
  try {
    const inputs = container.querySelectorAll('input');
    inputs.forEach((input) => {
      if (input instanceof HTMLInputElement) {
        // Get the input value
        const value = input.getAttribute('data-value') || input.value || '';
        
        // Find the parent container
        const parentElement = input.closest('.pdf-text-visible');
        if (parentElement instanceof HTMLElement) {
          // Find or create the PDF value display element
          let valueDisplay = parentElement.querySelector('.pdf-value');
          if (!valueDisplay) {
            valueDisplay = document.createElement('div');
            valueDisplay.className = 'pdf-value';
            parentElement.appendChild(valueDisplay);
          }
          
          if (valueDisplay instanceof HTMLElement) {
            // Set the value to display
            valueDisplay.textContent = value;
            valueDisplay.style.visibility = 'visible';
            valueDisplay.style.opacity = '1';
            valueDisplay.style.display = 'inline-block';
            valueDisplay.style.fontWeight = 'bold';
            valueDisplay.style.marginRight = '4px';
            valueDisplay.style.position = 'static';
          }
          
          // Hide the actual input element
          input.style.display = 'none';
          input.style.opacity = '0';
          input.style.position = 'absolute';
          input.style.pointerEvents = 'none';
        } else {
          // Standalone input not in a container
          const wrapper = document.createElement('div');
          wrapper.style.display = 'inline-block';
          
          const valueDisplay = document.createElement('span');
          valueDisplay.textContent = value;
          valueDisplay.style.fontWeight = 'bold';
          
          // Replace input with text
          if (input.parentElement) {
            wrapper.appendChild(valueDisplay);
            input.parentElement.insertBefore(wrapper, input);
            input.style.display = 'none';
          }
        }
      }
    });
    
    // Process number inputs specifically
    const numberInputs = container.querySelectorAll('.pdf-text-visible');
    numberInputs.forEach(container => {
      if (container instanceof HTMLElement) {
        container.style.display = 'flex';
        container.style.justifyContent = 'flex-end';
        container.style.alignItems = 'center';
        
        const input = container.querySelector('input');
        if (input instanceof HTMLInputElement) {
          input.style.display = 'none';
        }
        
        const pdfValue = container.querySelector('.pdf-value');
        if (pdfValue instanceof HTMLElement) {
          pdfValue.style.display = 'inline-block';
          pdfValue.style.visibility = 'visible';
          pdfValue.style.opacity = '1';
          pdfValue.style.position = 'static';
        }
      }
    });
  } catch (error) {
    console.warn('Error processing input fields:', error);
  }
};
