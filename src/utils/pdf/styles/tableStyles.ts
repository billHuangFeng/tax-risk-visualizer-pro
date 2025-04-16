
export const enhanceTableLayout = (container: HTMLElement) => {
  try {
    const tables = container.querySelectorAll('table');
    
    tables.forEach((table) => {
      if (table instanceof HTMLElement) {
        // Basic table styling
        table.style.width = '100%';
        table.style.borderCollapse = 'collapse';
        table.style.marginBottom = '24px';
        table.style.pageBreakInside = 'avoid';
        table.style.border = '1px solid #000';
        
        // Process all table cells
        const cells = table.querySelectorAll('td, th');
        cells.forEach((cell) => {
          if (cell instanceof HTMLElement) {
            // Common cell styling
            cell.style.border = '1px solid #000';
            cell.style.padding = '8px';
            
            // Determine text alignment
            if (cell.classList.contains('label-cell') || 
                cell.textContent?.includes('项目') || 
                cell.textContent?.includes('名称') ||
                cell.cellIndex === 0) {
              cell.style.textAlign = 'left';
            } else {
              cell.style.textAlign = 'right';
            }
            
            // Format number values
            const numValue = cell.textContent?.trim();
            if (numValue && !isNaN(Number(numValue)) && numValue !== '' && !numValue.includes('¥')) {
              try {
                cell.textContent = Number(numValue).toLocaleString('zh-CN', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                });
              } catch (e) {
                console.warn('Number formatting error:', e);
              }
            }
            
            // Process input elements in cells
            const input = cell.querySelector('input');
            if (input instanceof HTMLInputElement) {
              const value = input.value || input.getAttribute('data-value') || '0';
              
              try {
                // Format number values from inputs
                if (!isNaN(Number(value))) {
                  cell.textContent = Number(value).toLocaleString('zh-CN', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  });
                } else {
                  cell.textContent = value;
                }
              } catch (e) {
                cell.textContent = value;
                console.warn('Input value formatting error:', e);
              }
              
              // Hide the original input
              input.style.display = 'none';
            }
          }
        });
        
        // Style header cells differently
        const headerCells = table.querySelectorAll('th');
        headerCells.forEach((cell) => {
          if (cell instanceof HTMLElement) {
            cell.style.fontWeight = 'bold';
            cell.style.backgroundColor = '#f5f5f5';
          }
        });
      }
    });
  } catch (error) {
    console.error('Error enhancing table layout:', error);
  }
};
