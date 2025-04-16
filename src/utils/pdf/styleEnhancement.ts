
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
  // Enhance tables with the style from the image
  const tables = container.querySelectorAll('table');
  tables.forEach((table) => {
    if (table instanceof HTMLElement) {
      table.style.width = '100%';
      table.style.borderCollapse = 'collapse';
      table.style.marginBottom = '20px';
      
      // Process table cells
      const cells = table.querySelectorAll('td, th');
      cells.forEach((cell) => {
        if (cell instanceof HTMLElement) {
          cell.style.border = '1px solid #000';
          cell.style.padding = '8px';
          cell.style.textAlign = 'right';
        }
      });
    }
  });
  
  // Create adjustment table if it doesn't exist
  const taxAdjustmentSection = container.querySelector('h2:contains("企业所得税前调增/调减")');
  if (taxAdjustmentSection) {
    const nextSection = taxAdjustmentSection.nextElementSibling;
    if (nextSection && nextSection instanceof HTMLElement) {
      // Format as a three-column table
      const inputs = nextSection.querySelectorAll('input');
      if (inputs.length > 0 && !nextSection.querySelector('table.adjustment-table')) {
        createAdjustmentTable(nextSection, inputs);
      }
    }
  }
};

const createAdjustmentTable = (container: HTMLElement, inputs: NodeListOf<HTMLInputElement>) => {
  // Create a table for adjustments like in the image
  const table = document.createElement('table');
  table.className = 'adjustment-table';
  table.style.width = '100%';
  table.style.borderCollapse = 'collapse';
  table.style.marginTop = '15px';
  table.style.marginBottom = '20px';
  
  // Create header row
  const headerRow = document.createElement('tr');
  const headers = ['项目', '实际发生', '可抵扣', '调增/调减'];
  headers.forEach(headerText => {
    const th = document.createElement('th');
    th.textContent = headerText;
    th.style.border = '1px solid #000';
    th.style.padding = '8px';
    th.style.backgroundColor = '#f8fafc';
    th.style.fontWeight = 'bold';
    headerRow.appendChild(th);
  });
  table.appendChild(headerRow);
  
  // Map adjustment data
  container.appendChild(table);
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
      
      // Get the state of the checkbox
      const isChecked = checkbox.getAttribute('data-state') === 'checked';
      
      // Style based on checked state
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

const formatLabelValue = (container: HTMLElement) => {
  // Find all grid rows with label-value pairs
  const gridRows = container.querySelectorAll('[class*="grid"]');
  gridRows.forEach((row) => {
    if (row instanceof HTMLElement) {
      const children = Array.from(row.children);
      
      // Label in the first column, value in the second
      if (children.length >= 2) {
        const labelEl = children[0];
        const valueEl = children[1];
        
        if (labelEl instanceof HTMLElement) {
          labelEl.style.textAlign = 'left';
          labelEl.style.fontWeight = 'normal';
        }
        
        if (valueEl instanceof HTMLElement) {
          valueEl.style.textAlign = 'right';
          
          // Check if there's an input or value display
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
              valueDisplay.textContent = value;
              valueDisplay.style.textAlign = 'right';
              valueDisplay.style.fontWeight = 'bold';
            }
            
            // Hide the input
            input.style.display = 'none';
          }
        }
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
