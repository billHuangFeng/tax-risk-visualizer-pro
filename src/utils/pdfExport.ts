
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export const exportToPDF = async (calculator: any) => {
  try {
    // Create a new PDF document
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });
    
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 10;

    // Get the calculator content
    const content = document.querySelector('#calculator-content');
    if (!content) {
      throw new Error('计算器内容未找到');
    }

    // Calculate scale to fit content width to page
    const contentWidth = (content as HTMLElement).offsetWidth;
    const scale = (pageWidth - 2 * margin) / contentWidth;
    
    // Temporarily set styles to ensure full content is visible
    const originalStyle = (content as HTMLElement).style.cssText;
    (content as HTMLElement).style.overflow = 'visible';
    (content as HTMLElement).style.height = 'auto';
    (content as HTMLElement).style.maxHeight = 'none';
    
    // Convert the content to canvas with higher quality settings
    console.log("Starting HTML to canvas conversion");
    const canvas = await html2canvas(content as HTMLElement, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      allowTaint: true,
    });
    console.log("Canvas created successfully", canvas.width, canvas.height);
    
    // Restore original styles
    (content as HTMLElement).style.cssText = originalStyle;

    // Calculate dimensions to fit on A4 page
    const imgWidth = pageWidth - (2 * margin);
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    // Handle multi-page content
    let heightLeft = imgHeight;
    let position = margin;
    
    // Add first page
    pdf.addImage(
      canvas.toDataURL('image/png'), 
      'PNG', 
      margin, 
      position, 
      imgWidth, 
      imgHeight
    );
    
    // Add new pages if content doesn't fit on one page
    heightLeft -= pageHeight;
    
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(
        canvas.toDataURL('image/png'), 
        'PNG', 
        margin, 
        position, 
        imgWidth, 
        imgHeight
      );
      heightLeft -= pageHeight;
    }
    
    // Create a proper filename without encoding issues
    const today = new Date().toISOString().slice(0, 10);
    let filename = `税务计算_${today}`;
    
    // Add company name if available
    if (calculator.companyName && calculator.companyName.trim() !== '') {
      filename = `${calculator.companyName}_${today}`;
    }
    
    // Save with proper filename
    pdf.save(`${filename}.pdf`);
    
    return true;
  } catch (error) {
    console.error('PDF export failed:', error);
    throw error;
  }
};
