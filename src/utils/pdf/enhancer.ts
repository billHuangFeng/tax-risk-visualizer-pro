
import { removeRedundantTextElements } from './textProcessing';
import { enhanceLayoutStructure } from './layoutStructure';
import { createCompanyHeader, enhanceHeadings } from './styles/headerStyles';
import { enhanceTableLayout } from './styles/tableStyles';
import { formatLabelValue, enhanceCheckboxes } from './styles/formStyles';

// Main function to enhance layout for PDF export
export const enhanceLayout = (container: HTMLElement) => {
  try {
    console.log("Starting PDF layout enhancement");
    
    // Remove redundant elements first
    removeRedundantTextElements(container);
    
    // Enhance layout structure
    enhanceLayoutStructure(container);
    
    // Apply styles to match the template image
    createCompanyHeader(container);
    enhanceHeadings(container);
    enhanceTableLayout(container);
    formatLabelValue(container);
    enhanceCheckboxes(container);
    
    console.log("PDF layout enhancement completed");
  } catch (error) {
    console.warn('Error in layout enhancement:', error);
  }
};
