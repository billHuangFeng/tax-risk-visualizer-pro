
import { removeRedundantTextElements } from './textProcessing';
import { enhanceLayoutStructure } from './layoutStructure';
import { createCompanyHeader, enhanceHeadings } from './styles/headerStyles';
import { enhanceTableLayout } from './styles/tableStyles';
import { formatLabelValue, enhanceCheckboxes } from './styles/formStyles';

export const enhanceLayout = (container: HTMLElement) => {
  try {
    console.log("Starting PDF layout enhancement");
    
    // Add PDF export class
    container.classList.add('for-pdf-export');
    
    // Remove redundant elements
    removeRedundantTextElements(container);
    
    // Enhance layout structure
    enhanceLayoutStructure(container);
    
    // Apply template styling
    createCompanyHeader(container);
    enhanceHeadings(container);
    enhanceTableLayout(container);
    formatLabelValue(container);
    enhanceCheckboxes(container);
    
    // Apply additional template-specific styling
    applyTemplateStyling(container);
    
    console.log("PDF layout enhancement completed");
  } catch (error) {
    console.error('Error in layout enhancement:', error);
  }
};

const applyTemplateStyling = (container: HTMLElement) => {
  try {
    // Set global font and styles
    container.style.fontFamily = "SimSun, serif";
    container.style.fontSize = "14px";
    container.style.padding = "40px 60px";
    container.style.lineHeight = "1.5";
    
    // Add spacing between sections
    const sections = container.querySelectorAll('section');
    sections.forEach((section) => {
      if (section instanceof HTMLElement) {
        section.style.marginBottom = '24px';
      }
    });
    
    // Style basic info section
    const basicInfoSection = container.querySelector('.basic-info-section');
    if (basicInfoSection instanceof HTMLElement) {
      basicInfoSection.style.marginBottom = '32px';
    }
    
    // Style revenue and expenses sections
    const gridSections = container.querySelectorAll('.grid-section');
    gridSections.forEach((section) => {
      if (section instanceof HTMLElement) {
        section.style.marginBottom = '24px';
      }
    });
    
    // Ensure proper page breaks
    const mainSections = container.querySelectorAll('section[class*="main-section"]');
    mainSections.forEach((section) => {
      if (section instanceof HTMLElement) {
        section.style.pageBreakInside = 'avoid';
      }
    });
  } catch (error) {
    console.error('Error applying template styling:', error);
  }
};
