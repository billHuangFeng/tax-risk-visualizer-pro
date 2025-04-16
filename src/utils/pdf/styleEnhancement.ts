// Functions for enhancing styles in PDF export

const createCompanyHeader = (container: HTMLElement) => {
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

const enhanceHeadings = (container: HTMLElement) => {
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

const enhanceTableLayout = (container: HTMLElement) => {
  const tables = container.querySelectorAll('table');
  tables.forEach((table) => {
    if (table instanceof HTMLElement) {
      table.style.width = '100%';
      table.style.borderCollapse = 'collapse';
      table.style.marginBottom = '16px';
      table.style.pageBreakInside = 'avoid';
      
      const cells = table.querySelectorAll('td, th');
      cells.forEach((cell) => {
        if (cell instanceof HTMLElement) {
          cell.style.border = '1px solid #000';
          cell.style.padding = '8px';
          cell.style.textAlign = cell.classList.contains('label-cell') ? 'left' : 'right';
          
          // Format numbers with commas and fixed decimal places
          const numValue = cell.textContent?.trim();
          if (numValue && !isNaN(Number(numValue))) {
            cell.textContent = Number(numValue).toLocaleString('zh-CN', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            });
          }
        }
      });
    }
  });
};

const formatLabelValue = (container: HTMLElement) => {
  const gridRows = container.querySelectorAll('[class*="grid"]');
  gridRows.forEach((row) => {
    if (row instanceof HTMLElement) {
      const children = Array.from(row.children);
      
      if (children.length >= 2) {
        const labelEl = children[0];
        const valueEl = children[1];
        
        if (labelEl instanceof HTMLElement) {
          labelEl.style.textAlign = 'left';
          labelEl.style.paddingRight = '16px';
        }
        
        if (valueEl instanceof HTMLElement) {
          valueEl.style.textAlign = 'right';
          
          const input = valueEl.querySelector('input');
          if (input instanceof HTMLInputElement) {
            const value = input.value || input.getAttribute('data-value') || '';
            
            // Create or update value display
            let valueDisplay = valueEl.querySelector('.pdf-value');
            if (!valueDisplay) {
              valueDisplay = document.createElement('div');
              valueDisplay.className = 'pdf-value';
              valueEl.appendChild(valueDisplay);
            }
            
            if (valueDisplay instanceof HTMLElement) {
              // Format number with commas and fixed decimal places
              const numValue = Number(value);
              valueDisplay.textContent = isNaN(numValue) ? value : 
                numValue.toLocaleString('zh-CN', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                });
            }
            
            input.style.display = 'none';
          }
        }
      }
    }
  });
};

const enhanceCheckboxes = (container: HTMLElement) => {
  const checkboxes = container.querySelectorAll('[role="checkbox"]');
  checkboxes.forEach((checkbox) => {
    if (checkbox instanceof HTMLElement) {
      checkbox.style.width = '16px';
      checkbox.style.height = '16px';
      checkbox.style.border = '1px solid #000';
      checkbox.style.display = 'inline-block';
      checkbox.style.verticalAlign = 'middle';
      checkbox.style.marginRight = '8px';
      
      const isChecked = checkbox.getAttribute('data-state') === 'checked';
      
      if (isChecked) {
        checkbox.style.backgroundColor = '#000';
        checkbox.textContent = '✓';
        checkbox.style.color = '#fff';
        checkbox.style.textAlign = 'center';
        checkbox.style.lineHeight = '14px';
        checkbox.style.fontSize = '12px';
        checkbox.style.fontWeight = 'bold';
      } else {
        checkbox.style.backgroundColor = '#fff';
      }
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
    enhanceTableLayout(container);
    enhanceCheckboxes(container);
    formatLabelValue(container);
    ensureElementsVisibility(container);
  } catch (error) {
    console.warn('Error enhancing styles:', error);
  }
};
