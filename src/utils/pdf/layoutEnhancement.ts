
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
    // Make company name more prominent at the top
    const companyNameInput = container.querySelector('input#companyName') as HTMLInputElement;
    if (companyNameInput) {
      const companyNameValue = companyNameInput.value || '';
      
      // Create a prominent header for the company name
      const headerDiv = document.createElement('div');
      headerDiv.style.fontSize = '24px';
      headerDiv.style.fontWeight = 'bold';
      headerDiv.style.textAlign = 'center';
      headerDiv.style.marginBottom = '24px';
      headerDiv.style.borderBottom = '2px solid #3B82F6';
      headerDiv.style.paddingBottom = '12px';
      headerDiv.textContent = companyNameValue + ' - 税务计算报告';
      
      // Insert at the top of the container
      if (container.firstChild) {
        container.insertBefore(headerDiv, container.firstChild);
      } else {
        container.appendChild(headerDiv);
      }
      
      // Hide the original company name field to avoid duplication
      const companyNameField = container.querySelector('input#companyName')?.closest('.grid');
      if (companyNameField instanceof HTMLElement) {
        companyNameField.style.display = 'none';
      }
    }
    
    // Improve layout for all grid items to ensure proper label/value alignment
    const gridItems = container.querySelectorAll('[class*="grid"]');
    gridItems.forEach((grid) => {
      if (grid instanceof HTMLElement) {
        // Skip any grid that needs to be hidden
        if (grid.classList.contains('pdf-duplicate-row') || grid.style.display === 'none') {
          return;
        }
        
        grid.style.display = 'table';
        grid.style.width = '100%';
        grid.style.marginBottom = '16px';
        grid.style.pageBreakInside = 'avoid';
        
        // Convert grid children to table-like layout
        const gridChildren = Array.from(grid.children);
        for (let i = 0; i < gridChildren.length; i += 2) {
          const labelElement = gridChildren[i];
          const valueElement = gridChildren[i + 1];
          
          if (labelElement instanceof HTMLElement) {
            labelElement.style.display = 'table-cell';
            labelElement.style.width = '60%';
            labelElement.style.textAlign = 'left';
            labelElement.style.padding = '8px 12px';
            labelElement.style.fontWeight = '500';
            labelElement.style.verticalAlign = 'middle';
          }
          
          if (valueElement instanceof HTMLElement) {
            valueElement.style.display = 'table-cell';
            valueElement.style.width = '40%';
            valueElement.style.textAlign = 'right';
            valueElement.style.padding = '8px 12px';
            valueElement.style.verticalAlign = 'middle';
            
            // Fix number input containers
            const numberInputContainer = valueElement.querySelector('.pdf-text-visible');
            if (numberInputContainer instanceof HTMLElement) {
              numberInputContainer.style.display = 'flex';
              numberInputContainer.style.justifyContent = 'flex-end';
              numberInputContainer.style.alignItems = 'center';
              numberInputContainer.style.width = '100%';
              
              // Hide the actual input to avoid duplication
              const input = numberInputContainer.querySelector('input');
              if (input instanceof HTMLInputElement) {
                input.style.opacity = '0';
                input.style.position = 'absolute';
                input.style.pointerEvents = 'none';
              }
              
              // Make the PDF value visible
              const pdfValue = numberInputContainer.querySelector('.pdf-value');
              if (pdfValue instanceof HTMLElement) {
                pdfValue.style.position = 'static';
                pdfValue.style.visibility = 'visible';
                pdfValue.style.opacity = '1';
                pdfValue.style.marginRight = '4px';
                pdfValue.style.fontWeight = '500';
              }
            }
          }
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
        heading.style.marginBottom = '16px';
        heading.style.borderLeft = '4px solid #3B82F6';
        heading.style.paddingLeft = '12px';
        heading.style.color = '#000';
        heading.style.backgroundColor = '#f8fafc';
        heading.style.padding = '8px 12px';
        heading.style.width = '100%';
        heading.style.boxSizing = 'border-box';
      }
    });
    
    // Fix card layout
    const cards = container.querySelectorAll('.card, [class*="rounded-lg"]');
    cards.forEach(card => {
      if (card instanceof HTMLElement) {
        card.style.marginBottom = '32px';
        card.style.pageBreakInside = 'avoid';
        card.style.border = '1px solid #e5e7eb';
        card.style.borderRadius = '8px';
        card.style.padding = '24px';
        card.style.backgroundColor = '#fff';
        card.style.boxShadow = 'none';
      }
    });
    
    // Fix risk indicator display
    const riskIndicator = container.querySelector('[class*="risk-indicator"]');
    if (riskIndicator instanceof HTMLElement) {
      riskIndicator.style.pageBreakInside = 'avoid';
      riskIndicator.style.marginTop = '16px';
      
      // Make percentage text more visible
      const percentageText = riskIndicator.querySelector('[class*="percentage"]');
      if (percentageText instanceof HTMLElement) {
        percentageText.style.fontWeight = 'bold';
        percentageText.style.fontSize = '16px';
      }
    }
    
    // Enhance table layouts
    const tables = container.querySelectorAll('table');
    tables.forEach(table => {
      if (table instanceof HTMLElement) {
        table.style.width = '100%';
        table.style.borderCollapse = 'collapse';
        table.style.marginBottom = '24px';
        table.style.border = '1px solid #e5e7eb';
        
        const cells = table.querySelectorAll('td, th');
        cells.forEach(cell => {
          if (cell instanceof HTMLElement) {
            cell.style.padding = '12px';
            cell.style.textAlign = cell.classList.contains('text-right') ? 'right' : 'left';
            cell.style.border = '1px solid #e5e7eb';
          }
        });
      }
    });
  } catch (error) {
    console.warn('Error enhancing layout:', error);
  }
};
