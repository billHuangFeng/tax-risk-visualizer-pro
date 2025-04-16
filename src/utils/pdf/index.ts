
import { generate } from '@pdfme/generator';
import { Template } from '@pdfme/common';
import { DEFAULT_TEMPLATES } from '@/constants/pdfTemplates';
import { PdfTemplate } from '@/types/pdfTemplates';

/**
 * 验证提供的值是否为结构良好的schemas数组
 */
const isValidSchemas = (value: any): boolean => {
  if (!Array.isArray(value)) return false;
  if (value.length === 0) return false;
  if (!Array.isArray(value[0])) return false;
  return true;
};

/**
 * 创建最小有效的schema结构给PDFME
 */
const createMinimalSchema = (): any[][] => {
  return [[{
    emptyField: {
      type: 'text',
      position: { x: 0, y: 0 },
      width: 0,
      height: 0
    }
  }]];
};

/**
 * 导出计算器数据到PDF使用PDFME生成器
 */
export const exportToPDF = async (calculator: any, template?: PdfTemplate) => {
  try {
    console.log("Starting PDF export with PDFME");
    
    // 获取模板或使用默认模板
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
    
    // 创建PDFME模板对象
    const pdfTemplate: Template = {
      basePdf: selectedTemplate.baseTemplate instanceof Uint8Array 
               ? selectedTemplate.baseTemplate 
               : new Uint8Array(),
      schemas: [] as any[][]
    };
    
    // 安全地处理schemas赋值
    let schemasToUse: any[][] = createMinimalSchema();
    
    // 检查schemas是否有效并进行安全赋值
    if (selectedTemplate.schemas && isValidSchemas(selectedTemplate.schemas)) {
      try {
        // 深拷贝schemas以避免引用问题
        schemasToUse = JSON.parse(JSON.stringify(selectedTemplate.schemas)) as any[][];
      } catch (err) {
        console.error("Error parsing schemas, using minimal schema:", err);
      }
    }
    
    // 将schemas赋值给模板
    pdfTemplate.schemas = schemasToUse;
    
    // 记录准备好的模板信息用于调试
    console.log("Template prepared:", {
      hasSchemasArray: Array.isArray(pdfTemplate.schemas),
      schemasLength: Array.isArray(pdfTemplate.schemas) ? pdfTemplate.schemas.length : 0,
      firstSchemaIsArray: Array.isArray(pdfTemplate.schemas) && pdfTemplate.schemas.length > 0 
                          ? Array.isArray(pdfTemplate.schemas[0]) : false,
      innerArrayLength: Array.isArray(pdfTemplate.schemas) && pdfTemplate.schemas.length > 0 && Array.isArray(pdfTemplate.schemas[0]) 
                        ? pdfTemplate.schemas[0].length : 0
    });
    
    // 使用PDFME生成PDF
    console.log("Generating PDF...");
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
    
    console.log("PDF generated successfully");
    return true;
  } catch (error) {
    console.error('PDFME PDF generation error:', error);
    throw error;
  }
};
