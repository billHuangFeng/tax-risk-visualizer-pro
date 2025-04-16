
// Functions for styling text elements in PDF export
export const processTextElements = (container: HTMLElement) => {
  try {
    const textElements = container.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, label, div');
    textElements.forEach((el) => {
      if (el instanceof HTMLElement) {
        el.style.color = '#000';
        el.style.visibility = 'visible';
        el.style.opacity = '1';
        el.style.fontFamily = 'Arial, sans-serif';
        
        if (!el.style.fontSize) {
          el.style.fontSize = '14px';
        }
        
        const children = el.querySelectorAll('*');
        children.forEach(child => {
          if (child instanceof HTMLElement) {
            child.style.color = '#000';
            child.style.visibility = 'visible';
          }
        });
      }
    });
    
    // Style section headings
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
    
    // Style field labels
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

