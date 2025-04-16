// Functions for enhancing layout for PDF export

import { elementExists } from './domHelpers';

// Remove redundant text elements
export const removeRedundantTextElements = (container: HTMLElement) => {
  try {
    // Hide any redundant spans
    const redundantSpans = container.querySelectorAll('span:not(.pdf-value)[style*="position: absolute"]');
    redundantSpans.forEach((span) => {
      if (span instanceof HTMLElement && span.parentElement?.contains(span)) {
        span.style.display = 'none';
      }
    });
    
    // Handle duplicate pdf-value elements
    const inputContainers = container.querySelectorAll('.pdf-text-visible');
    inputContainers.forEach((container) => {
      if (container instanceof HTMLElement) {
        const pdfValues = container.querySelectorAll('.pdf-value');
        if (pdfValues.length > 1) {
          // Keep only the first one
          Array.from(pdfValues).slice(1).forEach((element) => {
            if (element instanceof HTMLElement) {
              element.style.display = 'none';
            }
          });
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
    // Process grid layout elements
    const gridItems = container.querySelectorAll('[class*="grid"]');
    gridItems.forEach((grid) => {
      if (grid instanceof HTMLElement) {
        if (!grid.classList.contains('pdf-duplicate-row')) {
          grid.style.display = 'block';
          grid.style.marginBottom = '24px';
          grid.style.pageBreakInside = 'avoid';
          
          // Convert grid items to block layout
          const gridChildren = Array.from(grid.children);
          gridChildren.forEach((child, index) => {
            if (child instanceof HTMLElement) {
              child.style.display = 'block';
              child.style.width = '100%';
              
              // Set proper margins and alignment for labels and values
              if (child.classList.contains('md:col-span-3')) {
                if (index % 2 === 0) { // Label
                  child.style.marginBottom = '8px';
                  child.style.fontWeight = '500';
                } else { // Value
                  child.style.marginBottom = '16px';
                  child.style.textAlign = 'right';
                }
              }
              
              // Fix number input containers
              const numberInputContainer = child.querySelector('.pdf-text-visible');
              if (numberInputContainer instanceof HTMLElement) {
                numberInputContainer.style.justifyContent = 'flex-end';
                numberInputContainer.style.display = 'flex';
                numberInputContainer.style.alignItems = 'center';
                
                const pdfValue = numberInputContainer.querySelector('.pdf-value');
                if (pdfValue instanceof HTMLElement) {
                  pdfValue.style.position = 'static';
                  pdfValue.style.marginRight = '4px';
                  pdfValue.style.fontWeight = '500';
                }
              }
            }
          });
        }
      }
    });
    
    // Enhance section headers
    const headings = container.querySelectorAll('h2');
    headings.forEach((heading) => {
      if (heading instanceof HTMLElement) {
        heading.style.fontSize = '18px';
        heading.style.fontWeight = 'bold';
        heading.style.marginTop = '32px';
        heading.style.marginBottom = '24px';
        heading.style.borderLeft = '4px solid #3B82F6';
        heading.style.paddingLeft = '12px';
        heading.style.color = '#000';
      }
    });
    
    // Fix card layout
    const cards = container.querySelectorAll('.card');
    cards.forEach(card => {
      if (card instanceof HTMLElement) {
        card.style.marginBottom = '32px';
        card.style.pageBreakInside = 'avoid';
        card.style.border = '1px solid #e5e7eb';
        card.style.borderRadius = '8px';
        card.style.padding = '24px';
        card.style.backgroundColor = '#fff';
      }
    });
    
    // Enhance table layouts
    const tables = container.querySelectorAll('table');
    tables.forEach(table => {
      if (table instanceof HTMLElement) {
        table.style.width = '100%';
        table.style.borderCollapse = 'collapse';
        table.style.marginBottom = '24px';
        
        const cells = table.querySelectorAll('td, th');
        cells.forEach(cell => {
          if (cell instanceof HTMLElement) {
            cell.style.padding = '12px';
            cell.style.textAlign = cell.classList.contains('text-right') ? 'right' : 'left';
          }
        });
      }
    });
  } catch (error) {
    console.warn('Error enhancing layout:', error);
  }
};
