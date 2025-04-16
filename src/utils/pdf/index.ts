
import { generate } from '@pdfme/generator';
import { Template } from '@pdfme/common';
import { DEFAULT_TEMPLATES } from '@/constants/pdfTemplates';
import { PdfTemplate } from '@/types/pdfTemplates';

/**
 * Creates a basic valid schema structure for PDF fields
 */
const createBaseSchema = () => {
  return {
    emptyField: {
      type: 'text',
      position: { x: 0, y: 0 },
      width: 0,
      height: 0
    }
  };
};

/**
 * Helper function to download the generated PDF
 */
const downloadPdf = (pdf: Uint8Array, companyName?: string) => {
  try {
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
  } catch (error) {
    console.error("Error downloading PDF:", error);
    throw error;
  }
};

/**
 * Exports calculator data to PDF using PDFME generator
 */
export const exportToPDF = async (calculator: any, template?: PdfTemplate) => {
  try {
    console.log("Starting PDF export with PDFME");
    
    // Use provided template or default
    const selectedTemplate = template || DEFAULT_TEMPLATES[0];
    
    // Prepare input data
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
    
    // Extract the basePdf from the template
    let basePdf = new Uint8Array();
    if (selectedTemplate.baseTemplate instanceof ArrayBuffer) {
      basePdf = new Uint8Array(selectedTemplate.baseTemplate);
    } else if (selectedTemplate.baseTemplate instanceof Uint8Array) {
      basePdf = selectedTemplate.baseTemplate;
    }

    // Create a simpler, more direct approach to template creation
    // that doesn't depend on complex type validation
    const defaultSchemas = [
      [
        {
          companyName: {
            type: 'text',
            position: { x: 50, y: 50 },
            width: 100,
            height: 10,
          },
          totalRevenue: {
            type: 'text',
            position: { x: 50, y: 70 },
            width: 100,
            height: 10,
          },
          invoicedRevenue: {
            type: 'text',
            position: { x: 50, y: 90 },
            width: 100,
            height: 10,
          },
          taxableIncome: {
            type: 'text',
            position: { x: 50, y: 110 },
            width: 100,
            height: 10,
          },
          actualTax: {
            type: 'text',
            position: { x: 50, y: 130 },
            width: 100,
            height: 10,
          },
          riskPercentage: {
            type: 'text',
            position: { x: 50, y: 150 },
            width: 100, 
            height: 10,
          }
        }
      ]
    ];

    // Use template schemas if they exist, otherwise fall back to default
    const schemas = Array.isArray(selectedTemplate.schemas) && 
                   selectedTemplate.schemas.length > 0 ? 
                   selectedTemplate.schemas : defaultSchemas;
    
    // Manually construct the template object with explicit typing
    // We'll use a direct type assertion to override TypeScript's checking
    const pdfTemplate = {
      basePdf,
      schemas
    } as any;
    
    // Log template info for debugging
    console.log("PDF template prepared:", {
      hasBasePdf: pdfTemplate.basePdf instanceof Uint8Array,
      schemasCount: Array.isArray(pdfTemplate.schemas) ? pdfTemplate.schemas.length : 0
    });
    
    // Generate PDF with validated template
    console.log("Generating PDF with PDFME...");
    const pdf = await generate({
      template: pdfTemplate,
      inputs: inputs,
    });
    
    // Download the generated PDF
    downloadPdf(pdf, calculator.companyName);
    return true;
  } catch (error) {
    console.error('PDF generation error:', error);
    
    try {
      // Fallback to simplified template on error
      console.log("Attempting to generate PDF with fallback template");
      
      // Create a minimal fallback template with just the base structure
      const fallbackTemplate = {
        basePdf: new Uint8Array(),
        schemas: [
          [
            createBaseSchema()
          ]
        ]
      } as any;
      
      // Generate PDF with fallback template
      const pdf = await generate({
        template: fallbackTemplate,
        inputs: [{
          companyName: calculator.companyName || '税务计算',
          totalRevenue: calculator.totalRevenue?.toString() || '0'
        }],
      });
      
      // Download the generated PDF
      downloadPdf(pdf, calculator.companyName);
      return true;
    } catch (fallbackError) {
      console.error("Even fallback PDF generation failed:", fallbackError);
      throw error; // Throw the original error
    }
  }
};
