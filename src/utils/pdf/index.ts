
import { jsPDF } from 'jspdf';
import { safeGetElement } from './domHelpers';
import { prepareContentForExport } from './contentPreparation';
import { createCanvas, generateFilename, addContentToPDF } from './pdfGeneration';

// Main export function
export const exportToPDF = async (calculator: any) => {
  try {
    // Get the calculator content
    const content = safeGetElement('#calculator-content');
    if (!content) {
      throw new Error('计算器内容未找到');
    }
    
    // Add PDF export class to original content
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
      // Wait a bit to ensure DOM is fully processed
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Create canvas
      const canvas = await createCanvas(clonedContent);
      
      // Validate canvas
      if (canvas.width <= 0 || canvas.height <= 0) {
        throw new Error('Canvas has invalid dimensions');
      }
      
      // Initialize PDF - using A4 dimensions
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
      // Clean up
      if (tempContainer && tempContainer.parentElement) {
        tempContainer.parentElement.removeChild(tempContainer);
      }
      content.classList.remove('for-pdf-export');
    }
  } catch (error) {
    console.error('PDF export failed:', error);
    throw error;
  }
};
