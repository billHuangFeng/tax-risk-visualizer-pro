
// Functions for enhancing styles in PDF export

const createCompanyHeader = (container: HTMLElement) => {
  const companyNameInput = container.querySelector('input#companyName') as HTMLInputElement;
  if (companyNameInput) {
    const companyNameValue = companyNameInput.value || companyNameInput.getAttribute('data-value') || '税务计算报告';
    
    const headerDiv = document.createElement('div');
    headerDiv.className = 'company-header';
    headerDiv.style.fontSize = '22px';
    headerDiv.style.fontWeight = 'bold';
    headerDiv.style.textAlign = 'center';
    headerDiv.style.marginBottom = '24px';
    headerDiv.style.borderBottom = '2px solid #000';
    headerDiv.style.paddingBottom = '12px';
    headerDiv.style.width = '100%';
    headerDiv.textContent = companyNameValue + ' - 税务计算报告';
    
    if (container.firstChild) {
      container.insertBefore(headerDiv, container.firstChild);
    } else {
      container.appendChild(headerDiv);
    }
    
    const companyNameField = companyNameInput.closest('[class*="grid"]');
    if (companyNameField instanceof HTMLElement) {
      companyNameField.style.display = 'none';
    }
  }
};

const enhanceHeadings = (container: HTMLElement) => {
  const sectionHeadings = container.querySelectorAll('h2');
  sectionHeadings.forEach((heading) => {
    if (heading instanceof HTMLElement) {
      heading.style.fontSize = '18px';
      heading.style.fontWeight = 'bold';
      heading.style.marginTop = '32px';
      heading.style.marginBottom = '16px';
      heading.style.paddingLeft = '10px';
      heading.style.borderLeft = '4px solid #3B82F6';
      heading.style.display = 'block';
      heading.style.width = '100%';
      heading.style.backgroundColor = '#f8fafc';
      heading.style.padding = '8px 12px';
      heading.style.pageBreakAfter = 'avoid';
    }
  });
};

const ensureElementsVisibility = (container: HTMLElement) => {
  const allElements = container.querySelectorAll('*');
  allElements.forEach((el) => {
    if (el instanceof HTMLElement) {
      if (
        el.tagName !== 'BUTTON' && 
        !el.classList.contains('pdf-duplicate') &&
        el.style.display !== 'none'
      ) {
        el.style.color = '#000';
        el.style.visibility = 'visible';
        el.style.opacity = '1';
      }
    }
  });
};

export const enhanceStyles = (container: HTMLElement) => {
  try {
    createCompanyHeader(container);
    enhanceHeadings(container);
    ensureElementsVisibility(container);
  } catch (error) {
    console.warn('Error enhancing styles:', error);
  }
};

