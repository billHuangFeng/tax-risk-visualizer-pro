
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

// Safely check if an element exists and is attached to the DOM
const elementExists = (element: Element | null): boolean => {
  return !!(element && document.body.contains(element));
};

// Safely get an element by its id or selector
const safeGetElement = (selector: string): HTMLElement | null => {
  try {
    return document.querySelector(selector) as HTMLElement;
  } catch (error) {
    console.warn(`Could not find element with selector: ${selector}`, error);
    return null;
  }
};

// Safely remove an element without causing DOM errors
const safeRemoveElement = (element: Element | null): void => {
  if (!element) return;
  
  try {
    // Check if element is in the DOM and has a parent
    if (elementExists(element) && element.parentNode) {
      element.parentNode.removeChild(element);
    }
  } catch (error) {
    console.warn('Failed to safely remove element:', error);
  }
};

// Prepare cloned content for PDF export with improved safety
const prepareContentForExport = (content: HTMLElement): HTMLElement | null => {
  // First remove any existing temp containers to avoid duplicates
  const existingTempContainer = document.getElementById('temp-pdf-container');
  if (existingTempContainer) {
    safeRemoveElement(existingTempContainer);
  }
  
  try {
    // Create a deep clone of the content
    const clonedContent = content.cloneNode(true) as HTMLElement;
    
    // Create a new temporary container
    const tempContainer = document.createElement('div');
    tempContainer.id = 'temp-pdf-container';
    tempContainer.classList.add('pdf-temp-element', 'pdf-export-container');
    
    // Set container styles
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '-9999px';
    tempContainer.style.top = '0';
    tempContainer.style.width = '1200px';
    tempContainer.style.backgroundColor = '#ffffff';
    
    // Safely append to body
    document.body.appendChild(tempContainer);
    tempContainer.appendChild(clonedContent);
    
    return tempContainer;
  } catch (error) {
    console.error('Error preparing content for export:', error);
    return null;
  }
};

// Process input fields for PDF display with improved safety
const processInputFields = (container: HTMLElement) => {
  try {
    const inputs = container.querySelectorAll('input');
    inputs.forEach((input: HTMLInputElement) => {
      const parentElement = input.parentElement;
      if (!parentElement) return;
      
      // Check if a pdf-value element already exists
      const existingValueDisplay = parentElement.querySelector('.pdf-value');
      
      // Only create a value display if one doesn't already exist
      if (!existingValueDisplay) {
        const valueDisplay = document.createElement('div');
        valueDisplay.textContent = input.value || '0';
        valueDisplay.className = 'pdf-value';
        valueDisplay.setAttribute('data-pdf-value', 'true');
        valueDisplay.style.position = 'absolute';
        valueDisplay.style.left = '0';
        valueDisplay.style.top = '0';
        valueDisplay.style.width = '100%';
        valueDisplay.style.height = '100%';
        valueDisplay.style.display = 'flex';
        valueDisplay.style.alignItems = 'center';
        valueDisplay.style.justifyContent = input.classList.contains('text-right') ? 'flex-end' : 'flex-start';
        valueDisplay.style.paddingRight = input.classList.contains('text-right') ? '8px' : '0';
        valueDisplay.style.paddingLeft = !input.classList.contains('text-right') ? '8px' : '0';
        valueDisplay.style.backgroundColor = '#fff';
        valueDisplay.style.color = '#000';
        valueDisplay.style.fontSize = '14px';
        valueDisplay.style.fontWeight = 'bold';
        valueDisplay.style.zIndex = '10';
        
        parentElement.appendChild(valueDisplay);
        
        // Hide the input for PDF export
        input.style.opacity = '0';
      } else if (existingValueDisplay instanceof HTMLElement) {
        // Update the existing value display
        existingValueDisplay.textContent = input.value || '0';
        existingValueDisplay.setAttribute('data-pdf-value', 'true');
      }
    });
  } catch (error) {
    console.warn('Error processing input fields:', error);
  }
};

// Process checkboxes for PDF display with improved safety
const processCheckboxes = (container: HTMLElement) => {
  try {
    const checkboxes = container.querySelectorAll('[role="checkbox"]');
    checkboxes.forEach((checkbox: Element) => {
      const checkboxElement = checkbox as HTMLElement;
      
      if (checkboxElement.getAttribute('data-state') === 'checked') {
        checkboxElement.style.backgroundColor = '#000';
        checkboxElement.style.border = '2px solid #000';
        
        const checkIcon = checkboxElement.querySelector('svg');
        if (checkIcon && checkIcon instanceof SVGElement) {
          checkIcon.style.color = '#fff';
          checkIcon.style.width = '16px';
          checkIcon.style.height = '16px';
        }
      } else {
        checkboxElement.style.border = '2px solid #000';
      }
    });
  } catch (error) {
    console.warn('Error processing checkboxes:', error);
  }
};

// Enhance visual elements for PDF with improved safety
const enhanceVisualElements = (container: HTMLElement) => {
  try {
    // Make all text elements visible with proper styling
    const allElements = container.querySelectorAll('*');
    allElements.forEach((el: Element) => {
      if (el instanceof HTMLElement && el.style) {
        el.style.color = '#000';
        el.style.textShadow = 'none';
        el.style.boxShadow = 'none';
      }
    });
    
    // Ensure table elements are visible
    const tableCells = container.querySelectorAll('td');
    tableCells.forEach((cell: Element) => {
      if (cell instanceof HTMLElement) {
        cell.style.border = '1px solid #ddd';
        cell.style.padding = '8px';
        cell.style.color = '#000';
        cell.style.backgroundColor = '#fff';
      }
    });

    // Make text elements visible
    const textElements = container.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, label, div');
    textElements.forEach((el: Element) => {
      if (el instanceof HTMLElement && el.textContent && el.textContent.trim() !== '') {
        el.style.color = '#000';
        el.style.fontWeight = el.tagName.startsWith('H') ? 'bold' : 'normal';
        el.style.visibility = 'visible';
        el.style.opacity = '1';
      }
    });
    
    // Fix specific PDF value visibility
    const pdfValues = container.querySelectorAll('.pdf-value');
    pdfValues.forEach((el: Element) => {
      if (el instanceof HTMLElement) {
        el.style.opacity = '1';
        el.style.visibility = 'visible';
        el.style.color = '#000';
        el.style.backgroundColor = '#fff';
      }
    });
    
    // Remove any duplicated text elements that might have been created
    removeRedundantTextElements(container);
  } catch (error) {
    console.warn('Error enhancing visual elements:', error);
  }
};

// Remove redundant text elements with improved safety
const removeRedundantTextElements = (container: HTMLElement) => {
  try {
    // Find all spans that were added by the onclone callback in html2canvas
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

// Force all input values to be visible with improved safety
const forceInputValuesVisible = (container: HTMLElement) => {
  try {
    // Find all input elements and their containers
    const inputContainers = container.querySelectorAll('.pdf-text-visible');
    inputContainers.forEach((container: Element) => {
      if (container instanceof HTMLElement) {
        container.style.position = 'relative';
        
        // Get the input within this container
        const input = container.querySelector('input');
        if (input && input instanceof HTMLInputElement) {
          // Get or create the value display div
          let valueDisplay = container.querySelector('.pdf-value');
          if (!valueDisplay) {
            valueDisplay = document.createElement('div');
            valueDisplay.className = 'pdf-value';
            valueDisplay.setAttribute('data-pdf-value', 'true');
            container.appendChild(valueDisplay);
          }
          
          // Make sure value display is visible and has the input value
          if (valueDisplay instanceof HTMLElement) {
            valueDisplay.textContent = input.value || '0';
            valueDisplay.style.position = 'absolute';
            valueDisplay.style.right = '10px';
            valueDisplay.style.top = '50%';
            valueDisplay.style.transform = 'translateY(-50%)';
            valueDisplay.style.opacity = '1';
            valueDisplay.style.visibility = 'visible';
            valueDisplay.style.color = '#000';
            valueDisplay.style.backgroundColor = '#fff';
            valueDisplay.style.zIndex = '100';
            valueDisplay.style.fontWeight = 'bold';
          }
        }
      }
    });
  } catch (error) {
    console.warn('Error forcing input values visible:', error);
  }
};

// Create canvas from prepared content with improved safety
const createCanvas = async (content: HTMLElement): Promise<HTMLCanvasElement> => {
  console.log("Starting HTML to canvas conversion");
  // Give the DOM time to process all styling changes
  await new Promise(resolve => setTimeout(resolve, 500));
  
  try {
    const canvas = await html2canvas(content, {
      scale: 2,
      useCORS: true,
      logging: false, // Reduce logging noise
      backgroundColor: '#ffffff',
      allowTaint: true,
      width: 1200,
      onclone: (document, element) => {
        console.log("Cloned document prepared for rendering");
        
        try {
          // Mark all existing value displays to prevent duplication
          const existingDisplays = element.querySelectorAll('.pdf-value');
          existingDisplays.forEach((display) => {
            display.setAttribute('data-pdf-value', 'true');
          });
          
          // Safely remove any already generated spans to avoid duplication
          const redundantSpans = element.querySelectorAll('span:not([data-pdf-value="true"])[style*="position: absolute"]');
          redundantSpans.forEach((span) => {
            if (span.parentElement && span.parentElement.contains(span)) {
              try {
                span.parentElement.removeChild(span);
              } catch (e) {
                // Silent fail
              }
            }
          });
        } catch (error) {
          // Silent fail to prevent html2canvas from crashing
        }
      }
    });
    
    console.log("Canvas created successfully", canvas.width, canvas.height);
    return canvas;
  } catch (error) {
    console.error("Canvas creation failed:", error);
    throw error;
  }
};

// Generate filename for PDF
const generateFilename = (calculator: any): string => {
  const today = new Date().toISOString().slice(0, 10);
  if (calculator.companyName && calculator.companyName.trim() !== '') {
    return `${calculator.companyName}_${today}`;
  }
  return `税务计算_${today}`;
};

// Add content to PDF document with improved safety - THIS FUNCTION FIXED
const addContentToPDF = (pdf: jsPDF, canvas: HTMLCanvasElement, margin: number): void => {
  try {
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    
    // Check if canvas has valid dimensions
    if (canvas.width <= 0 || canvas.height <= 0) {
      console.error("Invalid canvas dimensions:", canvas.width, canvas.height);
      throw new Error("Canvas has invalid dimensions");
    }

    // Calculate image dimensions to fit the page width
    const imgWidth = pageWidth - (2 * margin);
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    // Add first page
    pdf.addImage(
      canvas.toDataURL('image/jpeg', 0.95), 
      'JPEG', 
      margin, 
      margin, 
      imgWidth, 
      imgHeight
    );
    
    // Check if content needs multiple pages
    let heightLeft = imgHeight - (pageHeight - 2 * margin);
    let position = 0;
    let page = 1;
    
    // Add additional pages if needed
    while (heightLeft > 0) {
      // Add a new page
      pdf.addPage();
      page++;
      
      // Calculate new position (negative to move the image up)
      position = margin - (page - 1) * (pageHeight - 2 * margin);
      
      // Add the image at the new position
      pdf.addImage(
        canvas.toDataURL('image/jpeg', 0.95), 
        'JPEG', 
        margin, 
        position, 
        imgWidth, 
        imgHeight
      );
      
      // Reduce remaining height
      heightLeft -= (pageHeight - 2 * margin);
    }
    
    console.log(`PDF created with ${page} pages`);
  } catch (error) {
    console.error('Error adding content to PDF:', error);
    throw error;
  }
};

// Clean up after PDF export with improved safety
const cleanupAfterExport = (): void => {
  try {
    // Find and remove the temporary container
    const tempContainer = document.getElementById('temp-pdf-container');
    if (tempContainer) {
      safeRemoveElement(tempContainer);
    }
    
    // Remove any orphaned PDF-related elements
    const orphanedElements = document.querySelectorAll('.pdf-temp-element');
    orphanedElements.forEach((element) => {
      safeRemoveElement(element);
    });
    
    // Remove PDF-specific classes from the calculator content
    const calculatorContent = document.getElementById('calculator-content');
    if (calculatorContent) {
      calculatorContent.classList.remove('for-pdf-export', 'pdf-export-container');
    }
  } catch (error) {
    console.warn('Error during cleanup:', error);
  }
};

// Main export function with improved error handling and DOM safety
export const exportToPDF = async (calculator: any) => {
  // Always clean up first to prevent stale elements from previous exports
  cleanupAfterExport();
  
  try {
    // Get the calculator content
    const content = safeGetElement('#calculator-content');
    if (!content) {
      throw new Error('计算器内容未找到');
    }
    
    // Prepare the content for export
    const tempContainer = prepareContentForExport(content);
    if (!tempContainer) {
      throw new Error('准备导出内容时出错');
    }
    
    const clonedContent = tempContainer.firstChild as HTMLElement;
    if (!clonedContent) {
      throw new Error('导出内容克隆失败');
    }
    
    // Process elements for better PDF rendering
    processInputFields(clonedContent);
    processCheckboxes(clonedContent);
    enhanceVisualElements(clonedContent);
    forceInputValuesVisible(clonedContent);
    
    try {
      // Create canvas
      const canvas = await createCanvas(clonedContent);
      
      // Validate canvas
      if (canvas.width <= 0 || canvas.height <= 0) {
        throw new Error('Canvas has invalid dimensions');
      }
      
      // Initialize PDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });
      
      // Add content to PDF
      const margin = 10;
      addContentToPDF(pdf, canvas, margin);
      
      // Save PDF
      const filename = generateFilename(calculator);
      pdf.save(`${filename}.pdf`);
      console.log("PDF saved successfully");
      
      return true;
    } catch (error) {
      console.error('PDF generation error:', error);
      throw error;
    } finally {
      // Always clean up, even if there's an error during PDF creation
      cleanupAfterExport();
    }
  } catch (error) {
    console.error('PDF export failed:', error);
    // Ensure cleanup happens even if the overall process fails
    cleanupAfterExport();
    throw error;
  }
};
