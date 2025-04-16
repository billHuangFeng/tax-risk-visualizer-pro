
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
    
    // Add font support for Chinese characters
    // Using a standard font that supports Chinese characters
    pdf.addFont('https://cdn.jsdelivr.net/npm/noto-sans-sc@2021.3.29/NotoSansSC-Regular.otf', 'NotoSansSC', 'normal');
    pdf.setFont('NotoSansSC');
    
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
    
    // Restore original styles
    (content as HTMLElement).style.cssText = originalStyle;

    // Calculate dimensions to fit on A4 page
    const imgWidth = pageWidth - (2 * margin);
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    // Split the content across multiple pages if needed
    let remainingHeight = canvas.height;
    let currentY = 0;
    let pdfY = margin;
    let pageNumber = 1;
    
    while (remainingHeight > 0) {
      // Calculate how much of the canvas to take for this page
      const canvasChunkHeight = Math.min(
        remainingHeight,
        (canvas.width * (pageHeight - 2 * margin)) / imgWidth
      );
      
      // Add this chunk to the PDF
      if (pageNumber > 1) {
        pdf.addPage();
        pdfY = margin;
      }
      
      pdf.addImage(
        canvas,
        'PNG',
        margin,
        pdfY,
        imgWidth,
        (canvasChunkHeight * imgWidth) / canvas.width,
        '',
        'FAST',
        0,
        currentY,
        canvas.width,
        canvasChunkHeight
      );
      
      // Update for next chunk
      remainingHeight -= canvasChunkHeight;
      currentY += canvasChunkHeight;
      pageNumber++;
    }
    
    // Add a new page for annotations
    pdf.addPage();

    // Add a section header for annotations
    pdf.setFont('NotoSansSC', 'normal');
    pdf.setFontSize(12);
    let currentTextY = margin;
    pdf.text('信息说明:', margin, currentTextY);
    currentTextY += 8;
    
    pdf.setFontSize(10);
    
    // Add explanations for each tax info item
    Object.entries(taxInfoData).forEach(([key, info]) => {
      if (calculator[key]) {
        // Check if we need a new page
        if (currentTextY > pageHeight - margin) {
          pdf.addPage();
          currentTextY = margin;
        }
        
        // Add title (bold would be ideal but not all fonts support it)
        pdf.setFontSize(11);
        pdf.text(info.title, margin, currentTextY);
        currentTextY += 5;
        
        // Add description
        pdf.setFontSize(9);
        const descriptionText = pdf.splitTextToSize(info.description, pageWidth - (2 * margin));
        pdf.text(descriptionText, margin, currentTextY);
        currentTextY += 5 * descriptionText.length;
        
        // Add analysis
        const analysisText = pdf.splitTextToSize(info.analysis, pageWidth - (2 * margin));
        pdf.text(analysisText, margin, currentTextY);
        currentTextY += 5 * analysisText.length;
        
        // Add risk information
        const riskText = pdf.splitTextToSize(`风险提示: ${info.risk}`, pageWidth - (2 * margin));
        pdf.text(riskText, margin, currentTextY);
        currentTextY += 5 * riskText.length + 10; // Extra spacing after risk text
      }
    });

    // Save the PDF with proper encoding in the filename
    const filename = encodeURIComponent(`${calculator.companyName || '税务计算'}_${new Date().toLocaleDateString('zh-CN')}.pdf`);
    pdf.save(filename);
    
    return true;
  } catch (error) {
    console.error('PDF export failed:', error);
    throw error;
  }
};
