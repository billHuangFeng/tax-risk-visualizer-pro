
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { enhanceLayout } from './enhancer';

/**
 * Export calculator data to PDF
 */
export const exportToPDF = async (calculatorData: any): Promise<boolean> => {
  try {
    console.log("Starting PDF export process", calculatorData);
    
    // Get calculator content
    const content = document.getElementById('calculator-content');
    if (!content) {
      throw new Error("Calculator content element not found");
    }
    
    // Clone the content to avoid modifying the original DOM
    const contentClone = content.cloneNode(true) as HTMLElement;
    
    // Add PDF export styling class
    contentClone.classList.add('for-pdf-export');
    
    // Apply enhanced styling for PDF output
    enhanceLayout(contentClone);
    
    // Replace info icons with numbered annotations
    let annotationIndex = 1;
    const annotations: string[] = [];
    const infoIcons = contentClone.querySelectorAll('.text-tax-blue');
    
    infoIcons.forEach((icon) => {
      if (icon instanceof HTMLElement) {
        // Store tooltip content
        const tooltipContent = icon.getAttribute('title') || 
                             icon.querySelector('.tooltip-content')?.textContent || 
                             '';
        if (tooltipContent) {
          annotations.push(`注${annotationIndex}：${tooltipContent}`);
          
          // Replace icon with numbered annotation
          const span = document.createElement('span');
          span.textContent = `注${annotationIndex}`;
          span.style.fontSize = '12px';
          span.style.color = '#000';
          icon.parentNode?.replaceChild(span, icon);
          
          annotationIndex++;
        }
      }
    });
    
    // Add temporary container to document body
    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '-9999px';
    tempContainer.style.width = '210mm'; // A4 width
    tempContainer.appendChild(contentClone);
    document.body.appendChild(tempContainer);
    
    // Create canvas
    const canvas = await html2canvas(contentClone, {
      scale: 2,
      useCORS: true,
      logging: true,
      backgroundColor: '#ffffff'
    });
    
    // Remove temp container
    document.body.removeChild(tempContainer);
    
    // Create PDF document (A4 size)
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    
    // Calculate image dimensions for A4
    const imgWidth = pageWidth - 20; // 10mm margins on each side
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    // Add calculator content
    pdf.addImage(
      canvas.toDataURL('image/jpeg', 0.95),
      'JPEG',
      10, // left margin
      10, // top margin
      imgWidth,
      imgHeight
    );
    
    // Add annotations page if there are any annotations
    if (annotations.length > 0) {
      pdf.addPage();
      
      pdf.setFontSize(16);
      pdf.text('备注', 10, 20);
      
      pdf.setFontSize(12);
      let y = 30;
      annotations.forEach((annotation, index) => {
        const lines = pdf.splitTextToSize(annotation, pageWidth - 20);
        pdf.text(lines, 10, y);
        y += 10 * lines.length;
        
        // Add new page if needed
        if (y > pageHeight - 20) {
          pdf.addPage();
          y = 20;
        }
      });
    }
    
    // Save PDF with company name from data or default
    pdf.save(`${calculatorData.companyName || '税务计算'}_${new Date().toISOString().slice(0, 10)}.pdf`);
    
    console.log("PDF generated successfully");
    return true;
  } catch (error) {
    console.error("PDF export error:", error);
    throw error;
  }
};
