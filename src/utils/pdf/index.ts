
import { generate } from '@pdfme/generator';
import { Template } from '@pdfme/common';
import { DEFAULT_TEMPLATES } from '@/constants/pdfTemplates';
import { PdfTemplate } from '@/types/pdfTemplates';

// Helper function to safely check if an object is an array with expected structure
const isValidSchemaArray = (arr: any): arr is any[][] => {
  return Array.isArray(arr) && 
         arr.length > 0 && 
         Array.isArray(arr[0]);
};

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
    
    // Create a proper PDFME template
    const pdfTemplate: Template = {
      basePdf: selectedTemplate.baseTemplate instanceof Uint8Array 
               ? selectedTemplate.baseTemplate 
               : new Uint8Array(),
      schemas: []
    };
    
    // Safely assign schemas
    if (isValidSchemaArray(selectedTemplate.schemas)) {
      // Create a deep copy to avoid reference issues
      pdfTemplate.schemas = JSON.parse(JSON.stringify(selectedTemplate.schemas));
    } else {
      // Create a minimal valid schema structure if none is provided
      pdfTemplate.schemas = [[{
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
      firstSchemaType: typeof pdfTemplate.schemas[0],
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
