
import { generate } from '@pdfme/generator';
import { Template } from '@pdfme/common';
import { DEFAULT_TEMPLATES } from '@/constants/pdfTemplates';
import { PdfTemplate } from '@/types/pdfTemplates';

/**
 * Creates a basic valid schema structure for PDF fields
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
 * Safely extracts and validates schemas from a PDF template
 * Ensures the output matches PDFME's required structure
 */
const extractSchemas = (template: PdfTemplate): any[][] => {
  // Default valid schema to use as fallback
  const defaultSchema: any[][] = [createBaseSchema()];
  
  try {
    // Verify the template has schemas
    if (!template.schemas || !Array.isArray(template.schemas) || template.schemas.length === 0) {
      console.log("No valid schemas found in template, using default");
      return defaultSchema;
    }
    
    // Create a properly typed array for schemas
    const validSchemas: any[][] = [];
    
    // Process each schema page
    for (let i = 0; i < template.schemas.length; i++) {
      const pageSchema = template.schemas[i];
      
      // Verify each page is an array
      if (Array.isArray(pageSchema) && pageSchema.length > 0) {
        const typedPageSchema: any[] = [];
        
        // Convert each schema object to proper type
        for (let j = 0; j < pageSchema.length; j++) {
          if (typeof pageSchema[j] === 'object' && pageSchema[j] !== null) {
            typedPageSchema.push(pageSchema[j] as any);
          }
        }
        
        if (typedPageSchema.length > 0) {
          validSchemas.push(typedPageSchema);
        } else {
          validSchemas.push(createBaseSchema());
        }
      } else {
        validSchemas.push(createBaseSchema());
      }
    }
    
    if (validSchemas.length === 0) {
      console.log("No valid schemas found after processing, using default");
      return defaultSchema;
    }
    
    return validSchemas;
  } catch (error) {
    console.error("Error processing schemas:", error);
    return defaultSchema;
  }
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
    
    // Extract and validate schemas from the template
    const validatedSchemas = extractSchemas(selectedTemplate);
    
    // Create properly structured template compatible with PDFME
    // Use type assertions to bypass TypeScript's limitations
    const pdfMeTemplate = {
      basePdf: basePdf,
      schemas: validatedSchemas
    } as unknown as Template;
    
    // Log template info for debugging
    console.log("PDF template prepared:", {
      hasBasePdf: pdfMeTemplate.basePdf instanceof Uint8Array,
      schemasCount: Array.isArray(pdfMeTemplate.schemas) ? pdfMeTemplate.schemas.length : 0,
      firstSchemaFields: Array.isArray(pdfMeTemplate.schemas) && 
                        Array.isArray(pdfMeTemplate.schemas[0]) && 
                        pdfMeTemplate.schemas[0][0] ? 
                        Object.keys(pdfMeTemplate.schemas[0][0]).length : 0
    });
    
    // Generate PDF with validated template
    console.log("Generating PDF with PDFME...");
    const pdf = await generate({
      template: pdfMeTemplate,
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
        schemas: [[createBaseSchema()[0]]]
      } as unknown as Template;
      
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
