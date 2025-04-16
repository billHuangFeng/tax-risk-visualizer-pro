
// Functions for enhancing layout for PDF export

import { elementExists } from './domHelpers';

// Remove redundant text elements
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
          elements[i].style.display = 'none';
          elements[i].classList.add('pdf-duplicate');
        }
      }
    });
    
    // Hide absolute positioned elements that often cause overlaps
    const absoluteElements = container.querySelectorAll('[style*="position: absolute"]');
    absoluteElements.forEach((element) => {
      if (element instanceof HTMLElement && !element.classList.contains('pdf-value')) {
        element.style.display = 'none';
      }
    });
    
    // Hide redundant pdf-value elements (keep only one per input)
    const inputGroups = container.querySelectorAll('.pdf-text-visible');
    inputGroups.forEach((group) => {
      if (group instanceof HTMLElement) {
        const values = group.querySelectorAll('.pdf-value');
        // Check if elements are of HTMLElement type before accessing style property
        if (values.length > 1) {
          for (let i = 1; i < values.length; i++) {
            if (values[i] instanceof HTMLElement) {
              values[i].style.display = 'none';
            }
          }
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
    // Create company name header
    const companyNameInput = container.querySelector('input#companyName') as HTMLInputElement;
    if (companyNameInput) {
      const companyNameValue = companyNameInput.value || companyNameInput.getAttribute('data-value') || '税务计算报告';
      
      // Create a header for the PDF
      const headerDiv = document.createElement('div');
      headerDiv.className = 'company-header';
      headerDiv.style.fontSize = '22px';
      headerDiv.style.fontWeight = 'bold';
      headerDiv.style.textAlign = 'center';
      headerDiv.style.marginBottom = '24px';
      headerDiv.style.borderBottom = '2px solid #000';
      headerDiv.style.paddingBottom = '12px';
      headerDiv.style.width = '100%';
      headerDiv.textContent = companyNameValue + ' - 税务计算报告';
      
      // Insert at the top of the container
      if (container.firstChild) {
        container.insertBefore(headerDiv, container.firstChild);
      } else {
        container.appendChild(headerDiv);
      }
      
      // Hide the original company name input to avoid duplication
      const companyNameField = companyNameInput.closest('[class*="grid"]');
      if (companyNameField instanceof HTMLElement) {
        companyNameField.style.display = 'none';
      }
    }
    
    // Make section headings more visible
    const sectionHeadings = container.querySelectorAll('h2');
    sectionHeadings.forEach((heading) => {
      if (heading instanceof HTMLElement) {
        heading.style.fontSize = '18px';
        heading.style.fontWeight = 'bold';
        heading.style.marginTop = '32px';
        heading.style.marginBottom = '16px';
        heading.style.paddingLeft = '10px';
        heading.style.borderLeft = '4px solid #3B82F6';
        heading.style.display = 'block';
        heading.style.width = '100%';
        heading.style.backgroundColor = '#f8fafc';
        heading.style.padding = '8px 12px';
        heading.style.pageBreakAfter = 'avoid';
      }
    });
    
    // Fix grid layout for better alignment
    const gridContainers = container.querySelectorAll('[class*="grid"]');
    gridContainers.forEach((grid) => {
      if (grid instanceof HTMLElement && !grid.classList.contains('pdf-duplicate')) {
        // Convert grid to table-like layout for better PDF rendering
        grid.style.display = 'table';
        grid.style.width = '100%';
        grid.style.borderCollapse = 'collapse';
        grid.style.marginBottom = '16px';
        
        // Convert grid items to table cells
        const gridItems = Array.from(grid.children);
        for (let i = 0; i < gridItems.length; i += 2) {
          const labelItem = gridItems[i];
          const valueItem = i + 1 < gridItems.length ? gridItems[i + 1] : null;
          
          if (labelItem instanceof HTMLElement) {
            labelItem.style.display = 'table-cell';
            labelItem.style.width = '60%';
            labelItem.style.textAlign = 'left';
            labelItem.style.paddingTop = '8px';
            labelItem.style.paddingBottom = '8px';
            labelItem.style.paddingLeft = '8px';
            labelItem.style.verticalAlign = 'middle';
          }
          
          if (valueItem instanceof HTMLElement) {
            valueItem.style.display = 'table-cell';
            valueItem.style.width = '40%';
            valueItem.style.textAlign = 'right';
            valueItem.style.paddingTop = '8px';
            valueItem.style.paddingBottom = '8px';
            valueItem.style.paddingRight = '8px';
            valueItem.style.verticalAlign = 'middle';
            
            // Make sure number inputs display correctly
            const numberInput = valueItem.querySelector('.pdf-text-visible');
            if (numberInput instanceof HTMLElement) {
              numberInput.style.display = 'flex';
              numberInput.style.justifyContent = 'flex-end';
              numberInput.style.alignItems = 'center';
              
              // Make sure the PDF value is visible
              const pdfValue = numberInput.querySelector('.pdf-value');
              if (pdfValue instanceof HTMLElement) {
                pdfValue.style.opacity = '1';
                pdfValue.style.position = 'static';
                pdfValue.style.marginRight = '4px';
                pdfValue.style.display = 'inline-block';
                pdfValue.style.visibility = 'visible';
              }
              
              // Hide the actual input
              const input = numberInput.querySelector('input');
              if (input instanceof HTMLInputElement) {
                input.style.display = 'none';
                input.style.opacity = '0';
                input.style.height = '0';
                input.style.position = 'absolute';
              }
            }
          }
        }
      }
    });
    
    // Fix table layout
    const tables = container.querySelectorAll('table');
    tables.forEach((table) => {
      if (table instanceof HTMLTableElement) {
        table.style.width = '100%';
        table.style.borderCollapse = 'collapse';
        table.style.marginBottom = '24px';
        table.style.border = '1px solid #e5e7eb';
        
        const rows = table.querySelectorAll('tr');
        rows.forEach((row) => {
          if (row instanceof HTMLTableRowElement) {
            row.style.borderBottom = '1px solid #e5e7eb';
          }
        });
        
        const cells = table.querySelectorAll('td, th');
        cells.forEach((cell) => {
          if (cell instanceof HTMLTableCellElement) {
            cell.style.padding = '12px';
            cell.style.border = '1px solid #e5e7eb';
            
            // Make sure text is visible
            cell.style.color = '#000';
            
            const textElements = cell.querySelectorAll('p, span, div');
            textElements.forEach((el) => {
              if (el instanceof HTMLElement) {
                el.style.color = '#000';
              }
            });
          }
        });
      }
    });
    
    // Fix card layout
    const cards = container.querySelectorAll('.card');
    cards.forEach((card) => {
      if (card instanceof HTMLElement) {
        card.style.marginBottom = '24px';
        card.style.pageBreakInside = 'avoid';
        card.style.border = '1px solid #e5e7eb';
        card.style.padding = '16px';
        card.style.borderRadius = '8px';
      }
    });
  } catch (error) {
    console.warn('Error enhancing layout:', error);
  }
};

