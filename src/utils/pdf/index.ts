
import { generate } from '@pdfme/generator';
import { Template } from '@pdfme/common';
import { DEFAULT_TEMPLATES } from '@/constants/pdfTemplates';
import { PdfTemplate } from '@/types/pdfTemplates';

/**
 * 创建一个基础的有效schema结构
 */
const createBaseSchema = (): any[] => {
  return [{
    emptyField: {
      type: 'text',
      position: { x: 0, y: 0 },
      width: 0,
      height: 0
    }
  }];
};

/**
 * 从PDF模板中提取schema并处理
 */
const extractSchemas = (template: PdfTemplate): any[][] => {
  // 先创建一个默认有效的schema
  const defaultSchema: any[][] = [createBaseSchema()];
  
  try {
    // 检查模板是否有有效的schemas
    if (!template.schemas) {
      console.log("No schemas found in template, using default");
      return defaultSchema;
    }
    
    // 确保schemas是数组
    if (!Array.isArray(template.schemas)) {
      console.log("Template schemas is not an array, using default");
      return defaultSchema;
    }
    
    // 确保它是一个二维数组
    if (template.schemas.length === 0 || !Array.isArray(template.schemas[0])) {
      console.log("Invalid schema format (not 2D array), using default");
      return defaultSchema;
    }
    
    // 创建深拷贝以避免引用问题
    const schemasCopy: any[][] = JSON.parse(JSON.stringify(template.schemas));
    console.log("Using template schemas, count:", schemasCopy.length);
    return schemasCopy;
  } catch (error) {
    console.error("Schema processing error:", error);
    return defaultSchema;
  }
};

/**
 * 创建适用于PDFME生成器的模板
 */
const createPdfMeTemplate = (template: PdfTemplate): Template => {
  // 处理基础PDF
  let basePdf = new Uint8Array();
  if (template.baseTemplate instanceof ArrayBuffer) {
    basePdf = new Uint8Array(template.baseTemplate);
  } else if (template.baseTemplate instanceof Uint8Array) {
    basePdf = template.baseTemplate;
  }
  
  // 从模板中提取并处理schemas
  const schemas = extractSchemas(template);
  
  // 创建符合PDFME要求的模板对象
  return {
    basePdf,
    schemas
  };
};

/**
 * 使用PDFME生成器导出计算器数据为PDF
 */
export const exportToPDF = async (calculator: any, template?: PdfTemplate) => {
  try {
    console.log("Starting PDF export with PDFME");
    
    // 使用提供的模板或默认模板
    const selectedTemplate = template || DEFAULT_TEMPLATES[0];
    
    // 准备输入数据
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
    
    // 创建PDFME所需的模板对象
    const pdfMeTemplate = createPdfMeTemplate(selectedTemplate);
    
    // 记录调试信息
    console.log("PDF template prepared:", {
      hasBasePdf: pdfMeTemplate.basePdf instanceof Uint8Array,
      schemasCount: pdfMeTemplate.schemas.length,
      firstSchemaFields: pdfMeTemplate.schemas[0] ? Object.keys(pdfMeTemplate.schemas[0][0] || {}).length : 0
    });
    
    // 使用PDFME生成PDF
    console.log("Generating PDF with PDFME...");
    const pdf = await generate({
      template: pdfMeTemplate,
      inputs: inputs,
    });
    
    // 创建并下载PDF文件
    const blob = new Blob([pdf], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${calculator.companyName || '税务计算'}_${new Date().toISOString().slice(0, 10)}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    console.log("PDF generated and downloaded successfully");
    return true;
  } catch (error) {
    console.error('PDF generation error:', error);
    throw error;
  }
};
