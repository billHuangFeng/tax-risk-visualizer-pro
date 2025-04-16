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
    tempContainer.classList.add('pdf-temp-element', 'pdf-export-container', 'for-pdf-export');
    
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

// Process text elements for PDF display
const processTextElements = (container: HTMLElement) => {
  try {
    // Process all text-containing elements
    const textElements = container.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, label, div');
    textElements.forEach((el: Element) => {
      if (el instanceof HTMLElement) {
        // Ensure text is visible
        el.style.color = '#000';
        el.style.visibility = 'visible';
        el.style.opacity = '1';
        
        // If element has no content but has child elements with text, ensure they're visible
        if (el.childNodes.length > 0) {
          el.childNodes.forEach((child) => {
            if (child instanceof HTMLElement) {
              child.style.color = '#000';
              child.style.visibility = 'visible';
              child.style.opacity = '1';
            }
          });
        }
      }
    });
  } catch (error) {
    console.warn('Error processing text elements:', error);
  }
};

// Process input fields for PDF display with improved safety
const processInputFields = (container: HTMLElement) => {
  try {
    const inputs = container.querySelectorAll('input');
    inputs.forEach((input: HTMLInputElement) => {
      const parentElement = input.parentElement;
      if (!parentElement) return;
      
      // For all inputs, create or update a visible text element to show the value
      let valueDisplay = parentElement.querySelector('.pdf-value');
      
      if (!valueDisplay) {
        valueDisplay = document.createElement('div');
        valueDisplay.className = 'pdf-value';
        valueDisplay.setAttribute('data-pdf-value', 'true');
        valueDisplay.style.position = 'absolute';
        valueDisplay.style.right = input.classList.contains('text-right') ? '8px' : 'auto';
        valueDisplay.style.left = input.classList.contains('text-right') ? 'auto' : '8px';
        valueDisplay.style.top = '50%';
        valueDisplay.style.transform = 'translateY(-50%)';
        valueDisplay.style.color = '#000';
        valueDisplay.style.fontWeight = 'bold';
        valueDisplay.style.fontSize = '14px';
        parentElement.appendChild(valueDisplay);
      }
      
      if (valueDisplay instanceof HTMLElement) {
        // Make sure we show the input value or a default
        valueDisplay.textContent = input.value || '0';
        valueDisplay.style.visibility = 'visible';
        valueDisplay.style.opacity = '1';
      }
      
      // Remove the border from the input
      input.style.border = 'none';
      input.style.boxShadow = 'none';
      input.style.outline = 'none';
      input.style.backgroundColor = 'transparent';
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
      if (checkbox instanceof HTMLElement) {
        // Make checkbox visible in PDF
        checkbox.style.visibility = 'visible';
        checkbox.style.display = 'inline-block';
        
        if (checkbox.getAttribute('data-state') === 'checked') {
          checkbox.style.border = '2px solid #000';
          checkbox.style.backgroundColor = '#000';
          
          const checkIcon = checkbox.querySelector('svg');
          if (checkIcon && checkIcon instanceof SVGElement) {
            checkIcon.style.color = '#fff';
            checkIcon.style.visibility = 'visible';
            checkIcon.style.display = 'block';
            checkIcon.setAttribute('data-keep-in-pdf', 'true');
          }
        } else {
          checkbox.style.border = '2px solid #000';
          checkbox.style.backgroundColor = 'transparent';
        }
      }
    });
  } catch (error) {
    console.warn('Error processing checkboxes:', error);
  }
};

// Enhance tables for PDF visibility
const enhanceTables = (container: HTMLElement) => {
  try {
    // Find all tables and ensure they're properly styled for PDF
    const tables = container.querySelectorAll('table');
    tables.forEach((table: HTMLTableElement) => {
      table.style.borderCollapse = 'collapse';
      table.style.width = '100%';
      table.style.visibility = 'visible';
      table.style.display = 'table';
      
      // Style table rows
      const rows = table.querySelectorAll('tr');
      rows.forEach((row: HTMLTableRowElement) => {
        row.style.display = 'table-row';
        row.style.visibility = 'visible';
        
        // Style table cells
        const cells = row.querySelectorAll('td, th');
        cells.forEach((cell: HTMLTableCellElement) => {
          cell.style.padding = '8px';
          cell.style.display = 'table-cell';
          cell.style.visibility = 'visible';
          cell.style.color = '#000';
          
          // Ensure any content inside the cell is visible
          const textElements = cell.querySelectorAll('p, span, div');
          textElements.forEach((el: Element) => {
            if (el instanceof HTMLElement) {
              el.style.color = '#000';
              el.style.visibility = 'visible';
            }
          });
          
          // Process any inputs inside cells
          const inputs = cell.querySelectorAll('input');
          inputs.forEach((input: HTMLInputElement) => {
            input.style.border = 'none';
            input.style.boxShadow = 'none';
            
            // Create or find the value display
            let valueDisplay = cell.querySelector('.pdf-value');
            if (!valueDisplay) {
              valueDisplay = document.createElement('div');
              valueDisplay.className = 'pdf-value';
              valueDisplay.setAttribute('data-pdf-value', 'true');
              cell.appendChild(valueDisplay);
            }
            
            if (valueDisplay instanceof HTMLElement) {
              valueDisplay.textContent = input.value || '0';
              valueDisplay.style.visibility = 'visible';
              valueDisplay.style.opacity = '1';
              valueDisplay.style.color = '#000';
              valueDisplay.style.fontWeight = 'bold';
            }
          });
        });
      });
    });
  } catch (error) {
    console.warn('Error enhancing tables:', error);
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

// Enhance layout is properly displayed
const enhanceLayout = (container: HTMLElement) => {
  try {
    // Process headings to ensure they're visible and properly styled
    const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headings.forEach((heading: Element) => {
      if (heading instanceof HTMLElement) {
        heading.style.color = '#000';
        heading.style.fontWeight = 'bold';
        heading.style.marginBottom = '16px';
        heading.style.display = 'block';
        heading.style.visibility = 'visible';
        heading.style.opacity = '1';
      }
    });
    
    // Ensure grid layouts are properly displayed
    const gridItems = container.querySelectorAll('[class*="grid"]');
    gridItems.forEach((grid: Element) => {
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

// Create canvas from prepared content with improved safety
const createCanvas = async (content: HTMLElement): Promise<HTMLCanvasElement> => {
  console.log("Starting HTML to canvas conversion");
  // Give the DOM time to process all styling changes
  await new Promise(resolve => setTimeout(resolve, 1200));
  
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
          // Apply all our enhancing functions to the cloned element
          processTextElements(element);
          processInputFields(element);
          processCheckboxes(element);
          enhanceTables(element);
          enhanceLayout(element);
          removeRedundantTextElements(element);
        } catch (error) {
          // Silent fail to prevent html2canvas from crashing
          console.warn("Error in html2canvas onclone callback:", error);
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

// Add content to PDF document with improved safety
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
    
    // Add PDF export class to original content (this will be removed in cleanup)
    content.classList.add('for-pdf-export');
    
    // Prepare the content for export
    const tempContainer = prepareContentForExport(content);
    if (!tempContainer) {
      throw new Error('准备导出内容时出错');
    }
    
    const clonedContent = tempContainer.firstChild as HTMLElement;
    if (!clonedContent) {
      throw new Error('导出内容克隆失败');
    }
    
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
