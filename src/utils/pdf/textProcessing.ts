// Functions for processing text elements in PDF export

export const removeRedundantTextElements = (container: HTMLElement) => {
  try {
    // Find all duplicate labels or values and hide them
    const texts = container.querySelectorAll('span, p, div:not(.pdf-value):not(.card):not([class*="grid"])');
    const textContents = new Map<string, HTMLElement[]>();
    
    texts.forEach((textElement) => {
      if (textElement instanceof HTMLElement) {
        const content = textElement.textContent?.trim() || '';
        if (content && content.length > 0) {
          const list = textContents.get(content) || [];
          list.push(textElement);
          textContents.set(content, list);
        }
      }
    });
    
    // Hide duplicates (keep the first occurrence)
    textContents.forEach((elements) => {
      if (elements.length > 1) {
        // Keep the first, hide the rest
        for (let i = 1; i < elements.length; i++) {
          if (elements[i] instanceof HTMLElement) {
            elements[i].style.display = 'none';
            elements[i].classList.add('pdf-duplicate');
          }
        }
      }
    });
  } catch (error) {
    console.warn('Error removing redundant elements:', error);
  }
};
