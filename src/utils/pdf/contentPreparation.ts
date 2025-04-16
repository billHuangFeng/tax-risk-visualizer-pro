
// Functions for preparing content for PDF export
import { markPdfOnlyElements } from './textProcessing';

export const prepareContentForExport = (content: HTMLElement): HTMLElement | null => {
  try {
    console.log("Preparing content for PDF export");
    
    // First, remove any existing temp container to avoid duplicates
    const existingTempContainer = document.getElementById('temp-pdf-container');
    if (existingTempContainer) {
      existingTempContainer.parentElement?.removeChild(existingTempContainer);
    }
    
    // Create a deep clone of the content
    const clonedContent = content.cloneNode(true) as HTMLElement;
    
    // Create temporary container with proper styling
    const tempContainer = document.createElement('div');
    tempContainer.id = 'temp-pdf-container';
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '-9999px';
    tempContainer.style.top = '0';
    tempContainer.style.width = '800px';
    tempContainer.style.backgroundColor = '#ffffff';
    tempContainer.style.zIndex = '-1000';
    
    // Add our special class for PDF styling
    clonedContent.classList.add('for-pdf-export');
    
    // Apply the PDF-export CSS
    const stylesheetLink = document.createElement('link');
    stylesheetLink.rel = 'stylesheet';
    stylesheetLink.href = '/src/styles/pdf-export.css';
    document.head.appendChild(stylesheetLink);
    
    // Process form elements before export
    prepareFormElements(clonedContent);
    
    // Remove duplicate elements
    removeDuplicateElements(clonedContent);
    
    // 确保PDF专用元素在导出时可见
    showPdfOnlyElements(clonedContent);
    
    // Add to body for rendering, but hidden
    document.body.appendChild(tempContainer);
    tempContainer.appendChild(clonedContent);
    
    console.log("Content preparation complete");
    return tempContainer;
  } catch (error) {
    console.error('Error preparing content for export:', error);
    return null;
  }
};

// 在PDF导出时显示仅PDF元素
const showPdfOnlyElements = (container: HTMLElement) => {
  try {
    // 找到所有PDF专用元素并使其可见
    const pdfOnlyElements = container.querySelectorAll('.pdf-only, .pdf-value, [data-pdf-only="true"]');
    pdfOnlyElements.forEach((element) => {
      if (element instanceof HTMLElement) {
        element.style.display = 'block';
        element.style.visibility = 'visible';
        element.style.opacity = '1';
      }
    });
    
    // 隐藏所有原始输入框
    const inputs = container.querySelectorAll('input');
    inputs.forEach((input) => {
      if (input instanceof HTMLInputElement) {
        input.style.display = 'none';
      }
    });
  } catch (error) {
    console.warn('Error showing PDF-only elements:', error);
  }
};

// Prepare form elements for PDF export
const prepareFormElements = (container: HTMLElement) => {
  try {
    // Store values from inputs as data-value attributes
    const inputs = container.querySelectorAll('input');
    inputs.forEach((input) => {
      if (input instanceof HTMLInputElement) {
        input.setAttribute('data-value', input.value || '');
      }
    });
    
    // Mark PDF-only elements
    markPdfOnlyElements(container);
    
    // Ensure checkboxes have proper data-state
    const checkboxes = container.querySelectorAll('[role="checkbox"]');
    checkboxes.forEach((checkbox) => {
      if (checkbox instanceof HTMLElement) {
        // Store current state for later processing
        const isChecked = checkbox.getAttribute('data-state') === 'checked';
        checkbox.setAttribute('data-checked', isChecked ? 'true' : 'false');
      }
    });
  } catch (error) {
    console.warn('Error preparing form elements:', error);
  }
};

// Remove duplicate elements that might appear in PDF export
const removeDuplicateElements = (container: HTMLElement) => {
  try {
    // Remove duplicate inputs with the same ID
    const seenIds = new Set<string>();
    const inputs = container.querySelectorAll('input');
    
    inputs.forEach((input: HTMLInputElement) => {
      if (input.id && seenIds.has(input.id)) {
        // This is a duplicate input, remove its parent
        const parent = input.parentElement;
        if (parent) {
          parent.style.display = 'none';
          parent.classList.add('pdf-duplicate');
        }
      } else if (input.id) {
        seenIds.add(input.id);
      }
    });
    
    // Remove duplicate headings with the same text
    const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const seenHeadings = new Map<string, HTMLElement>();
    
    headings.forEach((heading) => {
      if (heading instanceof HTMLElement) {
        const headingText = heading.textContent?.trim() || '';
        if (headingText && seenHeadings.has(headingText)) {
          heading.style.display = 'none';
          heading.classList.add('pdf-duplicate');
        } else if (headingText) {
          seenHeadings.set(headingText, heading);
        }
      }
    });
    
    // Remove buttons and action elements that shouldn't be in the PDF
    const actionElements = container.querySelectorAll('button, .button, [type="button"], .action-button');
    actionElements.forEach((el) => {
      if (el instanceof HTMLElement) {
        el.style.display = 'none';
      }
    });
  } catch (error) {
    console.warn('Error removing duplicate elements:', error);
  }
};
