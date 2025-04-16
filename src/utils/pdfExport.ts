
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import taxInfoData from '@/constants/taxInfoData';

export const exportToPDF = async (calculator: any) => {
  try {
    // Create a new PDF document with font support for Chinese characters
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      putOnlyUsedFonts: true,
    });
    
    // Add a font that supports Chinese characters
    pdf.addFont('https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js', 'NotoSansSC', 'normal');
    pdf.setFont('NotoSansSC');
    
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 10;

    // Get the calculator content
    const content = document.querySelector('#calculator-content');
    if (!content) return;

    // Convert the content to canvas with higher quality settings
    const canvas = await html2canvas(content as HTMLElement, {
      scale: 2, // Higher scale for better quality
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      allowTaint: true,
      foreignObjectRendering: true, // Try using foreignObjectRendering for better text handling
    });

    // Add the content image to PDF
    const imgData = canvas.toDataURL('image/png');
    const imgProps = pdf.getImageProperties(imgData);
    const imgWidth = pageWidth - (2 * margin);
    const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

    // Add image to PDF (first page)
    pdf.addImage(imgData, 'PNG', margin, margin, imgWidth, imgHeight);

    // Calculate if we need to add a new page
    let currentY = imgHeight + margin + 10;
    if (currentY > pageHeight - margin) {
      pdf.addPage();
      currentY = margin;
    }

    // Add a section header for annotations
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text('信息说明:', margin, currentY);
    currentY += 8;
    
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);
    
    // Add explanations for each tax info item
    Object.entries(taxInfoData).forEach(([key, info]) => {
      if (calculator[key]) {
        // Check if we need a new page
        if (currentY > pageHeight - 30) {
          pdf.addPage();
          currentY = margin;
        }
        
        // Add title
        pdf.setFont('helvetica', 'bold');
        pdf.text(info.title, margin, currentY);
        currentY += 5;
        
        // Add description
        pdf.setFont('helvetica', 'normal');
        const descriptionText = pdf.splitTextToSize(info.description, pageWidth - (2 * margin));
        pdf.text(descriptionText, margin, currentY);
        currentY += 5 * descriptionText.length;
        
        // Add analysis
        const analysisText = pdf.splitTextToSize(info.analysis, pageWidth - (2 * margin));
        pdf.text(analysisText, margin, currentY);
        currentY += 5 * analysisText.length;
        
        // Add risk information
        pdf.setFont('helvetica', 'italic');
        const riskText = pdf.splitTextToSize(`风险提示: ${info.risk}`, pageWidth - (2 * margin));
        pdf.text(riskText, margin, currentY);
        currentY += 5 * riskText.length + 10; // Extra spacing after risk text
      }
    });

    // Save the PDF with proper encoding in the filename
    const filename = `${calculator.companyName || '税务计算'}_${new Date().toLocaleDateString('zh-CN')}.pdf`;
    pdf.save(filename);
  } catch (error) {
    console.error('PDF export failed:', error);
  }
};
