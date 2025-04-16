
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { createScreenshotPdf } from './screenshotService';

export const exportToPDF = async (calculatorData: any): Promise<boolean> => {
  try {
    console.log("开始PDF导出流程", calculatorData);
    
    // 使用屏幕截图方式导出PDF，按照所见即所得
    const success = await createScreenshotPdf(calculatorData);
    
    console.log("PDF生成成功");
    return success;
  } catch (error) {
    console.error("PDF导出错误:", error);
    throw error;
  }
};
