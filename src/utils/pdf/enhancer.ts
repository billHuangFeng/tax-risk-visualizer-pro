
import { removeRedundantTextElements } from './textProcessing';
import { enhanceLayoutStructure } from './layoutStructure';
import { createCompanyHeader, enhanceHeadings } from './styles/headerStyles';
import { enhanceTableLayout } from './styles/tableStyles';
import { formatLabelValue, enhanceCheckboxes } from './styles/formStyles';
import { processTextElements } from './styles/textStyles';
import { processInputFields } from './styles/inputStyles';
import { enhanceSpecificSections } from './styles/sectionStyles';

export const enhanceLayout = (container: HTMLElement) => {
  try {
    console.log("Starting PDF layout enhancement");
    
    // Apply global styles
    container.style.fontFamily = "SimSun, serif";
    container.style.color = "#000000";
    container.style.backgroundColor = "#ffffff";
    container.style.padding = "40px";
    container.style.width = "100%";
    container.style.boxSizing = "border-box";
    
    // Add PDF export class for CSS targeting
    container.classList.add('for-pdf-export');
    
    // Apply template styling in the correct order
    createCompanyHeader(container);
    enhanceHeadings(container);
    
    // Process all elements to ensure proper styling
    processTextElements(container);
    processInputFields(container);
    
    // Enhance form elements and layout
    enhanceCheckboxes(container);
    formatLabelValue(container);
    enhanceTableLayout(container);
    enhanceLayoutStructure(container);
    enhanceSpecificSections(container);
    
    // Remove redundant elements for cleaner output
    removeRedundantTextElements(container);
    
    // Force style application for specific elements that might have missed styling
    forceApplyStyles(container);
    
    console.log("PDF layout enhancement completed");
  } catch (error) {
    console.error('Error in layout enhancement:', error);
  }
};

const forceApplyStyles = (container: HTMLElement) => {
  try {
    // Force visibility and styling on all elements
    const allElements = container.querySelectorAll('*');
    allElements.forEach(el => {
      if (el instanceof HTMLElement) {
        el.style.visibility = 'visible';
        el.style.color = '#000';
        
        // Don't show elements that should be hidden
        if (el.classList.contains('pdf-duplicate') || 
            el.classList.contains('hidden') || 
            el.tagName === 'BUTTON' ||
            (el.style.display === 'none' && !el.classList.contains('pdf-value'))) {
          el.style.display = 'none';
        }
      }
    });
    
    // Ensure checkbox checked state is visible
    const checkboxes = container.querySelectorAll('[role="checkbox"]');
    checkboxes.forEach((checkbox) => {
      if (checkbox instanceof HTMLElement) {
        checkbox.style.border = '1px solid #000';
        checkbox.style.minWidth = '14px';
        checkbox.style.minHeight = '14px';
        checkbox.style.display = 'inline-block';
        
        if (checkbox.getAttribute('data-state') === 'checked') {
          // Create checkmark if it doesn't exist
          if (!checkbox.querySelector('.checkmark')) {
            const checkmark = document.createElement('div');
            checkmark.className = 'checkmark';
            checkmark.textContent = '✓';
            checkmark.style.position = 'absolute';
            checkmark.style.top = '-2px';
            checkmark.style.left = '2px';
            checkmark.style.fontSize = '14px';
            checkmark.style.fontWeight = 'bold';
            checkbox.appendChild(checkmark);
          }
        }
      }
    });
    
    // Properly style tables
    const tables = container.querySelectorAll('table');
    tables.forEach((table) => {
      if (table instanceof HTMLElement) {
        table.style.borderCollapse = 'collapse';
        table.style.width = '100%';
        table.style.marginBottom = '20px';
        
        const cells = table.querySelectorAll('th, td');
        cells.forEach((cell) => {
          if (cell instanceof HTMLElement) {
            cell.style.border = '1px solid #000';
            cell.style.padding = '8px';
            cell.style.textAlign = 'right';
          }
        });
      }
    });
    
    // Ensure form grids are properly displayed
    const gridRows = container.querySelectorAll('[class*="grid"]');
    gridRows.forEach((row) => {
      if (row instanceof HTMLElement && !row.classList.contains('grid-cols-1')) {
        row.style.display = 'grid';
        row.style.gridTemplateColumns = 'repeat(2, 1fr)';
        row.style.gap = '20px';
        row.style.alignItems = 'center';
        row.style.marginBottom = '12px';
      }
    });
  } catch (error) {
    console.error('Error forcing styles:', error);
  }
};
