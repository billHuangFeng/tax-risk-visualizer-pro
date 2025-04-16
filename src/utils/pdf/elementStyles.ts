
// Functions for styling elements for PDF export

// Process text elements for PDF display
export const processTextElements = (container: HTMLElement) => {
  try {
    const textElements = container.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, label, div');
    textElements.forEach((el) => {
      if (el instanceof HTMLElement && !el.classList.contains('pdf-duplicate-row')) {
        el.style.color = '#000';
        el.style.visibility = 'visible';
        el.style.opacity = '1';
        
        if (el.childNodes.length > 0) {
          el.childNodes.forEach((child) => {
            if (child instanceof HTMLElement) {
              child.style.color = '#000';
              child.style.visibility = 'visible';
              child.style.opacity = '1';
            }
          });
        }
      }
    });
    
    // Make headings clear and visible
    const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headings.forEach((heading) => {
      if (heading instanceof HTMLElement) {
        heading.style.pageBreakBefore = 'auto';
        heading.style.pageBreakAfter = 'avoid';
        heading.style.marginTop = '24px';
        heading.style.marginBottom = '16px';
        heading.style.width = '100%';
      }
    });
    
    // Make company name prominent at the top
    const companyNameInput = container.querySelector('input#companyName');
    if (companyNameInput instanceof HTMLInputElement) {
      const companyName = companyNameInput.value || companyNameInput.getAttribute('data-value') || '税务计算报告';
      
      const titleElement = document.createElement('h1');
      titleElement.textContent = companyName + ' - 税务计算报告';
      titleElement.style.fontSize = '24px';
      titleElement.style.fontWeight = 'bold';
      titleElement.style.textAlign = 'center';
      titleElement.style.marginBottom = '24px';
      titleElement.style.borderBottom = '2px solid #3B82F6';
      titleElement.style.paddingBottom = '12px';
      titleElement.style.width = '100%';
      titleElement.style.pageBreakAfter = 'avoid';
      
      if (container.firstChild) {
        container.insertBefore(titleElement, container.firstChild);
      } else {
        container.appendChild(titleElement);
      }
      
      // Hide the original company name field
      const companyField = companyNameInput.closest('[class*="grid"]');
      if (companyField instanceof HTMLElement) {
        companyField.style.display = 'none';
      }
    }
  } catch (error) {
    console.warn('Error processing text elements:', error);
  }
};

// Process input fields for PDF display
export const processInputFields = (container: HTMLElement) => {
  try {
    const inputs = container.querySelectorAll('input');
    const processedParents = new Set<HTMLElement>();
    
    inputs.forEach((input: HTMLInputElement) => {
      const parentElement = input.closest('.pdf-text-visible');
      if (!parentElement || !(parentElement instanceof HTMLElement) || processedParents.has(parentElement)) return;
      
      processedParents.add(parentElement);
      
      // Find or create the pdf-value element
      let valueDisplay = parentElement.querySelector('.pdf-value');
      
      if (!valueDisplay) {
        valueDisplay = document.createElement('div');
        valueDisplay.className = 'pdf-value';
        valueDisplay.setAttribute('data-pdf-value', 'true');
        
        if (valueDisplay instanceof HTMLElement) {
          valueDisplay.style.position = 'absolute';
          valueDisplay.style.right = input.classList.contains('text-right') ? '8px' : 'auto';
          valueDisplay.style.left = input.classList.contains('text-right') ? 'auto' : '8px';
          valueDisplay.style.top = '50%';
          valueDisplay.style.transform = 'translateY(-50%)';
          valueDisplay.style.color = '#000';
          valueDisplay.style.fontWeight = 'bold';
          valueDisplay.style.fontSize = '14px';
        }
        
        parentElement.appendChild(valueDisplay);
      }
      
      if (valueDisplay instanceof HTMLElement) {
        // Use data-value attribute if available, otherwise use input value
        const inputValue = input.getAttribute('data-value') || input.value || '0';
        valueDisplay.textContent = inputValue;
        valueDisplay.style.visibility = 'visible';
        valueDisplay.style.opacity = '1';
        valueDisplay.style.position = 'static';
        valueDisplay.style.display = 'inline-block';
        valueDisplay.style.marginRight = '4px';
      }
      
      // Hide the actual input to avoid duplication
      input.style.opacity = '0';
      input.style.height = '0';
      input.style.position = 'absolute';
      input.style.border = 'none';
      input.style.boxShadow = 'none';
      input.style.outline = 'none';
      input.style.backgroundColor = 'transparent';
    });
    
    // Handle standalone inputs (not in pdf-text-visible containers)
    const standaloneInputs = container.querySelectorAll('input:not(.pdf-text-visible *)');
    standaloneInputs.forEach((input) => {
      if (input instanceof HTMLInputElement) {
        const parentElement = input.parentElement;
        if (!parentElement || !(parentElement instanceof HTMLElement)) return;
        
        const inputValue = input.getAttribute('data-value') || input.value || '';
        
        // Create a text display to replace the input
        const textDisplay = document.createElement('span');
        textDisplay.textContent = inputValue;
        textDisplay.style.fontWeight = 'bold';
        textDisplay.style.fontSize = '14px';
        textDisplay.style.color = '#000';
        
        // Add the text display and hide the input
        parentElement.appendChild(textDisplay);
        input.style.display = 'none';
      }
    });
  } catch (error) {
    console.warn('Error processing input fields:', error);
  }
};
