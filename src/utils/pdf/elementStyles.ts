
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
        heading.style.marginTop = '20px';
        heading.style.marginBottom = '10px';
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
    const processedParents = new Set<HTMLElement>();
    
    inputs.forEach((input: HTMLInputElement) => {
      const parentElement = input.parentElement;
      if (!parentElement || processedParents.has(parentElement)) return;
      
      processedParents.add(parentElement);
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
      }
      
      input.style.border = 'none';
      input.style.boxShadow = 'none';
      input.style.outline = 'none';
      input.style.backgroundColor = 'transparent';
    });
  } catch (error) {
    console.warn('Error processing input fields:', error);
  }
};
