
import { removeRedundantTextElements } from './textProcessing';
import { enhanceLayoutStructure } from './layoutStructure';
import { enhanceStyles } from './styleEnhancement';

// Main function to enhance layout for PDF export
export const enhanceLayout = (container: HTMLElement) => {
  try {
    removeRedundantTextElements(container);
    enhanceLayoutStructure(container);
    enhanceStyles(container);
  } catch (error) {
    console.warn('Error in layout enhancement:', error);
  }
};

