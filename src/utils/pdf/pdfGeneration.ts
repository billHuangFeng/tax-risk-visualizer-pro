
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { processTextElements, processInputFields } from './elementStyles';
import { processCheckboxes, enhanceTables } from './formElements';
import { enhanceLayout, removeRedundantTextElements } from './layoutEnhancement';

// Create canvas from prepared content
const createCanvas = async (content: HTMLElement): Promise<HTMLCanvasElement> => {
  console.log("Starting HTML to canvas conversion");
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  try {
    const canvas = await html2canvas(content, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      allowTaint: true,
      width: 1200,
      onclone: (document, element) => {
        console.log("Cloned document prepared for rendering");
        
        try {
          processTextElements(element);
          processInputFields(element);
          processCheckboxes(element);
          enhanceTables(element);
          enhanceLayout(element);
          removeRedundantTextElements(element);
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
    return `${calculator.companyName}_${today}`;
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
    
    pdf.addImage(
      canvas.toDataURL('image/jpeg', 0.95), 
      'JPEG', 
      margin, 
      margin, 
      imgWidth, 
      imgHeight
    );
    
    let heightLeft = imgHeight - (pageHeight - 2 * margin);
    let position = 0;
    let page = 1;
    
    while (heightLeft > 0) {
      pdf.addPage();
      page++;
      position = margin - (page - 1) * (pageHeight - 2 * margin);
      pdf.addImage(
        canvas.toDataURL('image/jpeg', 0.95), 
        'JPEG', 
        margin, 
        position, 
        imgWidth, 
        imgHeight
      );
      heightLeft -= (pageHeight - 2 * margin);
    }
    
    console.log(`PDF created with ${page} pages`);
  } catch (error) {
    console.error('Error adding content to PDF:', error);
    throw error;
  }
};

export { createCanvas, generateFilename, addContentToPDF };
