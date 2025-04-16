
// Functions for enhancing layout for PDF export

import { elementExists } from './domHelpers';

// Remove redundant text elements
export const removeRedundantTextElements = (container: HTMLElement) => {
  try {
    // Hide any redundant spans (ones that are positioned absolutely)
    const redundantSpans = container.querySelectorAll('span:not(.pdf-value)[style*="position: absolute"]');
    redundantSpans.forEach((span) => {
      if (span.parentElement && elementExists(span) && span.parentElement.contains(span)) {
        try {
          if (span instanceof HTMLElement) {
            span.style.display = 'none';
          }
        } catch (e) {
          console.warn('Could not hide redundant span:', e);
        }
      }
    });
    
    // Hide duplicate pdf-value elements (keep only the first one in each parent)
    const inputContainers = container.querySelectorAll('.pdf-text-visible');
    inputContainers.forEach((container) => {
      const pdfValues = container.querySelectorAll('.pdf-value');
      if (pdfValues.length > 1) {
        // Keep only the first one
        for (let i = 1; i < pdfValues.length; i++) {
          const element = pdfValues[i];
          if (element instanceof HTMLElement) {
            element.style.display = 'none';
          }
        }
      }
    });
    
    // Find and hide duplicate labels
    const labels = Array.from(container.querySelectorAll('label'));
    const seen = new Map<string, HTMLElement>();
    
    labels.forEach((label) => {
      const text = label.textContent?.trim() || '';
      if (text && seen.has(text)) {
        if (label instanceof HTMLElement) {
          label.style.display = 'none';
        }
      } else if (text) {
        if (label instanceof HTMLElement) {
          seen.set(text, label);
        }
      }
    });
  } catch (error) {
    console.warn('Error removing redundant elements:', error);
  }
};

// Enhance layout display
export const enhanceLayout = (container: HTMLElement) => {
  try {
    // Process grid layout elements to display properly in PDF
    const gridItems = container.querySelectorAll('[class*="grid"]');
    gridItems.forEach((grid) => {
      if (grid instanceof HTMLElement) {
        if (!grid.classList.contains('pdf-duplicate-row')) {
          grid.style.display = 'block';
          grid.style.marginBottom = '16px';
          grid.style.visibility = 'visible';
          grid.style.position = 'relative';
          
          // Convert grid items to block layout for PDF
          const gridChildren = grid.children;
          for (let i = 0; i < gridChildren.length; i++) {
            const child = gridChildren[i];
            if (child instanceof HTMLElement) {
              child.style.display = 'block';
              child.style.width = '100%';
              
              // Set proper margins for columns
              if (child.classList.contains('md:col-span-3')) {
                if (i % 2 === 0) { // Label
                  child.style.marginBottom = '4px';
                  child.style.fontWeight = 'bold';
                } else { // Value
                  child.style.marginBottom = '16px';
                  child.style.textAlign = 'right';
                }
              }
            }
          }
        }
      }
    });
    
    // Make sure section headers are clearly visible
    const headings = container.querySelectorAll('h2');
    headings.forEach((heading) => {
      if (heading instanceof HTMLElement) {
        heading.style.color = '#000';
        heading.style.fontWeight = 'bold';
        heading.style.fontSize = '18px';
        heading.style.marginTop = '20px';
        heading.style.marginBottom = '16px';
        heading.style.display = 'block';
        heading.style.visibility = 'visible';
        heading.style.opacity = '1';
        heading.style.borderLeft = '4px solid #3B82F6';
        heading.style.paddingLeft = '10px';
      }
    });
    
    // Fix card layout in PDF
    const cards = container.querySelectorAll('.card');
    cards.forEach(card => {
      if (card instanceof HTMLElement) {
        card.style.marginBottom = '20px';
        card.style.pageBreakInside = 'avoid';
        card.style.border = '1px solid #e5e7eb';
        card.style.borderRadius = '8px';
        card.style.padding = '16px';
      }
    });
  } catch (error) {
    console.warn('Error enhancing layout:', error);
  }
};
