
import { generate } from '@pdfme/generator';
import { Template } from '@pdfme/common';
import { DEFAULT_TEMPLATES } from '@/constants/pdfTemplates';
import { PdfTemplate } from '@/types/pdfTemplates';

/**
 * Creates a base schema structure that is guaranteed to be valid
 */
const createBaseSchema = (): any[][] => {
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
 * Safely validates and processes schemas
 */
const processSchemas = (template: PdfTemplate): any[][] => {
  // Start with a valid base schema
  let finalSchemas: any[][] = createBaseSchema();
  
  try {
    // Only process if template has schemas and they appear to be valid
    if (template.schemas && 
        Array.isArray(template.schemas) && 
        template.schemas.length > 0 && 
        Array.isArray(template.schemas[0])) {
      
      // Create a deep copy to avoid reference issues
      finalSchemas = JSON.parse(JSON.stringify(template.schemas));
      
      console.log("Using template schemas:", {
        schemasCount: finalSchemas.length,
        firstSchemaLength: finalSchemas[0].length
      });
    }
  } catch (error) {
    console.error("Error processing schemas, using base schema:", error);
  }
  
  return finalSchemas;
};

/**
 * Creates a properly typed PDF template object
 */
const createPdfTemplate = (template: PdfTemplate): Template => {
  // Process the base PDF
  let basePdf: ArrayBuffer | Uint8Array = new Uint8Array();
  if (template.baseTemplate instanceof ArrayBuffer || template.baseTemplate instanceof Uint8Array) {
    basePdf = template.baseTemplate;
  }
  
  // Process schemas with our safe function
  const schemas = processSchemas(template);
  
  // Return a properly constructed Template object
  return {
    basePdf,
    schemas: schemas
  };
};

/**
 * Exports calculator data to PDF using PDFME generator
 */
export const exportToPDF = async (calculator: any, template?: PdfTemplate) => {
  try {
    console.log("Starting PDF export with PDFME");
    
    // Get template or use default
    const selectedTemplate = template || DEFAULT_TEMPLATES[0];
    
    // Prepare PDF input data
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
    
    // Create a properly typed template object
    const pdfTemplate = createPdfTemplate(selectedTemplate);
    
    // Log for debugging
    console.log("Template constructed:", {
      hasBasePdf: !!pdfTemplate.basePdf,
      hasSchemas: Array.isArray(pdfTemplate.schemas),
      schemasLength: Array.isArray(pdfTemplate.schemas) ? pdfTemplate.schemas.length : 0
    });
    
    // Generate PDF with PDFME
    console.log("Generating PDF...");
    const pdf = await generate({
      template: pdfTemplate,
      inputs: inputs,
    });
    
    // Create and download PDF
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
