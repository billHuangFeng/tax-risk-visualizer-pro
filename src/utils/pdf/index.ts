
import { generate } from '@pdfme/generator';
import { Template } from '@pdfme/common';
import { DEFAULT_TEMPLATES } from '@/constants/pdfTemplates';
import { PdfTemplate } from '@/types/pdfTemplates';

export const exportToPDF = async (calculator: any, template?: PdfTemplate) => {
  try {
    console.log("Starting PDF export with PDFME");
    
    // 选择模板或使用默认模板
    const selectedTemplate = template || DEFAULT_TEMPLATES[0];
    
    // 准备PDF数据
    const inputs = [
      {
        // 从计算器中收集所有相关数据
        companyName: calculator.companyName || '税务计算',
        totalRevenue: calculator.totalRevenue?.toString() || '0',
        invoicedRevenue: calculator.invoicedRevenue?.toString() || '0',
        taxableIncome: calculator.taxableIncome?.toString() || '0',
        actualTax: calculator.actualTax?.toString() || '0',
        riskPercentage: calculator.riskPercentage?.toString() || '0',
        // 添加更多需要的字段
      }
    ];
    
    // 创建一个符合PDFME Template类型要求的模板
    const pdfTemplate: Template = {
      basePdf: selectedTemplate.baseTemplate || new Uint8Array(),
      schemas: selectedTemplate.schemas ? 
        (Array.isArray(selectedTemplate.schemas) ? selectedTemplate.schemas : []) : 
        [[]]  // Ensure schemas is a valid array array even if undefined
    };
    
    // 使用PDFME生成PDF
    const pdf = await generate({
      template: pdfTemplate,
      inputs: inputs,
    });
    
    // 创建并下载PDF
    const blob = new Blob([pdf], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${calculator.companyName || '税务计算'}_${new Date().toISOString().slice(0, 10)}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    console.log("PDF generated successfully with PDFME");
    return true;
  } catch (error) {
    console.error('PDFME PDF generation error:', error);
    throw error;
  }
};
