
// Functions for enhancing layout for PDF export

import { elementExists } from './domHelpers';

// Remove redundant text elements
export const removeRedundantTextElements = (container: HTMLElement) => {
  try {
    const redundantSpans = container.querySelectorAll('span:not(.pdf-value)[style*="position: absolute"]');
    redundantSpans.forEach((span) => {
      if (span.parentElement && elementExists(span) && span.parentElement.contains(span)) {
        try {
          span.parentElement.removeChild(span);
        } catch (e) {
          console.warn('Could not remove redundant span:', e);
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
    const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headings.forEach((heading) => {
      if (heading instanceof HTMLElement) {
        heading.style.color = '#000';
        heading.style.fontWeight = 'bold';
        heading.style.marginBottom = '16px';
        heading.style.display = 'block';
        heading.style.visibility = 'visible';
        heading.style.opacity = '1';
      }
    });
    
    const gridItems = container.querySelectorAll('[class*="grid"]');
    gridItems.forEach((grid) => {
      if (grid instanceof HTMLElement) {
        grid.style.display = 'block';
        grid.style.marginBottom = '16px';
        grid.style.visibility = 'visible';
      }
    });
  } catch (error) {
    console.warn('Error enhancing layout:', error);
  }
};
