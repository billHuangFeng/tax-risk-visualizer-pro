
import { generate, Template } from '@pdfme/generator';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { PdfTemplate } from '@/types/pdfTemplates';

// 使用PDFME标准类型定义
interface PdfMeInput {
  [key: string]: string;
}

/**
 * 使用PDFME库生成PDF
 */
export const generatePdfWithPdfme = async (
  calculatorData: any,
  template?: PdfTemplate
): Promise<boolean> => {
  try {
    console.log("Starting PDFME PDF generation");
    
    // 准备输入数据
    const inputs: PdfMeInput[] = [{
      companyName: calculatorData.companyName || '税务计算',
      totalRevenue: String(calculatorData.totalRevenue || '0'),
      invoicedRevenue: String(calculatorData.invoicedRevenue || '0'),
      taxableIncome: String(calculatorData.taxableIncome || '0'), 
      actualTax: String(calculatorData.actualTax || '0'),
      riskPercentage: String(calculatorData.riskPercentage || '0')
    }];
    
    console.log("Input data prepared:", inputs);
    
    // 创建有效的schema
    const schema = [
      {
        name: 'companyName',
        type: 'text',
        position: { x: 50, y: 50 },
        width: 200,
        height: 20,
      },
      {
        name: 'totalRevenue', 
        type: 'text',
        position: { x: 50, y: 80 }, 
        width: 200,
        height: 20,
      },
      {
        name: 'invoicedRevenue',
        type: 'text',
        position: { x: 50, y: 110 },
        width: 200,
        height: 20,
      },
      {
        name: 'taxableIncome',
        type: 'text',
        position: { x: 50, y: 140 },
        width: 200,
        height: 20,
      },
      {
        name: 'actualTax',
        type: 'text',
        position: { x: 50, y: 170 },
        width: 200,
        height: 20,
      },
      {
        name: 'riskPercentage',
        type: 'text',
        position: { x: 50, y: 200 },
        width: 200,
        height: 20,
      }
    ];
    
    // 准备PDFME模板对象
    const pdfTemplate: Template = {
      basePdf: new Uint8Array(),  // 这里使用空数组，实际使用时需替换为真实PDF模板
      schemas: [schema]
    };
    
    console.log("PDFME template prepared:", {
      hasBasePdf: pdfTemplate.basePdf instanceof Uint8Array,
      schemasLength: pdfTemplate.schemas.length
    });
    
    // 生成PDF
    const pdf = await generate({
      template: pdfTemplate,
      inputs: inputs,
    });
    
    // 下载PDF
    const blob = new Blob([pdf], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${calculatorData.companyName || '税务计算'}_${new Date().toISOString().slice(0, 10)}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    console.log("PDF generated and downloaded successfully");
    return true;
  } catch (error) {
    console.error("PDFME generation error:", error);
    return false;
  }
};

/**
 * 使用HTML2Canvas和jsPDF生成PDF (备用方案)
 */
export const generatePdfWithHtml2Canvas = async (calculatorData: any): Promise<boolean> => {
  try {
    console.log("Falling back to html2canvas PDF generation");
    
    // 获取计算器内容元素
    const content = document.getElementById('calculator-content');
    if (!content) {
      throw new Error("Calculator content element not found");
    }
    
    // 添加PDF导出样式
    content.classList.add('for-pdf-export');
    
    // 创建canvas
    const canvas = await html2canvas(content, {
      scale: 2,
      useCORS: true,
      logging: true,
      backgroundColor: '#ffffff'
    });
    
    // 创建PDF文档
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    
    // 计算图像尺寸
    const imgWidth = pageWidth - 20;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    // 将canvas添加到PDF
    pdf.addImage(
      canvas.toDataURL('image/jpeg', 0.95),
      'JPEG',
      10,
      10,
      imgWidth,
      imgHeight
    );
    
    // 如果内容较长，添加更多页面
    let heightLeft = imgHeight - (pageHeight - 20);
    let position = 10 - (pageHeight - 20);
    
    while (heightLeft > 0) {
      pdf.addPage();
      pdf.addImage(
        canvas.toDataURL('image/jpeg', 0.95),
        'JPEG',
        10,
        position,
        imgWidth,
        imgHeight
      );
      
      heightLeft -= (pageHeight - 20);
      position -= (pageHeight - 20);
    }
    
    // 保存PDF
    pdf.save(`${calculatorData.companyName || '税务计算'}_${new Date().toISOString().slice(0, 10)}.pdf`);
    
    // 清理
    content.classList.remove('for-pdf-export');
    
    console.log("PDF generated with html2canvas successfully");
    return true;
  } catch (error) {
    console.error("HTML2Canvas PDF generation error:", error);
    return false;
  }
};
