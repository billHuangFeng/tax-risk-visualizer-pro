
import { removeRedundantTextElements } from './textProcessing';
import { enhanceLayoutStructure } from './layoutStructure';
import { createCompanyHeader, enhanceHeadings } from './styles/headerStyles';
import { enhanceTableLayout } from './styles/tableStyles';
import { formatLabelValue, enhanceCheckboxes } from './styles/formStyles';

// Main function to enhance layout for PDF export
export const enhanceLayout = (container: HTMLElement) => {
  try {
    console.log("Starting PDF layout enhancement");
    
    // Add a class to the container for PDF-specific styling
    container.classList.add('for-pdf-export');
    
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
    
    // Apply additional styling for PDF template appearance
    applyTemplateStyling(container);
    
    console.log("PDF layout enhancement completed");
  } catch (error) {
    console.warn('Error in layout enhancement:', error);
  }
};

// Additional function to apply template-specific styling
const applyTemplateStyling = (container: HTMLElement) => {
  try {
    // Set global font to match the template
    container.style.fontFamily = "SimSun, serif";
    container.style.fontSize = "14px";
    
    // Set appropriate margins
    container.style.padding = "20px";
    
    // Style basic info section
    const basicInfoHeading = Array.from(container.querySelectorAll('h2')).find(
      h => h.textContent?.includes('基本信息')
    );
    
    if (basicInfoHeading && basicInfoHeading.parentElement) {
      basicInfoHeading.style.borderLeft = '4px solid #000';
      basicInfoHeading.style.paddingLeft = '8px';
    }
    
    // Add unit labels where appropriate
    const assetInput = container.querySelector('#totalAssets');
    if (assetInput && assetInput.parentElement) {
      const unitLabel = document.createElement('span');
      unitLabel.className = 'unit-label';
      unitLabel.textContent = '万元';
      unitLabel.style.marginLeft = '4px';
      assetInput.parentElement.appendChild(unitLabel);
    }
    
    // Fix checkbox display for special fields
    const highTechCheckbox = container.querySelector('#highTechEnterprise');
    if (highTechCheckbox && highTechCheckbox instanceof HTMLElement) {
      highTechCheckbox.style.display = 'inline-block';
      highTechCheckbox.style.verticalAlign = 'middle';
    }
  } catch (error) {
    console.warn('Error applying template styling:', error);
  }
};
