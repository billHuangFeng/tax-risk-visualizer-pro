
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { createPdfTemplate } from './templateService';

export const exportToPDF = async (calculatorData: any): Promise<boolean> => {
  try {
    console.log("开始PDF导出流程", calculatorData);
    
    // 创建临时容器用于渲染PDF内容
    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '-9999px';
    tempContainer.style.top = '0';
    tempContainer.style.width = '210mm';
    tempContainer.style.backgroundColor = 'white';
    tempContainer.style.fontFamily = 'SimSun, serif';
    tempContainer.style.padding = '0';
    tempContainer.style.boxSizing = 'border-box';
    tempContainer.style.zIndex = '-1000';
    
    // 添加SimSun字体支持
    const style = document.createElement('style');
    style.textContent = `
      @font-face {
        font-family: 'SimSun';
        src: local('SimSun');
        font-weight: normal;
        font-style: normal;
      }
    `;
    document.head.appendChild(style);
    
    // 创建HTML模板
    tempContainer.innerHTML = createPdfTemplate(calculatorData);
    
    // 添加到文档中进行渲染
    document.body.appendChild(tempContainer);
    
    // 等待字体和样式加载
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // 使用html2canvas捕获内容
    const canvas = await html2canvas(tempContainer, {
      scale: 2, // 更高的比例以获得更清晰的输出
      useCORS: true,
      logging: true,
      backgroundColor: '#ffffff',
      onclone: (document, clonedElement) => {
        // 确保克隆元素可见
        clonedElement.style.visibility = 'visible';
        clonedElement.style.width = '210mm';
        clonedElement.style.height = 'auto';
        
        // 处理所有文本元素，确保它们在PDF中可见
        const textElements = clonedElement.querySelectorAll('*');
        textElements.forEach(el => {
          if (el instanceof HTMLElement) {
            el.style.fontFamily = 'SimSun, serif';
            el.style.color = '#000';
          }
        });
      }
    });
    
    // 从DOM中移除临时容器
    document.body.removeChild(tempContainer);
    document.head.removeChild(style);
    
    // 创建PDF文档 (A4纸张: 210mm x 297mm)
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    
    // 计算图像缩放以适应页面宽度，保留10mm边距
    const margin = 5;
    const imgWidth = pageWidth - 2 * margin;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    // 添加图像到PDF
    pdf.addImage(
      canvas.toDataURL('image/jpeg', 1.0),
      'JPEG',
      margin,
      margin,
      imgWidth,
      imgHeight
    );
    
    // 处理多页内容
    let heightLeft = imgHeight;
    let position = margin;
    
    // 如果内容超过一页，添加额外页面
    while (heightLeft > (pageHeight - 2 * margin)) {
      position = heightLeft - (pageHeight - 2 * margin);
      heightLeft -= (pageHeight - 2 * margin);
      
      pdf.addPage();
      pdf.addImage(
        canvas.toDataURL('image/jpeg', 1.0),
        'JPEG',
        margin,
        -position + margin,
        imgWidth,
        imgHeight
      );
    }
    
    // 使用公司名称或默认名称保存PDF
    const companyName = calculatorData.companyName || '税务计算';
    const date = new Date().toISOString().slice(0, 10);
    pdf.save(`${companyName}_税务计算报告_${date}.pdf`);
    
    console.log("PDF生成成功");
    return true;
  } catch (error) {
    console.error("PDF导出错误:", error);
    throw error;
  }
};
