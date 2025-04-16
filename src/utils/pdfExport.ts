
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import taxInfoData from '@/constants/taxInfoData';

export const exportToPDF = async (calculator: any) => {
  try {
    // Create a new PDF document
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });
    
    // Using standard built-in fonts instead of trying to load external fonts
    // This approach is more reliable
    
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 10;

    // Get the calculator content
    const content = document.querySelector('#calculator-content');
    if (!content) {
      throw new Error('计算器内容未找到');
    }

    // Temporarily set styles to ensure full content is visible
    const originalStyle = (content as HTMLElement).style.cssText;
    (content as HTMLElement).style.overflow = 'visible';
    (content as HTMLElement).style.height = 'auto';
    (content as HTMLElement).style.maxHeight = 'none';
    
    // Convert the content to canvas with higher quality settings
    console.log("Starting HTML to canvas conversion");
    const canvas = await html2canvas(content as HTMLElement, {
      scale: 2, // Higher scale for better quality
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      allowTaint: true,
      windowWidth: document.documentElement.offsetWidth,
      windowHeight: document.documentElement.offsetHeight,
      height: (content as HTMLElement).scrollHeight,
      width: (content as HTMLElement).scrollWidth,
      onclone: (document, element) => {
        // Make all elements visible in the cloned document
        const allElements = element.querySelectorAll('*');
        allElements.forEach((el) => {
          if (el instanceof HTMLElement) {
            el.style.overflow = 'visible';
            el.style.height = 'auto';
            el.style.maxHeight = 'none';
          }
        });
        return element;
      }
    });
    console.log("Canvas created successfully", canvas.width, canvas.height);
    
    // Restore original styles
    (content as HTMLElement).style.cssText = originalStyle;

    // Calculate dimensions to fit on A4 page
    const imgWidth = pageWidth - (2 * margin);
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    // Add the image to the PDF (simplified parameters)
    pdf.addImage(
      canvas.toDataURL('image/png'),
      'PNG',
      margin,
      margin,
      imgWidth,
      imgHeight
    );
    
    // Save the PDF with proper encoding in the filename
    const filename = encodeURIComponent(`${calculator.companyName || '税务计算'}_${new Date().toLocaleDateString('zh-CN')}.pdf`);
    pdf.save(filename);
    
    return true;
  } catch (error) {
    console.error('PDF export failed:', error);
    throw error;
  }
};
