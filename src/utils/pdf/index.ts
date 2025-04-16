
import { generatePdfWithPdfme, generatePdfWithHtml2Canvas } from './pdfmeGenerator';
import { PdfTemplate } from '@/types/pdfTemplates';

/**
 * 导出计算器数据到PDF
 * 先尝试使用PDFME库，如果失败则回退到HTML2Canvas方法
 */
export const exportToPDF = async (calculatorData: any, template?: PdfTemplate): Promise<boolean> => {
  try {
    console.log("Starting PDF export process");
    
    // 首先尝试使用PDFME生成PDF
    const pdfmeSuccess = await generatePdfWithPdfme(calculatorData, template);
    
    // 如果PDFME成功，直接返回
    if (pdfmeSuccess) {
      console.log("PDFME PDF generation successful");
      return true;
    }
    
    // 如果PDFME失败，尝试使用HTML2Canvas方法
    console.log("PDFME failed, trying HTML2Canvas method");
    const html2canvasSuccess = await generatePdfWithHtml2Canvas(calculatorData);
    
    if (html2canvasSuccess) {
      console.log("HTML2Canvas PDF generation successful");
      return true;
    }
    
    // 如果两种方法都失败，抛出错误
    throw new Error("无法使用任何方法生成PDF");
  } catch (error) {
    console.error("PDF export error:", error);
    throw error;
  }
};
