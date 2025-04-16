
// Functions for handling form elements in PDF export

// Process checkboxes for PDF display
export const processCheckboxes = (container: HTMLElement) => {
  try {
    const checkboxes = container.querySelectorAll('[role="checkbox"]');
    checkboxes.forEach((checkbox) => {
      if (checkbox instanceof HTMLElement) {
        checkbox.style.visibility = 'visible';
        checkbox.style.display = 'inline-block';
        
        if (checkbox.getAttribute('data-state') === 'checked') {
          checkbox.style.border = '2px solid #000';
          checkbox.style.backgroundColor = '#000';
          
          const checkIcon = checkbox.querySelector('svg');
          if (checkIcon instanceof SVGElement) {
            checkIcon.style.color = '#fff';
            checkIcon.style.visibility = 'visible';
            checkIcon.style.display = 'block';
            checkIcon.setAttribute('data-keep-in-pdf', 'true');
          }
        } else {
          checkbox.style.border = '2px solid #000';
          checkbox.style.backgroundColor = 'transparent';
        }
      }
    });
  } catch (error) {
    console.warn('Error processing checkboxes:', error);
  }
};

// Process tables for PDF display
export const enhanceTables = (container: HTMLElement) => {
  try {
    const tables = container.querySelectorAll('table');
    tables.forEach((table) => {
      if (table instanceof HTMLTableElement) {
        table.style.borderCollapse = 'collapse';
        table.style.width = '100%';
        table.style.visibility = 'visible';
        table.style.display = 'table';
        
        const rows = table.querySelectorAll('tr');
        rows.forEach((row) => {
          if (row instanceof HTMLTableRowElement) {
            row.style.display = 'table-row';
            row.style.visibility = 'visible';
            
            const cells = row.querySelectorAll('td, th');
            cells.forEach((cell) => {
              if (cell instanceof HTMLTableCellElement) {
                cell.style.padding = '8px';
                cell.style.display = 'table-cell';
                cell.style.visibility = 'visible';
                cell.style.color = '#000';
                
                const textElements = cell.querySelectorAll('p, span, div');
                textElements.forEach((el) => {
                  if (el instanceof HTMLElement) {
                    el.style.color = '#000';
                    el.style.visibility = 'visible';
                  }
                });
                
                const inputs = cell.querySelectorAll('input');
                inputs.forEach((input) => {
                  if (input instanceof HTMLInputElement) {
                    input.style.border = 'none';
                    input.style.boxShadow = 'none';
                    
                    let valueDisplay = cell.querySelector('.pdf-value');
                    if (!valueDisplay) {
                      valueDisplay = document.createElement('div');
                      valueDisplay.className = 'pdf-value';
                      valueDisplay.setAttribute('data-pdf-value', 'true');
                      cell.appendChild(valueDisplay);
                    }
                    
                    if (valueDisplay instanceof HTMLElement) {
                      valueDisplay.textContent = input.value || '0';
                      valueDisplay.style.visibility = 'visible';
                      valueDisplay.style.opacity = '1';
                      valueDisplay.style.color = '#000';
                      valueDisplay.style.fontWeight = 'bold';
                    }
                  }
                });
              }
            });
          }
        });
      }
    });
  } catch (error) {
    console.warn('Error enhancing tables:', error);
  }
};
