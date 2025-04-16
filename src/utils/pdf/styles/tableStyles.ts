
export const enhanceTableLayout = (container: HTMLElement) => {
  const tables = container.querySelectorAll('table');
  tables.forEach((table) => {
    if (table instanceof HTMLElement) {
      table.style.width = '100%';
      table.style.borderCollapse = 'collapse';
      table.style.marginBottom = '24px';
      table.style.pageBreakInside = 'avoid';
      
      const cells = table.querySelectorAll('td, th');
      cells.forEach((cell) => {
        if (cell instanceof HTMLElement) {
          cell.style.border = 'none';
          cell.style.borderBottom = '1px solid #000';
          cell.style.padding = '8px 4px';
          cell.style.fontSize = '14px';
          cell.style.textAlign = cell.classList.contains('label-cell') ? 'left' : 'right';
          
          // Format numbers
          const numValue = cell.textContent?.trim();
          if (numValue && !isNaN(Number(numValue)) && !numValue.includes('¥')) {
            cell.textContent = Number(numValue).toLocaleString('zh-CN', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            });
          }
        }
      });

      // Style header cells differently
      const headerCells = table.querySelectorAll('th');
      headerCells.forEach((cell) => {
        if (cell instanceof HTMLElement) {
          cell.style.backgroundColor = '#ffffff';
          cell.style.fontWeight = 'normal';
          cell.style.borderBottom = '1px solid #000';
        }
      });
    }
  });
};
