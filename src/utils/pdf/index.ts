
import { generate } from '@pdfme/generator';
import { Template } from '@pdfme/common';
import { DEFAULT_TEMPLATES } from '@/constants/pdfTemplates';
import { PdfTemplate } from '@/types/pdfTemplates';

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
    
    // Create a PDFME template object with proper type definition
    const pdfTemplate: Template = {
      basePdf: selectedTemplate.baseTemplate instanceof Uint8Array 
               ? selectedTemplate.baseTemplate 
               : new Uint8Array(),
      schemas: createMinimalSchema() // Start with a valid default schema
    };
    
    // Safely handle schemas assignment
    if (selectedTemplate.schemas && Array.isArray(selectedTemplate.schemas)) {
      if (selectedTemplate.schemas.length > 0 && Array.isArray(selectedTemplate.schemas[0])) {
        try {
          // Deep copy the schemas to avoid reference issues
          const schemasCopy: any[][] = JSON.parse(JSON.stringify(selectedTemplate.schemas));
          pdfTemplate.schemas = schemasCopy;
        } catch (err) {
          console.error("Error parsing schemas, using default schema:", err);
        }
      }
    }
    
    // Log template information for debugging
    console.log("Template prepared:", {
      hasSchemasArray: Array.isArray(pdfTemplate.schemas),
      schemasLength: Array.isArray(pdfTemplate.schemas) ? pdfTemplate.schemas.length : 0,
      hasInnerArray: Array.isArray(pdfTemplate.schemas) && 
                    pdfTemplate.schemas.length > 0 && 
                    Array.isArray(pdfTemplate.schemas[0])
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
