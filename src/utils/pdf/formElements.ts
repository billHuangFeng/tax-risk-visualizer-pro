// Functions for handling form elements in PDF export

// Process checkboxes for PDF display
export const processCheckboxes = (container: HTMLElement) => {
  try {
    const checkboxes = container.querySelectorAll('[role="checkbox"]');
    checkboxes.forEach((checkbox) => {
      if (checkbox instanceof HTMLElement) {
        checkbox.style.visibility = 'visible';
        checkbox.style.display = 'inline-block';
        checkbox.style.width = '16px';
        checkbox.style.height = '16px';
        checkbox.style.border = '2px solid #000';
        checkbox.style.verticalAlign = 'middle';
        checkbox.style.position = 'relative';
        
        if (checkbox.getAttribute('data-state') === 'checked') {
          checkbox.style.backgroundColor = '#000';
          
          // Create a checkmark
          const checkmark = document.createElement('span');
          checkmark.textContent = '✓';
          checkmark.style.position = 'absolute';
          checkmark.style.top = '-2px';
          checkmark.style.left = '2px';
          checkmark.style.color = '#fff';
          checkmark.style.fontSize = '14px';
          
          checkbox.appendChild(checkmark);
        } else {
          checkbox.style.backgroundColor = 'transparent';
        }
      }
    });
    
    // Format the checkbox labels to match image style
    const checkboxLabels = container.querySelectorAll('label');
    checkboxLabels.forEach((label) => {
      if (label instanceof HTMLElement) {
        label.style.display = 'inline-block';
        label.style.verticalAlign = 'middle';
        label.style.fontWeight = 'normal';
        label.style.fontSize = '14px';
        label.style.marginLeft = '4px';
      }
    });
  } catch (error) {
    console.warn('Error processing checkboxes:', error);
  }
};

// Process tables for PDF display
export const enhanceTables = (container: HTMLElement) => {
  const tables = container.querySelectorAll('table');
  tables.forEach((table) => {
    if (table instanceof HTMLElement) {
      table.style.width = '100%';
      table.style.borderCollapse = 'collapse';
      table.style.marginBottom = '16px';
      
      const cells = table.querySelectorAll('td, th');
      cells.forEach((cell, index) => {
        if (cell instanceof HTMLElement) {
          cell.style.border = '1px solid #000';
          cell.style.padding = '8px';
          cell.style.textAlign = index === 0 ? 'left' : 'right';
          
          // Format numbers
          const input = cell.querySelector('input');
          if (input instanceof HTMLInputElement) {
            const value = input.value || '0';
            const numValue = Number(value);
            
            if (!isNaN(numValue)) {
              cell.textContent = numValue.toLocaleString('zh-CN', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              });
            }
            
            input.style.display = 'none';
          }
        }
      });
    }
  });
};

// Create a special three-column adjustment table like the image
const createAdjustmentTable = (container: HTMLElement, taxAdjustmentSection: Element) => {
  try {
    // Check if we already have an adjustment table
    const existingTable = container.querySelector('.adjustment-table');
    if (existingTable) return;
    
    // Create container for the adjustment table
    const tableSection = document.createElement('div');
    tableSection.className = 'adjustment-table-container';
    
    // Create table for adjustments
    const table = document.createElement('table');
    table.className = 'adjustment-table';
    table.style.width = '100%';
    table.style.borderCollapse = 'collapse';
    table.style.marginTop = '15px';
    table.style.border = '1px solid #000';
    
    // Header row
    const headerRow = document.createElement('tr');
    ['项目', '实际发生', '可抵扣', '调增/调减'].forEach(text => {
      const th = document.createElement('th');
      th.textContent = text;
      th.style.border = '1px solid #000';
      th.style.padding = '8px';
      th.style.backgroundColor = '#f8fafc';
      headerRow.appendChild(th);
    });
    table.appendChild(headerRow);
    
    // Add placeholder rows for adjustment items
    const adjustmentItems = [
      '可加计扣除的研发费用',
      '超标准的业务招待费',
      '广告费和业务宣传费',
      '职工教育经费',
      '职工福利费',
      '补充养老保险和补充医疗保险支出'
    ];
    
    adjustmentItems.forEach(item => {
      const row = document.createElement('tr');
      
      // Item name
      const nameCell = document.createElement('td');
      nameCell.textContent = item;
      nameCell.style.border = '1px solid #000';
      nameCell.style.padding = '8px';
      nameCell.style.textAlign = 'left';
      row.appendChild(nameCell);
      
      // Placeholder cells for values
      ['', '', ''].forEach(() => {
        const cell = document.createElement('td');
        cell.style.border = '1px solid #000';
        cell.style.padding = '8px';
        cell.style.textAlign = 'right';
        row.appendChild(cell);
      });
      
      table.appendChild(row);
    });
    
    // Add a summary row
    const summaryRow = document.createElement('tr');
    const summaryCell = document.createElement('td');
    summaryCell.textContent = '小计';
    summaryCell.style.border = '1px solid #000';
    summaryCell.style.padding = '8px';
    summaryCell.style.textAlign = 'left';
    summaryCell.style.fontWeight = 'bold';
    summaryRow.appendChild(summaryCell);
    
    // Placeholder cells for summary values
    for (let i = 0; i < 2; i++) {
      const cell = document.createElement('td');
      cell.style.border = '1px solid #000';
      cell.style.padding = '8px';
      cell.style.textAlign = 'right';
      summaryRow.appendChild(cell);
    }
    
    // Total adjustment cell
    const totalCell = document.createElement('td');
    totalCell.textContent = '';
    totalCell.style.border = '1px solid #000';
    totalCell.style.padding = '8px';
    totalCell.style.textAlign = 'right';
    totalCell.style.fontWeight = 'bold';
    summaryRow.appendChild(totalCell);
    
    table.appendChild(summaryRow);
    
    // Insert the table into the document
    if (taxAdjustmentSection.nextElementSibling) {
      taxAdjustmentSection.parentElement?.insertBefore(tableSection, taxAdjustmentSection.nextElementSibling);
    } else {
      taxAdjustmentSection.parentElement?.appendChild(tableSection);
    }
    
    tableSection.appendChild(table);
  } catch (error) {
    console.warn('Error creating adjustment table:', error);
  }
};
