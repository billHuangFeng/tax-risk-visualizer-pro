
export const createCompanyHeader = (container: HTMLElement) => {
  const companyNameInput = container.querySelector('input#companyName') as HTMLInputElement;
  if (companyNameInput) {
    const companyNameValue = companyNameInput.value || companyNameInput.getAttribute('data-value') || '税务计算报告';
    
    const headerDiv = document.createElement('div');
    headerDiv.className = 'company-header';
    headerDiv.textContent = companyNameValue + ' - 税务计算报告';
    
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
      heading.style.fontSize = '18px';
      heading.style.fontWeight = 'bold';
      heading.style.marginTop = '32px';
      heading.style.marginBottom = '16px';
      heading.style.paddingLeft = '10px';
      heading.style.borderLeft = '4px solid #000';
      heading.style.display = 'block';
      heading.style.width = '100%';
      heading.style.backgroundColor = '#f8fafc';
      heading.style.padding = '8px 12px';
      heading.style.pageBreakAfter = 'avoid';
    }
  });
};
