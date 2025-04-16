
// Functions for preparing content for PDF export

// Prepare cloned content for PDF export with improved safety
export const prepareContentForExport = (content: HTMLElement): HTMLElement | null => {
  // First remove any existing temp containers to avoid duplicates
  const existingTempContainer = document.getElementById('temp-pdf-container');
  if (existingTempContainer) {
    existingTempContainer.parentElement?.removeChild(existingTempContainer);
  }
  
  try {
    // Create a deep clone of the content
    const clonedContent = content.cloneNode(true) as HTMLElement;
    
    // Create a new temporary container
    const tempContainer = document.createElement('div');
    tempContainer.id = 'temp-pdf-container';
    tempContainer.classList.add('pdf-temp-element', 'pdf-export-container', 'for-pdf-export');
    
    // Set container styles
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '-9999px';
    tempContainer.style.top = '0';
    tempContainer.style.width = '1200px';
    tempContainer.style.backgroundColor = '#ffffff';
    
    // Remove duplicate elements before export
    removeDuplicateElements(clonedContent);
    
    // Safely append to body
    document.body.appendChild(tempContainer);
    tempContainer.appendChild(clonedContent);
    
    return tempContainer;
  } catch (error) {
    console.error('Error preparing content for export:', error);
    return null;
  }
};

// Remove duplicate elements that might appear in PDF export
const removeDuplicateElements = (container: HTMLElement) => {
  try {
    // Remove duplicate inputs and their display values
    const seenIds = new Set<string>();
    const inputs = container.querySelectorAll('input');
    
    inputs.forEach((input: HTMLInputElement) => {
      if (input.id && seenIds.has(input.id)) {
        // This is a duplicate input, remove it
        if (input.parentElement) {
          const parentElement = input.parentElement;
          if (parentElement instanceof HTMLElement) {
            parentElement.style.display = 'none';
            
            // If this is inside a grid, hide the entire row
            const gridRow = parentElement.closest('.grid');
            if (gridRow && gridRow instanceof HTMLElement) {
              gridRow.classList.add('pdf-duplicate-row');
              gridRow.style.display = 'none';
            }
          }
        }
      } else if (input.id) {
        seenIds.add(input.id);
      }
    });
    
    // Handle duplicate headers and section titles
    const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const seenHeadings = new Set<string>();
    
    headings.forEach((heading) => {
      const headingText = heading.textContent?.trim() || '';
      if (seenHeadings.has(headingText) && headingText.length > 0) {
        if (heading instanceof HTMLElement) {
          heading.style.display = 'none';
        }
      } else {
        seenHeadings.add(headingText);
      }
    });
    
    // Handle duplicate spans and labels
    const labels = container.querySelectorAll('label, .pdf-value');
    const seenLabels = new Set<string>();
    
    labels.forEach((label) => {
      const labelText = label.textContent?.trim() || '';
      const labelId = label.id || '';
      const key = `${labelText}-${labelId}`;
      
      if (seenLabels.has(key) && labelText.length > 0) {
        if (label instanceof HTMLElement) {
          label.style.display = 'none';
        }
      } else if (labelText.length > 0) {
        seenLabels.add(key);
      }
    });
  } catch (error) {
    console.warn('Error removing duplicate elements:', error);
  }
};
