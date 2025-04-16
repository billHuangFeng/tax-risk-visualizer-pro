
import { jsPDF } from 'jspdf';
import { safeGetElement } from './domHelpers';
import { prepareContentForExport } from './contentPreparation';
import { createCanvas, generateFilename, addContentToPDF } from './pdfGeneration';
import { PdfTemplate } from '@/types/pdfTemplates';
import { DEFAULT_TEMPLATES } from '@/constants/pdfTemplates';
import { applyTemplateStyles } from './templateService';

// 主导出函数
export const exportToPDF = async (calculator: any, template?: PdfTemplate) => {
  try {
    console.log("Starting PDF export process");
    
    // 获取计算器内容
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
