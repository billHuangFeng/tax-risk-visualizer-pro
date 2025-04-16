
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
        companyName: calculator.companyName || '税务计算',
        totalRevenue: calculator.totalRevenue?.toString() || '0',
        invoicedRevenue: calculator.invoicedRevenue?.toString() || '0',
        taxableIncome: calculator.taxableIncome?.toString() || '0',
        actualTax: calculator.actualTax?.toString() || '0',
        riskPercentage: calculator.riskPercentage?.toString() || '0',
      }
    ];
    
    console.log("Preparing template for PDF generation");
    
    // 手动创建符合PDFME要求的模板对象
    // 确保严格按照PDFME的Template类型创建
    const pdfTemplate: Template = {
      basePdf: selectedTemplate.baseTemplate instanceof Uint8Array 
               ? selectedTemplate.baseTemplate 
               : new Uint8Array(),
      schemas: []
    };
    
    // 安全地复制schemas
    if (selectedTemplate.schemas && Array.isArray(selectedTemplate.schemas)) {
      // 确保schemas是一个二维数组
      pdfTemplate.schemas = JSON.parse(JSON.stringify(selectedTemplate.schemas));
    } else {
      // 如果没有有效的schemas，创建一个最小化的符合要求的结构
      pdfTemplate.schemas = [[{
        // 创建一个空的符合要求的schema
        emptyField: {
          type: 'text',
          position: { x: 0, y: 0 },
          width: 0,
          height: 0
        }
      }]];
    }
    
    console.log("Template prepared:", {
      hasSchemasArray: Array.isArray(pdfTemplate.schemas),
      schemasLength: pdfTemplate.schemas.length,
      innerArrayLength: pdfTemplate.schemas[0]?.length || 0
    });
    
    // 使用PDFME生成PDF
    console.log("Generating PDF...");
    const pdf = await generate({
      template: pdfTemplate as Template, // 使用类型断言确保编译器接受
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
    
    console.log("PDF generated successfully");
    return true;
  } catch (error) {
    console.error('PDFME PDF generation error:', error);
    throw error;
  }
};
