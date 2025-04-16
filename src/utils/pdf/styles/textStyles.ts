
// Functions for styling text elements in PDF export
export const processTextElements = (container: HTMLElement) => {
  try {
    // Process all text elements for visibility in PDF
    const textElements = container.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, label, div');
    textElements.forEach((el) => {
      if (el instanceof HTMLElement) {
        // Ensure text is visible with proper styling
        el.style.color = '#000';
        el.style.visibility = 'visible';
        el.style.opacity = '1';
        el.style.fontFamily = 'SimSun, serif';
        
        // Set default font size if not specified
        if (!el.style.fontSize) {
          el.style.fontSize = '14px';
        }
        
        // Process all child elements
        const children = el.querySelectorAll('*');
        children.forEach(child => {
          if (child instanceof HTMLElement) {
            child.style.color = '#000';
            child.style.visibility = 'visible';
            child.style.opacity = '1';
          }
        });
      }
    });
    
    // Style headings specifically
    const headings = container.querySelectorAll('h1, h2, h3');
    headings.forEach(heading => {
      if (heading instanceof HTMLElement) {
        heading.style.fontWeight = 'bold';
        heading.style.marginTop = '16px';
        heading.style.marginBottom = '8px';
        
        if (heading.tagName === 'H1') {
          heading.style.fontSize = '20px';
          heading.style.textAlign = 'center';
          heading.style.marginBottom = '20px';
        } else if (heading.tagName === 'H2') {
          heading.style.fontSize = '18px';
          heading.style.borderBottom = '1px solid #000';
          heading.style.paddingBottom = '8px';
        } else {
          heading.style.fontSize = '16px';
        }
      }
    });
    
    // Style all labels
    const labels = container.querySelectorAll('label, .label, .label-text');
    labels.forEach(label => {
      if (label instanceof HTMLElement) {
        label.style.fontWeight = 'normal';
        label.style.fontSize = '14px';
        label.style.marginBottom = '4px';
        label.style.display = 'inline-block';
        label.style.color = '#000';
      }
    });
    
    // Style "其中:" labels specially
    const subheaderLabels = container.querySelectorAll('.subheader-label, .subheader');
    subheaderLabels.forEach(label => {
      if (label instanceof HTMLElement) {
        label.style.fontStyle = 'italic';
        label.style.marginLeft = '20px';
        label.style.color = '#000';
      }
    });
  } catch (error) {
    console.warn('Error processing text elements:', error);
  }
};
