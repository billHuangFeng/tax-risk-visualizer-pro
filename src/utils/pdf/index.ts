
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { enhanceLayout } from './enhancer';
import { enhanceLayoutStructure } from './layoutStructure';

export const exportToPDF = async (calculatorData: any): Promise<boolean> => {
  try {
    console.log("Starting PDF export process", calculatorData);
    
    const content = document.getElementById('calculator-content');
    if (!content) {
      throw new Error("Calculator content element not found");
    }
    
    const contentClone = content.cloneNode(true) as HTMLElement;
    contentClone.classList.add('for-pdf-export');
    
    // 应用布局增强
    enhanceLayout(contentClone);
    enhanceLayoutStructure(contentClone);
    
    // 创建临时容器
    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '-9999px';
    tempContainer.style.width = '210mm';
    tempContainer.appendChild(contentClone);
    document.body.appendChild(tempContainer);
    
    // 创建canvas
    const canvas = await html2canvas(contentClone, {
      scale: 2,
      useCORS: true,
      logging: true,
      backgroundColor: '#ffffff'
    });
    
    document.body.removeChild(tempContainer);
    
    // 创建PDF文档
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const imgWidth = pageWidth - 20;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    pdf.addImage(
      canvas.toDataURL('image/jpeg', 0.95),
      'JPEG',
      10,
      10,
      imgWidth,
      imgHeight
    );
    
    // 使用公司名称或默认名称保存PDF
    pdf.save(`${calculatorData.companyName || '税务计算'}_${new Date().toISOString().slice(0, 10)}.pdf`);
    
    console.log("PDF generated successfully");
    return true;
  } catch (error) {
    console.error("PDF export error:", error);
    throw error;
  }
};
