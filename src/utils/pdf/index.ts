
import { generate } from '@pdfme/generator';
import { Template } from '@pdfme/common';
import { DEFAULT_TEMPLATES } from '@/constants/pdfTemplates';
import { PdfTemplate } from '@/types/pdfTemplates';

export const exportToPDF = async (calculator: any, template?: PdfTemplate) => {
  try {
    console.log("Starting PDF export with PDFME");
    
    // 选择模板或使用默认模板
    const selectedTemplate = template || DEFAULT_TEMPLATES[0];
    
    // 准备PDF数据 - 从计算器中收集所有相关数据
    const inputs = [
      {
        companyName: calculator.companyName || '税务计算',
        totalRevenue: calculator.totalRevenue?.toString() || '0',
        invoicedRevenue: calculator.invoicedRevenue?.toString() || '0',
        taxableIncome: calculator.taxableIncome?.toString() || '0',
        actualTax: calculator.actualTax?.toString() || '0',
        riskPercentage: calculator.riskPercentage?.toString() || '0',
        // 添加更多需要的字段
      }
    ];
    
    // 确保我们有一个有效的模板结构
    let pdfTemplate: Template;
    
    // 创建一个保证类型安全的模板对象
    if (selectedTemplate.baseTemplate || selectedTemplate.schemas) {
      pdfTemplate = {
        basePdf: selectedTemplate.baseTemplate instanceof Uint8Array ? 
          selectedTemplate.baseTemplate : 
          new Uint8Array(),
        schemas: Array.isArray(selectedTemplate.schemas) ? 
          selectedTemplate.schemas : 
          [[{}]] // 确保至少有一个空对象的嵌套数组
      };
    } else {
      // 如果没有模板或架构，创建一个简单的空白模板
      pdfTemplate = {
        basePdf: new Uint8Array(),
        schemas: [[{}]]
      };
    }
    
    // 使用PDFME生成PDF
    console.log("Generating PDF with template:", pdfTemplate);
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
