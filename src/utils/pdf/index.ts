
import { generatePdfWithPdfme, generatePdfWithHtml2Canvas } from './pdfmeGenerator';
import { PdfTemplate } from '@/types/pdfTemplates';

/**
 * Export calculator data to PDF
 * First try using PDFME library, if it fails fall back to HTML2Canvas method
 */
export const exportToPDF = async (calculatorData: any, template?: PdfTemplate): Promise<boolean> => {
  try {
    console.log("Starting PDF export process");
    
    // First try generating with PDFME
    const pdfmeSuccess = await generatePdfWithPdfme(calculatorData, template);
    
    // If PDFME is successful, return
    if (pdfmeSuccess) {
      console.log("PDFME PDF generation successful");
      return true;
    }
    
    // If PDFME fails, try HTML2Canvas method
    console.log("PDFME failed, trying HTML2Canvas method");
    const html2canvasSuccess = await generatePdfWithHtml2Canvas(calculatorData);
    
    if (html2canvasSuccess) {
      console.log("HTML2Canvas PDF generation successful");
      return true;
    }
    
    // If both methods fail, throw error
    throw new Error("无法使用任何方法生成PDF");
  } catch (error) {
    console.error("PDF export error:", error);
    throw error;
  }
};
