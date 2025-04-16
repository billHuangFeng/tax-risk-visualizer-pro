
export const createCompanyHeader = (container: HTMLElement) => {
  const companyNameInput = container.querySelector('input#companyName') as HTMLInputElement;
  if (companyNameInput) {
    const companyNameValue = companyNameInput.value || companyNameInput.getAttribute('data-value') || '税务计算报告';
    
    // Remove any existing header
    const existingHeader = container.querySelector('.company-header');
    if (existingHeader) {
      existingHeader.remove();
    }
    
    const headerDiv = document.createElement('div');
    headerDiv.className = 'company-header';
    headerDiv.textContent = companyNameValue + ' - 税务计算报告';
    
    // Add a horizontal line under the header
    const headerLine = document.createElement('hr');
    headerLine.style.border = 'none';
    headerLine.style.borderTop = '1px solid #000';
    headerLine.style.margin = '0';
    headerLine.style.padding = '0';
    headerLine.style.width = '100%';
    
    if (container.firstChild) {
      container.insertBefore(headerDiv, container.firstChild);
    } else {
      container.appendChild(headerDiv);
    }
  }
};

export const enhanceHeadings = (container: HTMLElement) => {
  const sectionHeadings = container.querySelectorAll('h2');
  sectionHeadings.forEach((heading) => {
    if (heading instanceof HTMLElement) {
      heading.style.fontSize = '16px';
      heading.style.fontWeight = 'bold';
      heading.style.marginTop = '24px';
      heading.style.marginBottom = '16px';
      heading.style.paddingLeft = '8px';
      heading.style.borderLeft = '4px solid #000';
      heading.style.borderBottom = '1px solid #000';
      heading.style.display = 'block';
      heading.style.width = '100%';
      heading.style.paddingBottom = '4px';
      heading.style.pageBreakAfter = 'avoid';
    }
  });
};
