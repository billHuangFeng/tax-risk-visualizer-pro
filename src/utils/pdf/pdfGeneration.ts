
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { processTextElements } from './styles/textStyles';
import { processInputFields } from './styles/inputStyles';
import { processCheckboxes, enhanceTables } from './formElements';
import { enhanceLayout } from './enhancer';

// Create canvas from prepared content
const createCanvas = async (content: HTMLElement): Promise<HTMLCanvasElement> => {
  console.log("Starting HTML to canvas conversion");
  await new Promise(resolve => setTimeout(resolve, 2000)); // Increased timeout for better rendering
  
  try {
    const canvas = await html2canvas(content, {
      scale: 2, // Higher scale for better quality
      useCORS: true,
      logging: true,
      backgroundColor: '#ffffff',
      allowTaint: true,
      width: 800, // Fixed width for better formatting
      onclone: (document, element) => {
        console.log("Cloned document prepared for rendering");
        
        try {
          // Apply all styles needed for PDF export
          element.classList.add('for-pdf-export');
          
          // Process text elements to ensure visibility
          processTextElements(element);
          
          // Process input fields for better display
          processInputFields(element);
          
          // Process checkboxes and table elements
          processCheckboxes(element);
          enhanceTables(element);
          
          // Apply final layout enhancements
          enhanceLayout(element);
          
          // Ensure all styles are applied
          const style = document.createElement('style');
          style.textContent = `
            .for-pdf-export * {
              color: #000 !important;
              visibility: visible !important;
              opacity: 1 !important;
              font-family: "SimSun", serif !important;
            }
            .for-pdf-export h2 {
              font-size: 16px !important;
              font-weight: bold !important;
              margin-top: 24px !important;
              margin-bottom: 16px !important;
              border-bottom: 1px solid #000 !important;
              padding-bottom: 8px !important;
            }
            .for-pdf-export table {
              width: 100% !important;
              border-collapse: collapse !important;
              margin: 16px 0 !important;
            }
            .for-pdf-export table th, .for-pdf-export table td {
              border: 1px solid #000 !important;
              padding: 8px !important;
            }
            .for-pdf-export [role="checkbox"] {
              display: inline-block !important;
              width: 16px !important;
              height: 16px !important;
              border: 1px solid #000 !important;
              position: relative !important;
            }
          `;
          element.appendChild(style);
          
          // Make sure the element and all its children are visible
          element.style.display = 'block';
          element.style.visibility = 'visible';
          element.style.width = '800px';
          element.style.padding = '40px';
          element.style.boxSizing = 'border-box';
          element.style.position = 'relative';
          element.style.minHeight = '1200px';
          element.style.fontFamily = 'SimSun, serif';
        } catch (error) {
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
    return `${calculator.companyName}_税务计算_${today}`;
  }
  return `税务计算_${today}`;
};

// Add content to PDF document
const addContentToPDF = (pdf: jsPDF, canvas: HTMLCanvasElement, margin: number): void => {
  try {
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    
    if (canvas.width <= 0 || canvas.height <= 0) {
      throw new Error("Canvas has invalid dimensions");
    }

    const imgWidth = pageWidth - (2 * margin);
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    let position = margin;
    let heightLeft = imgHeight;
    
    // Add first page
    pdf.addImage(
      canvas.toDataURL('image/jpeg', 0.95), 
      'JPEG', 
      margin, 
      position, 
      imgWidth, 
      imgHeight
    );
    
    heightLeft -= (pageHeight - margin * 2);
    position = -(pageHeight - margin * 2);
    
    // Add additional pages if needed
    while (heightLeft > 0) {
      pdf.addPage();
      pdf.addImage(
        canvas.toDataURL('image/jpeg', 0.95), 
        'JPEG', 
        margin, 
        position, 
        imgWidth, 
        imgHeight
      );
      
      heightLeft -= (pageHeight - margin * 2);
      position -= (pageHeight - margin * 2);
    }
  } catch (error) {
    console.error('Error adding content to PDF:', error);
    throw error;
  }
};

export { createCanvas, generateFilename, addContentToPDF };
