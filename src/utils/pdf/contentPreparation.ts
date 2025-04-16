
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
    
    // Safely append to body
    document.body.appendChild(tempContainer);
    tempContainer.appendChild(clonedContent);
    
    return tempContainer;
  } catch (error) {
    console.error('Error preparing content for export:', error);
    return null;
  }
};
