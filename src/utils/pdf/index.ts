
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
  
  // 从模板中提取并处理schemas - 确保类型安全
  const schemas: any[][] = extractSchemas(template);
  
  // 创建符合PDFME要求的模板对象 - 使用类型断言确保类型兼容性
  const pdfMeTemplate: Template = {
    basePdf,
    schemas
  };
  
  return pdfMeTemplate;
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
    
    // 确保schemas存在且格式有效 - 这将解决类型错误问题
    if (!pdfMeTemplate.schemas || !Array.isArray(pdfMeTemplate.schemas)) {
      console.warn("Invalid schemas found, using default schema");
      pdfMeTemplate.schemas = [createBaseSchema()]; 
    }
    
    // 确保每个schema页面都是数组
    for (let i = 0; i < pdfMeTemplate.schemas.length; i++) {
      if (!Array.isArray(pdfMeTemplate.schemas[i])) {
        console.warn(`Schema at index ${i} is not an array, fixing`);
        pdfMeTemplate.schemas[i] = createBaseSchema();
      }
    }
    
    // 记录调试信息 - 使用类型守卫确保安全访问
    console.log("PDF template prepared:", {
      hasBasePdf: pdfMeTemplate.basePdf instanceof Uint8Array,
      schemasCount: Array.isArray(pdfMeTemplate.schemas) ? pdfMeTemplate.schemas.length : 0,
      firstSchemaFields: Array.isArray(pdfMeTemplate.schemas) && pdfMeTemplate.schemas.length > 0 && 
                        Array.isArray(pdfMeTemplate.schemas[0]) && pdfMeTemplate.schemas[0].length > 0 ? 
                        Object.keys(pdfMeTemplate.schemas[0][0] || {}).length : 0
    });
    
    // 使用PDFME生成PDF - 避免使用类型断言，确保对象结构正确
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
