
import { generate } from '@pdfme/generator';
import { Template } from '@pdfme/common';
import { DEFAULT_TEMPLATES } from '@/constants/pdfTemplates';
import { PdfTemplate } from '@/types/pdfTemplates';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

/**
 * Creates a basic valid schema structure for PDF fields
 */
const createBaseSchema = () => {
  return {
    name: 'emptyField',
    type: 'text',
    position: { x: 0, y: 0 },
    width: 0,
    height: 0
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
 * Generate PDF with html2canvas and jsPDF as a fallback method
 */
const generatePdfWithHtml2Canvas = async (calculator: any) => {
  try {
    console.log("Attempting to generate PDF with html2canvas fallback method");
    
    const content = document.getElementById('calculator-content');
    if (!content) {
      throw new Error("Calculator content element not found");
    }
    
    // Apply PDF-specific styling
    content.classList.add('for-pdf-export');
    
    // Create a canvas from the content
    const canvas = await html2canvas(content, {
      scale: 2,
      useCORS: true,
      logging: true,
      backgroundColor: '#ffffff'
    });
    
    // Create a PDF document
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    
    // Calculate dimensions
    const imgWidth = pageWidth - 20;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    // Add the image to the PDF
    pdf.addImage(
      canvas.toDataURL('image/jpeg', 0.95),
      'JPEG',
      10,
      10,
      imgWidth,
      imgHeight
    );
    
    // Save the PDF
    pdf.save(`${calculator.companyName || '税务计算'}_${new Date().toISOString().slice(0, 10)}.pdf`);
    
    // Clean up
    content.classList.remove('for-pdf-export');
    
    console.log("PDF generated with html2canvas successfully");
    return true;
  } catch (error) {
    console.error("Error generating PDF with html2canvas:", error);
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

    // Create properly formatted schemas
    const properSchemas = [
      [
        {
          name: 'companyName',
          type: 'text',
          position: { x: 50, y: 50 },
          width: 100,
          height: 10,
        },
        {
          name: 'totalRevenue',
          type: 'text',
          position: { x: 50, y: 70 },
          width: 100,
          height: 10,
        },
        {
          name: 'invoicedRevenue',
          type: 'text',
          position: { x: 50, y: 90 },
          width: 100,
          height: 10,
        },
        {
          name: 'taxableIncome',
          type: 'text',
          position: { x: 50, y: 110 },
          width: 100,
          height: 10,
        },
        {
          name: 'actualTax',
          type: 'text',
          position: { x: 50, y: 130 },
          width: 100,
          height: 10,
        },
        {
          name: 'riskPercentage',
          type: 'text',
          position: { x: 50, y: 150 },
          width: 100, 
          height: 10,
        }
      ]
    ];
    
    // Create the template object with proper typing for PDFME
    const pdfTemplate = {
      basePdf,
      schemas: properSchemas
    } as Template;
    
    console.log("PDF template prepared:", {
      hasBasePdf: pdfTemplate.basePdf instanceof Uint8Array,
      schemasCount: Array.isArray(pdfTemplate.schemas) ? pdfTemplate.schemas.length : 0
    });
    
    // Generate PDF with the template
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
      // Fallback to html2canvas method
      console.log("PDFME generation failed, falling back to html2canvas method");
      return await generatePdfWithHtml2Canvas(calculator);
    } catch (fallbackError) {
      console.error("Even fallback PDF generation failed:", fallbackError);
      throw new Error("无法生成PDF，请稍后再试");
    }
  }
};
