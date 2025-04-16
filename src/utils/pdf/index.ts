
import { generate } from '@pdfme/generator';
import { Template } from '@pdfme/common';
import { DEFAULT_TEMPLATES } from '@/constants/pdfTemplates';
import { PdfTemplate } from '@/types/pdfTemplates';

/**
 * 创建一个基础的有效schema结构
 */
const createBaseSchema = (): Record<string, any>[] => {
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
 * 从PDF模板中提取schema并确保格式正确
 */
const extractSchemas = (template: PdfTemplate): Record<string, any>[][] => {
  // 默认有效的schema
  const defaultSchema: Record<string, any>[][] = [createBaseSchema()];
  
  try {
    // 检查模板是否存在schemas属性
    if (!template.schemas) {
      console.log("No schemas found in template, using default");
      return defaultSchema;
    }
    
    // 确保schemas是数组
    if (!Array.isArray(template.schemas)) {
      console.log("Template schemas is not an array, using default");
      return defaultSchema;
    }
    
    // 确保是二维数组
    if (template.schemas.length === 0) {
      console.log("Empty schemas array, using default");
      return defaultSchema;
    }
    
    // 检查每个schema页面是否是数组
    const validSchemas: Record<string, any>[][] = [];
    for (let i = 0; i < template.schemas.length; i++) {
      const pageSchema = template.schemas[i];
      if (Array.isArray(pageSchema)) {
        validSchemas.push([...pageSchema]); // 创建深拷贝
      } else {
        console.log(`Schema at page ${i} is not an array, using default for this page`);
        validSchemas.push(createBaseSchema());
      }
    }
    
    if (validSchemas.length === 0) {
      console.log("No valid schemas found, using default");
      return defaultSchema;
    }
    
    return validSchemas;
  } catch (error) {
    console.error("Error processing schemas:", error);
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
  
  // 安全地提取schema
  const schemas = extractSchemas(template);
  
  // 强制类型转换为PDFME要求的Template
  return {
    basePdf,
    schemas
  } as Template;
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
    
    // 创建PDFME模板对象
    const pdfMeTemplate = createPdfMeTemplate(selectedTemplate);
    
    // 确保生成的template对象是有效的
    if (!pdfMeTemplate.schemas || !Array.isArray(pdfMeTemplate.schemas)) {
      console.warn("Generated template has invalid schemas, creating fallback");
      // 强制类型转换并分配有效值
      const fallbackTemplate = {
        ...pdfMeTemplate,
        schemas: [createBaseSchema()]
      };
      
      // 使用create函数确保类型正确
      const pdf = await generate({
        template: fallbackTemplate as Template,
        inputs: inputs,
      });
      
      // 处理生成的PDF文件
      downloadPdf(pdf, calculator.companyName);
      return true;
    }
    
    // 记录模板信息用于调试
    console.log("PDF template prepared:", {
      hasBasePdf: pdfMeTemplate.basePdf instanceof Uint8Array,
      schemasCount: pdfMeTemplate.schemas.length,
      firstSchemaFields: pdfMeTemplate.schemas[0]?.[0] ? 
                        Object.keys(pdfMeTemplate.schemas[0][0]).length : 0
    });
    
    // 使用PDFME生成PDF
    console.log("Generating PDF with PDFME...");
    const pdf = await generate({
      template: pdfMeTemplate,
      inputs: inputs,
    });
    
    // 下载生成的PDF
    downloadPdf(pdf, calculator.companyName);
    return true;
  } catch (error) {
    console.error('PDF generation error:', error);
    throw error;
  }
};

/**
 * 辅助函数：下载生成的PDF文件
 */
const downloadPdf = (pdf: Uint8Array, companyName?: string) => {
  const blob = new Blob([pdf], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${companyName || '税务计算'}_${new Date().toISOString().slice(0, 10)}.pdf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  console.log("PDF generated and downloaded successfully");
};
