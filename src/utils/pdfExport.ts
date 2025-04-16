
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

// Prepare cloned content for PDF export
const prepareContentForExport = (content: HTMLElement): HTMLElement => {
  const clonedContent = content.cloneNode(true) as HTMLElement;
  const tempContainer = document.createElement('div');
  document.body.appendChild(tempContainer);
  tempContainer.appendChild(clonedContent);
  
  // Set container styles
  tempContainer.style.position = 'absolute';
  tempContainer.style.left = '-9999px';
  tempContainer.style.top = '0';
  tempContainer.style.width = '1200px';
  tempContainer.style.backgroundColor = '#ffffff';
  
  return tempContainer;
};

// Process input fields for PDF display
const processInputFields = (container: HTMLElement) => {
  const inputs = container.querySelectorAll('input');
  inputs.forEach((input: HTMLInputElement) => {
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
    
    const parentNode = input.parentNode;
    if (parentNode) {
      parentNode.appendChild(valueDisplay);
      input.style.opacity = '0';
    }
  });
};

// Process checkboxes for PDF display
const processCheckboxes = (container: HTMLElement) => {
  const checkboxes = container.querySelectorAll('[role="checkbox"]');
  checkboxes.forEach((checkbox: HTMLElement) => {
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
};

// Enhance visual elements for PDF
const enhanceVisualElements = (container: HTMLElement) => {
  // Improve table cell visibility
  const tableCells = container.querySelectorAll('td');
  tableCells.forEach((cell: HTMLElement) => {
    cell.style.border = '1px solid #ddd';
    cell.style.padding = '8px';
  });

  // Scale up text elements
  const textElements = container.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, label');
  textElements.forEach((el: HTMLElement) => {
    el.style.color = '#000';
    el.style.fontWeight = el.tagName.startsWith('H') ? 'bold' : 'normal';
  });
};

// Create canvas from prepared content
const createCanvas = async (content: HTMLElement): Promise<HTMLCanvasElement> => {
  console.log("Starting HTML to canvas conversion");
  const canvas = await html2canvas(content, {
    scale: 3,
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
  return canvas;
};

// Generate filename for PDF
const generateFilename = (calculator: any): string => {
  const today = new Date().toISOString().slice(0, 10);
  if (calculator.companyName && calculator.companyName.trim() !== '') {
    return `${calculator.companyName}_${today}`;
  }
  return `税务计算_${today}`;
};

// Add content to PDF document
const addContentToPDF = (pdf: jsPDF, canvas: HTMLCanvasElement, margin: number): void => {
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  
  const imgWidth = pageWidth - (2 * margin);
  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
  let heightLeft = imgHeight;
  let position = margin;
  let page = 1;
  
  // Add first page
  pdf.addImage(canvas.toDataURL('image/png'), 'PNG', margin, position, imgWidth, imgHeight);
  console.log(`Added page ${page} to PDF`);
  
  // Add new pages if needed
  heightLeft -= (pageHeight - 2 * margin);
  while (heightLeft > 0) {
    position = margin - (page * (pageHeight - 2 * margin));
    pdf.addPage();
    page++;
    
    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', margin, position, imgWidth, imgHeight);
    console.log(`Added page ${page} to PDF`);
    heightLeft -= (pageHeight - 2 * margin);
  }
};

// Main export function
export const exportToPDF = async (calculator: any) => {
  try {
    const content = document.querySelector('#calculator-content');
    if (!content) {
      throw new Error('计算器内容未找到');
    }

    // Prepare content
    const tempContainer = prepareContentForExport(content);
    const clonedContent = tempContainer.firstChild as HTMLElement;
    
    // Process elements
    processInputFields(clonedContent);
    processCheckboxes(clonedContent);
    enhanceVisualElements(clonedContent);
    
    // Create canvas
    const canvas = await createCanvas(clonedContent);
    
    // Initialize PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });
    
    // Add content to PDF
    const margin = 10;
    addContentToPDF(pdf, canvas, margin);
    
    // Save PDF
    const filename = generateFilename(calculator);
    pdf.save(`${filename}.pdf`);
    console.log("PDF saved successfully");
    
    // Clean up
    document.body.removeChild(tempContainer);
    
    return true;
  } catch (error) {
    console.error('PDF export failed:', error);
    throw error;
  }
};

