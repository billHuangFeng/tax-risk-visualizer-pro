
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export const createScreenshotPdf = async (data: any): Promise<boolean> => {
  try {
    // 获取需要截取的内容区域
    const calculatorContent = document.getElementById('calculator-content');
    if (!calculatorContent) {
      throw new Error("找不到计算器内容元素");
    }
    
    // 创建临时容器来准备PDF内容
    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '-9999px';
    tempContainer.style.top = '0';
    tempContainer.style.width = '210mm'; // A4宽度
    tempContainer.style.backgroundColor = 'white';
    tempContainer.style.fontFamily = 'SimSun, serif';
    tempContainer.style.padding = '20mm 10mm';
    tempContainer.style.boxSizing = 'border-box';
    tempContainer.style.zIndex = '-1000';
    document.body.appendChild(tempContainer);
    
    // 克隆计算器内容
    const contentClone = calculatorContent.cloneNode(true) as HTMLElement;
    tempContainer.appendChild(contentClone);
    
    // 移除不需要的元素
    const elementsToRemove = [
      // 移除说明卡片
      '.instruction-card',
      // 移除底部按钮
      'button',
      // 移除圆圈感叹号图标
      '.lucide-info',
      '.lucide-alert-circle',
      // 移除信息面板和风险提示
      '.info-panel',
      '[data-info]',
      // 移除按钮容器
      '.action-buttons',
      // 移除其他UI元素
      '.card-header'
    ];
    
    elementsToRemove.forEach(selector => {
      const elements = tempContainer.querySelectorAll(selector);
      elements.forEach(el => {
        if (el.parentNode) {
          el.parentNode.removeChild(el);
        }
      });
    });
    
    // 调整行间距
    const paragraphs = tempContainer.querySelectorAll('p, div, td, th, label, span');
    paragraphs.forEach(p => {
      if (p instanceof HTMLElement) {
        p.style.lineHeight = '1.2';
        p.style.margin = '0.2em 0';
        p.style.padding = '0.2em 0';
      }
    });
    
    // 添加标题
    const titleDiv = document.createElement('div');
    titleDiv.style.textAlign = 'center';
    titleDiv.style.marginBottom = '10mm';
    titleDiv.style.fontSize = '18px';
    titleDiv.style.fontWeight = 'bold';
    
    const companyName = data.companyName || '测试公司';
    const today = new Date().toLocaleDateString('zh-CN', {
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    });
    
    titleDiv.innerHTML = `${companyName}<br>税务计算报告 - ${today}`;
    tempContainer.insertBefore(titleDiv, tempContainer.firstChild);
    
    // 添加页码
    const footerDiv = document.createElement('div');
    footerDiv.style.position = 'fixed';
    footerDiv.style.bottom = '5mm';
    footerDiv.style.right = '10mm';
    footerDiv.style.fontSize = '9px';
    footerDiv.innerHTML = '第 _PAGE_ 页 / 共 _TOTAL_PAGES_ 页';
    tempContainer.appendChild(footerDiv);
    
    // 等待字体和样式加载
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // 使用html2canvas将DOM转换为canvas
    const canvas = await html2canvas(tempContainer, {
      scale: 2, // 更高的比例以获得更清晰的输出
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      onclone: (clonedDoc, clonedElement) => {
        // 保证所有元素在PDF中可见
        const allElements = clonedElement.querySelectorAll('*');
        allElements.forEach(el => {
          if (el instanceof HTMLElement) {
            el.style.color = '#000';
            if (el.style.display === 'none') {
              el.style.display = 'block';
            }
          }
        });
        
        // 加强表格边框
        const tables = clonedElement.querySelectorAll('table');
        tables.forEach(table => {
          table.style.borderCollapse = 'collapse';
          table.style.width = '100%';
          
          const cells = table.querySelectorAll('th, td');
          cells.forEach(cell => {
            if (cell instanceof HTMLElement) {
              cell.style.border = '1px solid #000';
              cell.style.padding = '5px';
            }
          });
        });
      }
    });
    
    // 从DOM中移除临时容器
    document.body.removeChild(tempContainer);
    
    // 创建PDF文档 (A4纸张: 210mm x 297mm)
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    
    // 计算缩放比例，确保宽度适合页面（减去左右边距）
    const margin = 5; // 5mm边距
    const contentWidth = pageWidth - 2 * margin;
    const contentHeight = (canvas.height * contentWidth) / canvas.width;
    
    // 如果内容高度小于页面高度，则居中显示
    let yPosition = margin;
    if (contentHeight < pageHeight - 2 * margin) {
      yPosition = (pageHeight - contentHeight) / 2;
    }
    
    // 添加图像到PDF
    pdf.addImage(
      canvas.toDataURL('image/jpeg', 0.95),
      'JPEG',
      margin,
      yPosition,
      contentWidth,
      contentHeight
    );
    
    // 处理多页内容
    let heightLeft = contentHeight;
    let position = 0;
    let pageCount = 1;
    
    // 如果内容超过一页，添加额外页面
    while (heightLeft > (pageHeight - 2 * margin)) {
      position = heightLeft - (pageHeight - 2 * margin);
      heightLeft -= (pageHeight - 2 * margin);
      
      // 添加新页面
      pdf.addPage();
      pageCount++;
      
      pdf.addImage(
        canvas.toDataURL('image/jpeg', 0.95),
        'JPEG',
        margin,
        -position + margin,
        contentWidth,
        contentHeight
      );
    }
    
    // 添加页码
    for (let i = 1; i <= pageCount; i++) {
      pdf.setPage(i);
      pdf.setFontSize(9);
      pdf.setTextColor(0, 0, 0);
      
      const pageText = `第 ${i} 页 / 共 ${pageCount} 页`;
      const textWidth = pdf.getStringUnitWidth(pageText) * 9 / pdf.internal.scaleFactor;
      
      pdf.text(
        pageText,
        pageWidth - margin - textWidth,
        pageHeight - margin
      );
    }
    
    // 使用公司名称或默认名称保存PDF
    const date = new Date().toISOString().slice(0, 10);
    pdf.save(`${companyName}_税务计算报告_${date}.pdf`);
    
    return true;
  } catch (error) {
    console.error("截图PDF生成错误:", error);
    throw error;
  }
};
