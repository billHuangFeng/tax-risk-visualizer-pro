
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
  tempContainer.classList.add('pdf-export-container');
  
  return tempContainer;
};

// Process input fields for PDF display
const processInputFields = (container: HTMLElement) => {
  const inputs = container.querySelectorAll('input');
  inputs.forEach((input: HTMLInputElement) => {
    // Create a visible span to show the input value
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
  checkboxes.forEach((checkbox: Element) => {
    const checkboxElement = checkbox as HTMLElement;
    
    if (checkboxElement.getAttribute('data-state') === 'checked') {
      checkboxElement.style.backgroundColor = '#000';
      checkboxElement.style.border = '2px solid #000';
      
      const checkIcon = checkboxElement.querySelector('svg');
      if (checkIcon && checkIcon instanceof SVGElement) {
        checkIcon.style.color = '#fff';
        checkIcon.style.width = '16px';
        checkIcon.style.height = '16px';
      }
    } else {
      checkboxElement.style.border = '2px solid #000';
    }
  });
};

// Enhance visual elements for PDF
const enhanceVisualElements = (container: HTMLElement) => {
  // Make all text elements visible with proper styling
  const allElements = container.querySelectorAll('*');
  allElements.forEach((el: Element) => {
    const element = el as HTMLElement;
    if (element.style) {
      element.style.color = '#000';
      element.style.textShadow = 'none';
      element.style.boxShadow = 'none';
    }
  });
  
  // Ensure table elements are visible
  const tableCells = container.querySelectorAll('td');
  tableCells.forEach((cell: Element) => {
    const cellElement = cell as HTMLElement;
    cellElement.style.border = '1px solid #ddd';
    cellElement.style.padding = '8px';
    cellElement.style.color = '#000';
    cellElement.style.backgroundColor = '#fff';
  });

  // Make text elements visible
  const textElements = container.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, label, div');
  textElements.forEach((el: Element) => {
    const textElement = el as HTMLElement;
    if (textElement.textContent && textElement.textContent.trim() !== '') {
      textElement.style.color = '#000';
      textElement.style.fontWeight = textElement.tagName.startsWith('H') ? 'bold' : 'normal';
      textElement.style.visibility = 'visible';
      textElement.style.opacity = '1';
    }
  });
  
  // Fix specific PDF value visibility
  const pdfValues = container.querySelectorAll('.pdf-value');
  pdfValues.forEach((el: Element) => {
    const valueElement = el as HTMLElement;
    valueElement.style.opacity = '1';
    valueElement.style.visibility = 'visible';
    valueElement.style.color = '#000';
    valueElement.style.backgroundColor = '#fff';
  });
};

// Force all input values to be visible
const forceInputValuesVisible = (container: HTMLElement) => {
  // Find all input elements and get their parent div container
  const inputContainers = container.querySelectorAll('.pdf-text-visible');
  inputContainers.forEach((container: Element) => {
    const containerElement = container as HTMLElement;
    containerElement.style.position = 'relative';
    
    // Get the input within this container
    const input = containerElement.querySelector('input');
    if (input && input instanceof HTMLInputElement) {
      // Get or create the value display div
      let valueDisplay = containerElement.querySelector('.pdf-value');
      if (!valueDisplay) {
        valueDisplay = document.createElement('div');
        valueDisplay.className = 'pdf-value';
        containerElement.appendChild(valueDisplay);
      }
      
      // Make sure value display is visible and has the input value
      const valueDisplayElement = valueDisplay as HTMLElement;
      valueDisplayElement.textContent = input.value || '0';
      valueDisplayElement.style.position = 'absolute';
      valueDisplayElement.style.right = '10px';
      valueDisplayElement.style.top = '50%';
      valueDisplayElement.style.transform = 'translateY(-50%)';
      valueDisplayElement.style.opacity = '1';
      valueDisplayElement.style.visibility = 'visible';
      valueDisplayElement.style.color = '#000';
      valueDisplayElement.style.backgroundColor = '#fff';
      valueDisplayElement.style.zIndex = '100';
      valueDisplayElement.style.fontWeight = 'bold';
    }
  });
};

// Create canvas from prepared content
const createCanvas = async (content: HTMLElement): Promise<HTMLCanvasElement> => {
  console.log("Starting HTML to canvas conversion");
  // Give the DOM time to process all styling changes
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const canvas = await html2canvas(content, {
    scale: 2,
    useCORS: true,
    logging: true,
    backgroundColor: '#ffffff',
    allowTaint: true,
    width: 1200,
    onclone: (document, element) => {
      console.log("Cloned document prepared for rendering");
      // Additional processing in the cloned document
      const allInputs = element.querySelectorAll('input');
      allInputs.forEach((input: HTMLInputElement) => {
        if (input.parentElement) {
          const value = input.value || '0';
          const textNode = document.createTextNode(value);
          const span = document.createElement('span');
          span.style.position = 'absolute';
          span.style.top = '0';
          span.style.left = '0';
          span.style.right = '0';
          span.style.bottom = '0';
          span.style.display = 'flex';
          span.style.alignItems = 'center';
          span.style.justifyContent = 'flex-end';
          span.style.paddingRight = '10px';
          span.style.color = '#000';
          span.style.backgroundColor = '#fff';
          span.style.zIndex = '50';
          span.appendChild(textNode);
          input.parentElement.style.position = 'relative';
          input.parentElement.appendChild(span);
        }
      });
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

    // Ensure content is an HTMLElement
    if (!(content instanceof HTMLElement)) {
      throw new Error('计算器内容不是有效的HTML元素');
    }

    // Prepare content
    const tempContainer = prepareContentForExport(content);
    const clonedContent = tempContainer.firstChild as HTMLElement;
    
    // Process elements
    processInputFields(clonedContent);
    processCheckboxes(clonedContent);
    enhanceVisualElements(clonedContent);
    forceInputValuesVisible(clonedContent);
    
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
