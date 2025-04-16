
import { jsPDF } from 'jspdf';
import { safeGetElement } from './domHelpers';
import { prepareContentForExport } from './contentPreparation';
import { createCanvas, generateFilename, addContentToPDF } from './pdfGeneration';
import { PdfTemplate } from '@/types/pdfTemplates';
import { DEFAULT_TEMPLATES } from '@/constants/pdfTemplates';
import { applyTemplateStyles } from './templateService';

// 用于检查ReportBro是否可用
const isReportBroAvailable = () => {
  return typeof window !== 'undefined' && window.ReportBro && window.ReportBroDesigner;
};

// 使用ReportBro生成PDF
const generatePdfWithReportBro = async (
  data: any,
  reportDefinition: any
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    try {
      if (!window.ReportBro) {
        throw new Error('ReportBro is not available');
      }

      // 创建报表对象
      const rb = new window.ReportBro(reportDefinition);
      
      // 生成PDF
      rb.generatePdf(data, {}, {})
        .then((pdfData: Blob) => {
          resolve(pdfData);
        })
        .catch((error: any) => {
          console.error('ReportBro PDF generation error:', error);
          reject(error);
        });
    } catch (error) {
      console.error('Error generating PDF with ReportBro:', error);
      reject(error);
    }
  });
};

// 主导出函数
export const exportToPDF = async (calculator: any, template?: PdfTemplate) => {
  try {
    console.log("Starting PDF export process");
    
    // 如果有模板并且包含ReportBro定义，尝试使用ReportBro
    if (template?.reportDefinition && isReportBroAvailable()) {
      try {
        console.log("Using ReportBro for PDF generation");
        
        // 准备数据
        const pdfData = await generatePdfWithReportBro(calculator, template.reportDefinition);
        
        // 创建URL并下载
        const url = URL.createObjectURL(pdfData);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${generateFilename(calculator)}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        return true;
      } catch (rbError) {
        console.error("ReportBro PDF generation failed, falling back to default method:", rbError);
        // 出错时回退到默认方法
      }
    }
    
    // 默认导出方法（HTML转Canvas转PDF）
    const content = safeGetElement('#calculator-content');
    if (!content) {
      throw new Error('计算器内容未找到');
    }
    
    // 准备导出内容
    const tempContainer = prepareContentForExport(content);
    if (!tempContainer) {
      throw new Error('准备导出内容时出错');
    }
    
    const clonedContent = tempContainer.firstChild as HTMLElement;
    if (!clonedContent) {
      throw new Error('导出内容克隆失败');
    }
    
    // 如果提供了模板，应用模板样式
    if (template) {
      applyTemplateStyles(clonedContent, template);
    }
    
    try {
      // 等待以确保CSS已应用
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // 从准备好的内容创建画布
      const canvas = await createCanvas(clonedContent);
      
      // 验证画布
      if (canvas.width <= 0 || canvas.height <= 0) {
        throw new Error('Canvas has invalid dimensions');
      }
      
      // 初始化PDF（A4格式纵向）
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });
      
      // 向PDF添加内容（带边距）
      const margin = 10; // mm
      addContentToPDF(pdf, canvas, margin);
      
      // 使用生成的文件名保存PDF
      const filename = generateFilename(calculator);
      pdf.save(`${filename}.pdf`);
      console.log("PDF saved successfully");
      
      return true;
    } catch (error) {
      console.error('PDF generation error:', error);
      throw error;
    } finally {
      // 清理
      if (tempContainer && tempContainer.parentElement) {
        tempContainer.parentElement.removeChild(tempContainer);
      }
    }
  } catch (error) {
    console.error('PDF export failed:', error);
    throw error;
  }
};
