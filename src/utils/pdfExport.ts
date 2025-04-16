
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export const exportToPDF = async (calculator: any) => {
  try {
    // Create a new PDF document
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });
    
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 10;

    // Get the calculator content
    const content = document.querySelector('#calculator-content');
    if (!content) {
      throw new Error('计算器内容未找到');
    }

    // Clone the content to avoid modifying the original DOM
    const clonedContent = content.cloneNode(true) as HTMLElement;
    const tempContainer = document.createElement('div');
    document.body.appendChild(tempContainer);
    tempContainer.appendChild(clonedContent);
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '-9999px';
    tempContainer.style.top = '0';
    
    // Set specific CSS for PDF rendering
    // Make sure input values are fully visible
    const inputElements = clonedContent.querySelectorAll('input');
    inputElements.forEach((input: HTMLInputElement) => {
      input.style.width = '100%';
      input.style.textOverflow = 'visible';
      input.style.borderColor = 'transparent';
      input.style.paddingRight = '0';
      input.style.letterSpacing = 'normal';
      input.style.fontSize = '14px';
    });
    
    // Ensure number containers are wide enough
    const numberContainers = clonedContent.querySelectorAll('.min-w-\\[180px\\]');
    numberContainers.forEach((container: HTMLElement) => {
      container.style.minWidth = '200px';
      container.style.width = 'auto';
    });
    
    // Make sure text is not wrapped unnecessarily
    const textElements = clonedContent.querySelectorAll('.break-words');
    textElements.forEach((el: HTMLElement) => {
      el.style.whiteSpace = 'nowrap';
      el.style.overflow = 'visible';
    });
    
    // Increase column widths in responsive grids
    const gridCells = clonedContent.querySelectorAll('.md\\:col-span-3');
    gridCells.forEach((cell: HTMLElement) => {
      cell.style.minWidth = '200px';
    });
    
    // Convert the content to canvas with higher quality settings
    console.log("Starting HTML to canvas conversion");
    const canvas = await html2canvas(clonedContent, {
      scale: 2.5, // Increased scale for better quality
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      allowTaint: true,
      onclone: (clonedDoc) => {
        // Further modifications to the cloned document if needed
        const inputs = clonedDoc.querySelectorAll('input');
        inputs.forEach((input: HTMLInputElement) => {
          // Create a visible text node to show the value
          const textSpan = clonedDoc.createElement('span');
          textSpan.textContent = input.value;
          textSpan.style.position = 'absolute';
          textSpan.style.left = '0';
          textSpan.style.top = '0';
          textSpan.style.width = '100%';
          textSpan.style.height = '100%';
          textSpan.style.display = 'flex';
          textSpan.style.alignItems = 'center';
          textSpan.style.paddingRight = '8px';
          textSpan.style.textAlign = input.style.textAlign || 'right';
          textSpan.style.fontWeight = 'bold';
          textSpan.style.overflow = 'visible';
          textSpan.style.whiteSpace = 'nowrap';
          input.parentNode?.appendChild(textSpan);
          input.style.opacity = '0'; // Hide the input but keep its layout
        });
      }
    });
    
    console.log("Canvas created successfully", canvas.width, canvas.height);
    
    // Clean up the temporary container
    document.body.removeChild(tempContainer);
    
    // Calculate dimensions to fit on A4 page
    const imgWidth = pageWidth - (2 * margin);
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    // Handle multi-page content
    let heightLeft = imgHeight;
    let position = margin;
    
    // Add first page
    pdf.addImage(
      canvas.toDataURL('image/png'), 
      'PNG', 
      margin, 
      position, 
      imgWidth, 
      imgHeight
    );
    
    // Add new pages if content doesn't fit on one page
    heightLeft -= pageHeight;
    
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(
        canvas.toDataURL('image/png'), 
        'PNG', 
        margin, 
        position, 
        imgWidth, 
        imgHeight
      );
      heightLeft -= pageHeight;
    }
    
    // Create a proper filename without encoding issues
    const today = new Date().toISOString().slice(0, 10);
    let filename = `税务计算_${today}`;
    
    // Add company name if available
    if (calculator.companyName && calculator.companyName.trim() !== '') {
      filename = `${calculator.companyName}_${today}`;
    }
    
    // Save with proper filename
    pdf.save(`${filename}.pdf`);
    
    return true;
  } catch (error) {
    console.error('PDF export failed:', error);
    throw error;
  }
};
