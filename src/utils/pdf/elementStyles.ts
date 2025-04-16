
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
  } catch (error) {
    console.warn('Error processing text elements:', error);
  }
};

// Process input fields for PDF display
export const processInputFields = (container: HTMLElement) => {
  try {
    const inputs = container.querySelectorAll('input');
    inputs.forEach((input: HTMLInputElement) => {
      const parentElement = input.parentElement;
      if (!parentElement) return;
      
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
        valueDisplay.textContent = input.value || '0';
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
