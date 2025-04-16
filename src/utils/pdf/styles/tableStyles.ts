
export const enhanceTableLayout = (container: HTMLElement) => {
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
