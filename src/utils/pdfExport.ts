
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import taxInfoData from '@/constants/taxInfoData';

export const exportToPDF = async (calculator: any) => {
  try {
    // Create a new PDF document
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 10;

    // Get the calculator content
    const content = document.querySelector('#calculator-content');
    if (!content) return;

    // Convert the content to canvas - add proper type assertion for HTMLElement
    const canvas = await html2canvas(content as HTMLElement, {
      scale: 2,
      useCORS: true,
      logging: false,
    });

    // Add the content image to PDF
    const imgData = canvas.toDataURL('image/png');
    const imgProps = pdf.getImageProperties(imgData);
    const imgWidth = pageWidth - (2 * margin);
    const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', margin, margin, imgWidth, imgHeight);

    // Add text annotations for info icons - using standard jsPDF text API instead of addAnnotation
    let textY = imgHeight + margin + 10;
    
    // Add a section header for annotations
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text('信息说明:', margin, textY);
    textY += 8;
    
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);
    
    Object.entries(taxInfoData).forEach(([key, info]) => {
      if (calculator[key]) {
        // Add title and description instead of using unavailable addAnnotation method
        pdf.setFont('helvetica', 'bold');
        pdf.text(info.title, margin, textY);
        pdf.setFont('helvetica', 'normal');
        textY += 5;
        
        // Using analysis as content - wrapping text to fit page width
        const splitText = pdf.splitTextToSize(info.analysis, pageWidth - (2 * margin));
        pdf.text(splitText, margin, textY);
        textY += 7 * splitText.length; // Add appropriate spacing based on number of lines
        
        // Add risk information
        pdf.setFont('helvetica', 'italic');
        const splitRiskText = pdf.splitTextToSize(`风险提示: ${info.risk}`, pageWidth - (2 * margin));
        pdf.text(splitRiskText, margin, textY);
        textY += 7 * splitRiskText.length + 5; // Extra spacing after risk text
        
        // Check if we need a new page
        if (textY > pageHeight - margin) {
          pdf.addPage();
          textY = margin + 10;
        }
      }
    });

    // Save the PDF
    pdf.save(`${calculator.companyName || '税务计算'}_${new Date().toLocaleDateString('zh-CN')}.pdf`);
  } catch (error) {
    console.error('PDF export failed:', error);
  }
};
