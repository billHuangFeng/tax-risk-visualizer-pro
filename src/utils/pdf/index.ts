
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { createPdfTemplate } from './templateService';

export const exportToPDF = async (calculatorData: any): Promise<boolean> => {
  try {
    console.log("Starting PDF export process", calculatorData);
    
    // 创建临时容器用于渲染PDF内容
    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '-9999px';
    tempContainer.style.width = '210mm';
    tempContainer.style.backgroundColor = 'white';
    tempContainer.style.padding = '40px';
    tempContainer.style.fontFamily = 'SimSun, serif';
    
    // 创建整个PDF内容结构
    tempContainer.innerHTML = createPdfTemplate(calculatorData);
    
    document.body.appendChild(tempContainer);
    
    // 等待字体和图像加载
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // 创建canvas
    const canvas = await html2canvas(tempContainer, {
      scale: 2,
      useCORS: true,
      logging: true,
      backgroundColor: '#ffffff'
    });
    
    document.body.removeChild(tempContainer);
    
    // 创建PDF文档 (A4纸张尺寸: 210mm x 297mm)
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const imgWidth = pageWidth - 20;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    pdf.addImage(
      canvas.toDataURL('image/jpeg', 1.0),
      'JPEG',
      10,
      10,
      imgWidth,
      imgHeight
    );
    
    // 使用公司名称或默认名称保存PDF
    const companyName = calculatorData.companyName || '税务计算';
    const date = new Date().toISOString().slice(0, 10);
    pdf.save(`${companyName}_税务计算报告_${date}.pdf`);
    
    console.log("PDF generated successfully");
    return true;
  } catch (error) {
    console.error("PDF export error:", error);
    throw error;
  }
};
