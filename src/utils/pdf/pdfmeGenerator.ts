
import { generate } from '@pdfme/generator';
import { Template } from '@pdfme/common';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { PdfTemplate } from '@/types/pdfTemplates';

// 定义PDFME输入数据类型
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
    
    // 创建PDFME格式的schema - 注意这里需要是二维数组
    const schemas = [
      [
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
      ]
    ];
    
    // 创建空白PDF作为基础模板
    const blankPdf = new Uint8Array([
      0x25, 0x50, 0x44, 0x46, 0x2d, 0x31, 0x2e, 0x34, 0x0a, 0x25, 0xd0, 0xd4, 0xc5, 0xd8, 0x0a, 0x31, 
      0x20, 0x30, 0x20, 0x6f, 0x62, 0x6a, 0x0a, 0x3c, 0x3c, 0x2f, 0x54, 0x79, 0x70, 0x65, 0x2f, 0x43, 
      0x61, 0x74, 0x61, 0x6c, 0x6f, 0x67, 0x2f, 0x50, 0x61, 0x67, 0x65, 0x73, 0x20, 0x32, 0x20, 0x30, 
      0x20, 0x52, 0x3e, 0x3e, 0x0a, 0x65, 0x6e, 0x64, 0x6f, 0x62, 0x6a, 0x0a, 0x32, 0x20, 0x30, 0x20, 
      0x6f, 0x62, 0x6a, 0x0a, 0x3c, 0x3c, 0x2f, 0x54, 0x79, 0x70, 0x65, 0x2f, 0x50, 0x61, 0x67, 0x65, 
      0x73, 0x2f, 0x43, 0x6f, 0x75, 0x6e, 0x74, 0x20, 0x31, 0x2f, 0x4b, 0x69, 0x64, 0x73, 0x5b, 0x33, 
      0x20, 0x30, 0x20, 0x52, 0x5d, 0x3e, 0x3e, 0x0a, 0x65, 0x6e, 0x64, 0x6f, 0x62, 0x6a, 0x0a, 0x33, 
      0x20, 0x30, 0x20, 0x6f, 0x62, 0x6a, 0x0a, 0x3c, 0x3c, 0x2f, 0x54, 0x79, 0x70, 0x65, 0x2f, 0x50, 
      0x61, 0x67, 0x65, 0x2f, 0x50, 0x61, 0x72, 0x65, 0x6e, 0x74, 0x20, 0x32, 0x20, 0x30, 0x20, 0x52, 
      0x2f, 0x52, 0x65, 0x73, 0x6f, 0x75, 0x72, 0x63, 0x65, 0x73, 0x3c, 0x3c, 0x2f, 0x50, 0x72, 0x6f, 
      0x63, 0x53, 0x65, 0x74, 0x5b, 0x2f, 0x50, 0x44, 0x46, 0x20, 0x2f, 0x54, 0x65, 0x78, 0x74, 0x5d, 
      0x3e, 0x3e, 0x2f, 0x4d, 0x65, 0x64, 0x69, 0x61, 0x42, 0x6f, 0x78, 0x5b, 0x30, 0x20, 0x30, 0x20, 
      0x35, 0x39, 0x35, 0x2e, 0x32, 0x38, 0x20, 0x38, 0x34, 0x31, 0x2e, 0x38, 0x39, 0x5d, 0x3e, 0x3e, 
      0x0a, 0x65, 0x6e, 0x64, 0x6f, 0x62, 0x6a, 0x0a, 0x78, 0x72, 0x65, 0x66, 0x0a, 0x30, 0x20, 0x34, 
      0x0a, 0x30, 0x30, 0x30, 0x30, 0x30, 0x30, 0x30, 0x30, 0x30, 0x30, 0x20, 0x36, 0x35, 0x35, 0x33, 
      0x35, 0x20, 0x66, 0x0a, 0x30, 0x30, 0x30, 0x30, 0x30, 0x30, 0x30, 0x30, 0x31, 0x30, 0x20, 0x30, 
      0x30, 0x30, 0x30, 0x30, 0x20, 0x6e, 0x0a, 0x30, 0x30, 0x30, 0x30, 0x30, 0x30, 0x30, 0x30, 0x37, 
      0x39, 0x20, 0x30, 0x30, 0x30, 0x30, 0x30, 0x20, 0x6e, 0x0a, 0x30, 0x30, 0x30, 0x30, 0x30, 0x30, 
      0x30, 0x31, 0x37, 0x33, 0x20, 0x30, 0x30, 0x30, 0x30, 0x30, 0x20, 0x6e, 0x0a, 0x74, 0x72, 0x61, 
      0x69, 0x6c, 0x65, 0x72, 0x0a, 0x3c, 0x3c, 0x2f, 0x53, 0x69, 0x7a, 0x65, 0x20, 0x34, 0x2f, 0x52, 
      0x6f, 0x6f, 0x74, 0x20, 0x31, 0x20, 0x30, 0x20, 0x52, 0x2f, 0x49, 0x6e, 0x66, 0x6f, 0x20, 0x3c, 
      0x3c, 0x3e, 0x3e, 0x3e, 0x3e, 0x0a, 0x73, 0x74, 0x61, 0x72, 0x74, 0x78, 0x72, 0x65, 0x66, 0x0a, 
      0x34, 0x30, 0x36, 0x0a, 0x25, 0x25, 0x45, 0x4f, 0x46, 0x0a
    ]);
    
    // 准备PDFME模板对象 - 注意schema必须是二维数组 
    const pdfTemplate: Template = {
      basePdf: blankPdf,
      schemas: schemas
    };
    
    console.log("PDFME template prepared with schema format:", 
      Array.isArray(pdfTemplate.schemas), 
      Array.isArray(pdfTemplate.schemas[0])
    );
    
    // 使用PDFME generate生成PDF
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
