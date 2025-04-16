
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
    tempContainer.style.width = '1200px'; // Fixed width for better rendering
    tempContainer.style.backgroundColor = '#ffffff';
    
    // Process all input elements in the cloned content
    const inputs = clonedContent.querySelectorAll('input');
    inputs.forEach((input: HTMLInputElement) => {
      // Create a label element that will display the input value
      const valueDisplay = document.createElement('div');
      valueDisplay.textContent = input.value || '0';
      valueDisplay.style.position = 'absolute';
      valueDisplay.style.left = '0';
      valueDisplay.style.top = '0';
      valueDisplay.style.width = '100%';
      valueDisplay.style.height = '100%';
      valueDisplay.style.display = 'flex';
      valueDisplay.style.alignItems = 'center';
      valueDisplay.style.justifyContent = input.classList.contains('text-right') ? 'flex-end' : 'flex-start';
      valueDisplay.style.paddingRight = input.classList.contains('text-right') ? '8px' : '0';
      valueDisplay.style.paddingLeft = !input.classList.contains('text-right') ? '8px' : '0';
      valueDisplay.style.backgroundColor = '#fff';
      valueDisplay.style.color = '#000';
      valueDisplay.style.fontSize = '14px';
      valueDisplay.style.fontWeight = 'bold';
      valueDisplay.style.zIndex = '10';
      
      // Add the display element and hide the input
      const parentNode = input.parentNode;
      if (parentNode) {
        parentNode.appendChild(valueDisplay);
        input.style.opacity = '0';
      }
    });
    
    // Process all checkboxes
    const checkboxes = clonedContent.querySelectorAll('[role="checkbox"]');
    checkboxes.forEach((checkbox: HTMLElement) => {
      // Make checked state more visible for PDF
      if (checkbox.getAttribute('data-state') === 'checked') {
        checkbox.style.backgroundColor = '#000';
        checkbox.style.border = '2px solid #000';
        
        const checkIcon = checkbox.querySelector('svg');
        if (checkIcon) {
          checkIcon.style.color = '#fff';
          checkIcon.style.width = '16px';
          checkIcon.style.height = '16px';
        }
      } else {
        checkbox.style.border = '2px solid #000';
      }
    });
    
    // Improve table cell visibility
    const tableCells = clonedContent.querySelectorAll('td');
    tableCells.forEach((cell: HTMLElement) => {
      cell.style.border = '1px solid #ddd';
      cell.style.padding = '8px';
    });
    
    // Scale up all text elements for better visibility
    const textElements = clonedContent.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, label');
    textElements.forEach((el: HTMLElement) => {
      el.style.color = '#000';
      el.style.fontWeight = el.tagName.startsWith('H') ? 'bold' : 'normal';
    });
    
    // Convert the cloned content to canvas with higher quality settings
    console.log("Starting HTML to canvas conversion");
    const canvas = await html2canvas(clonedContent, {
      scale: 3, // Higher scale for better quality
      useCORS: true,
      logging: true,
      backgroundColor: '#ffffff',
      allowTaint: true,
      width: 1200,
      onclone: (document, element) => {
        console.log("Cloned document prepared for rendering");
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
    let page = 1;
    
    // Add first page
    pdf.addImage(
      canvas.toDataURL('image/png'), 
      'PNG', 
      margin, 
      position, 
      imgWidth, 
      imgHeight
    );
    
    console.log(`Added page ${page} to PDF`);
    
    // Add new pages if content doesn't fit on one page
    heightLeft -= (pageHeight - 2 * margin);
    
    while (heightLeft > 0) {
      position = margin - (page * (pageHeight - 2 * margin));
      pdf.addPage();
      page++;
      
      pdf.addImage(
        canvas.toDataURL('image/png'), 
        'PNG', 
        margin, 
        position, 
        imgWidth, 
        imgHeight
      );
      
      console.log(`Added page ${page} to PDF`);
      heightLeft -= (pageHeight - 2 * margin);
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
    console.log("PDF saved successfully");
    
    return true;
  } catch (error) {
    console.error('PDF export failed:', error);
    throw error;
  }
};
