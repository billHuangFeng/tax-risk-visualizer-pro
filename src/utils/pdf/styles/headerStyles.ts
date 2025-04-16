
export const createCompanyHeader = (container: HTMLElement) => {
  try {
    // Find company name from input or use default
    const companyNameInput = container.querySelector('input#companyName') as HTMLInputElement;
    let companyNameValue = '税务计算报告';
    
    if (companyNameInput) {
      companyNameValue = companyNameInput.value || companyNameInput.getAttribute('data-value') || '税务计算报告';
    }
    
    // Remove any existing header to avoid duplicates
    const existingHeader = container.querySelector('.company-header');
    if (existingHeader) {
      existingHeader.remove();
    }
    
    // Create header div
    const headerDiv = document.createElement('div');
    headerDiv.className = 'company-header';
    headerDiv.textContent = companyNameValue + ' - 税务计算报告';
    headerDiv.style.fontSize = '18px';
    headerDiv.style.fontWeight = 'bold';
    headerDiv.style.textAlign = 'center';
    headerDiv.style.marginBottom = '24px';
    headerDiv.style.paddingBottom = '12px';
    headerDiv.style.borderBottom = '1px solid #000';
    headerDiv.style.width = '100%';
    
    // Insert at the beginning of the container
    if (container.firstChild) {
      container.insertBefore(headerDiv, container.firstChild);
    } else {
      container.appendChild(headerDiv);
    }
    
    // Add horizontal line under the header for visual separation
    const headerLine = document.createElement('hr');
    headerLine.style.border = 'none';
    headerLine.style.borderTop = '1px solid #000';
    headerLine.style.margin = '0';
    headerLine.style.padding = '0';
    headerLine.style.width = '100%';
    
    headerDiv.appendChild(headerLine);
  } catch (error) {
    console.error('Error creating company header:', error);
  }
};

export const enhanceHeadings = (container: HTMLElement) => {
  try {
    // Style section headings (h2)
    const sectionHeadings = container.querySelectorAll('h2');
    sectionHeadings.forEach((heading) => {
      if (heading instanceof HTMLElement) {
        heading.style.fontSize = '16px';
        heading.style.fontWeight = 'bold';
        heading.style.marginTop = '20px';
        heading.style.marginBottom = '16px';
        heading.style.paddingBottom = '8px';
        heading.style.borderBottom = '1px solid #000';
        heading.style.borderLeft = '4px solid #000';
        heading.style.paddingLeft = '8px';
        heading.style.pageBreakAfter = 'avoid';
      }
    });
    
    // Create a specific style for "基本信息" section
    const basicInfoHeading = Array.from(sectionHeadings).find(
      heading => heading.textContent?.includes('基本信息')
    );
    
    if (basicInfoHeading && basicInfoHeading instanceof HTMLElement) {
      // Add a vertical bar to the left of 基本信息
      const verticalBar = document.createElement('div');
      verticalBar.style.width = '4px';
      verticalBar.style.backgroundColor = '#000';
      verticalBar.style.position = 'absolute';
      verticalBar.style.left = '0';
      verticalBar.style.top = '0';
      verticalBar.style.height = '100%';
      
      // Position the parent relatively for the absolute positioning of the bar
      if (basicInfoHeading.parentElement) {
        basicInfoHeading.parentElement.style.position = 'relative';
        basicInfoHeading.parentElement.style.paddingLeft = '20px';
        basicInfoHeading.parentElement.insertBefore(verticalBar, basicInfoHeading.parentElement.firstChild);
      }
    }
  } catch (error) {
    console.error('Error enhancing headings:', error);
  }
};
