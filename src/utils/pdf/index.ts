
import { jsPDF } from 'jspdf';
import { safeGetElement } from './domHelpers';
import { prepareContentForExport } from './contentPreparation';
import { createCanvas, generateFilename, addContentToPDF } from './pdfGeneration';

// Main export function
export const exportToPDF = async (calculator: any) => {
  try {
    console.log("Starting PDF export process");
    
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
    
    try {
      // Wait a bit to ensure CSS is applied
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create canvas from prepared content
      const canvas = await createCanvas(clonedContent);
      
      // Validate canvas
      if (canvas.width <= 0 || canvas.height <= 0) {
        throw new Error('Canvas has invalid dimensions');
      }
      
      // Initialize PDF (A4 format in portrait)
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });
      
      // Add content to PDF with margin
      const margin = 10; // mm
      addContentToPDF(pdf, canvas, margin);
      
      // Save PDF with generated filename
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
    }
  } catch (error) {
    console.error('PDF export failed:', error);
    throw error;
  }
};
