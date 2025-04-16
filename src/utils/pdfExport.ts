
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

    // Convert the content to canvas
    const canvas = await html2canvas(content, {
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

    // Add annotations for info icons
    let annotationY = margin;
    Object.entries(taxInfoData).forEach(([key, info]) => {
      if (calculator[key]) {
        pdf.addAnnotation({
          type: 'text',
          title: info.title,
          contents: info.content,
          bounds: {
            x: pageWidth - 25,
            y: annotationY,
            w: 20,
            h: 20
          },
          open: false
        });
        annotationY += 10;
      }
    });

    // Save the PDF
    pdf.save(`${calculator.companyName || '税务计算'}_${new Date().toLocaleDateString('zh-CN')}.pdf`);
  } catch (error) {
    console.error('PDF export failed:', error);
  }
};
