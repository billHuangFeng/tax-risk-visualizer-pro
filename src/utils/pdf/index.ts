
import { generate } from '@pdfme/generator';
import { Template } from '@pdfme/common';
import { DEFAULT_TEMPLATES } from '@/constants/pdfTemplates';
import { PdfTemplate } from '@/types/pdfTemplates';

/**
 * Validates if the provided value is a properly structured schemas array
 */
const isValidSchemas = (value: any): boolean => {
  return Array.isArray(value) && 
         value.length > 0 && 
         Array.isArray(value[0]);
};

/**
 * Creates a minimal valid schema structure for PDFME
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
 * Exports calculator data to PDF using PDFME generator
 */
export const exportToPDF = async (calculator: any, template?: PdfTemplate) => {
  try {
    console.log("Starting PDF export with PDFME");
    
    // Get template or use default
    const selectedTemplate = template || DEFAULT_TEMPLATES[0];
    
    // Prepare PDF data
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
    
    // Create a PDFME template object
    const pdfTemplate: Template = {
      basePdf: selectedTemplate.baseTemplate instanceof Uint8Array 
               ? selectedTemplate.baseTemplate 
               : new Uint8Array(),
      schemas: []
    };
    
    // Safely handle schemas assignment
    let schemasToUse: any[][] = createMinimalSchema();
    
    if (selectedTemplate.schemas && isValidSchemas(selectedTemplate.schemas)) {
      try {
        // Deep copy the schemas to avoid reference issues
        schemasToUse = JSON.parse(JSON.stringify(selectedTemplate.schemas));
      } catch (err) {
        console.error("Error parsing schemas, using minimal schema:", err);
      }
    }
    
    // Assign the schemas to the template
    pdfTemplate.schemas = schemasToUse;
    
    console.log("Template prepared:", {
      hasSchemasArray: Array.isArray(pdfTemplate.schemas),
      schemasLength: pdfTemplate.schemas.length,
      firstSchemaIsArray: Array.isArray(pdfTemplate.schemas[0]),
      innerArrayLength: Array.isArray(pdfTemplate.schemas[0]) ? pdfTemplate.schemas[0].length : 0
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
