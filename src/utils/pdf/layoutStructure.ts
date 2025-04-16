
// Functions for handling layout structure in PDF export

const handleGridLayout = (container: HTMLElement) => {
  const gridContainers = container.querySelectorAll('[class*="grid"]');
  gridContainers.forEach((grid) => {
    if (grid instanceof HTMLElement && !grid.classList.contains('pdf-duplicate')) {
      grid.style.display = 'table';
      grid.style.width = '100%';
      grid.style.borderCollapse = 'collapse';
      grid.style.marginBottom = '16px';
      
      // Convert grid items to table cells
      const gridItems = Array.from(grid.children);
      for (let i = 0; i < gridItems.length; i += 2) {
        const labelItem = gridItems[i];
        const valueItem = i + 1 < gridItems.length ? gridItems[i + 1] : null;
        
        if (labelItem instanceof HTMLElement) {
          labelItem.style.display = 'table-cell';
          labelItem.style.width = '50%';
          labelItem.style.textAlign = 'left';
          labelItem.style.padding = '8px';
          labelItem.style.verticalAlign = 'middle';
        }
        
        if (valueItem instanceof HTMLElement) {
          valueItem.style.display = 'table-cell';
          valueItem.style.width = '50%';
          valueItem.style.textAlign = 'right';
          valueItem.style.padding = '8px';
          valueItem.style.verticalAlign = 'middle';
        }
      }
    }
  });
};

const handleCardsAndTables = (container: HTMLElement) => {
  // Fix card layout
  const cards = container.querySelectorAll('.card');
  cards.forEach((card) => {
    if (card instanceof HTMLElement) {
      card.style.marginBottom = '24px';
      card.style.pageBreakInside = 'avoid';
      card.style.border = '1px solid #e5e7eb';
      card.style.padding = '16px';
      card.style.borderRadius = '8px';
    }
  });

  // Fix table layout
  const tables = container.querySelectorAll('table');
  tables.forEach((table) => {
    if (table instanceof HTMLElement) {
      table.style.width = '100%';
      table.style.borderCollapse = 'collapse';
      table.style.marginBottom = '24px';
      table.style.border = '1px solid #e5e7eb';
    }
  });
};

export const enhanceLayoutStructure = (container: HTMLElement) => {
  try {
    handleGridLayout(container);
    handleCardsAndTables(container);
  } catch (error) {
    console.warn('Error enhancing layout structure:', error);
  }
};

