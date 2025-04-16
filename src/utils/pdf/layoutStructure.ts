
// Functions for handling layout structure in PDF export

export const enhanceLayoutStructure = (container: HTMLElement) => {
  try {
    // 处理基本信息部分
    const basicInfoSection = container.querySelector('h2:contains("基本信息")');
    if (basicInfoSection instanceof HTMLElement) {
      basicInfoSection.style.fontSize = '16px';
      basicInfoSection.style.fontWeight = 'bold';
      basicInfoSection.style.marginBottom = '16px';
    }
    
    // 处理复选框和说明文字
    const checkboxes = container.querySelectorAll('[role="checkbox"]');
    checkboxes.forEach((checkbox) => {
      if (checkbox instanceof HTMLElement) {
        const parentLabel = checkbox.closest('label');
        if (parentLabel) {
          // 设置复选框容器样式
          parentLabel.style.display = 'flex';
          parentLabel.style.alignItems = 'center';
          parentLabel.style.gap = '8px';
          parentLabel.style.marginBottom = '8px';
          
          // 为免受要求企业类型添加缩进说明
          if (checkbox.id === 'exemptBusiness') {
            const description = document.createElement('div');
            description.textContent = '以下企业不能享受：1.烟草制造业、2.住宿和餐饮业、3.批发和零售业、4.房地产业、5.租赁和商务服务业、6.娱乐业';
            description.style.marginLeft = '24px';
            description.style.fontSize = '14px';
            description.style.color = '#666';
            description.style.marginTop = '4px';
            parentLabel.after(description);
          }
        }
      }
    });
    
    // 处理表格布局
    const tables = container.querySelectorAll('table');
    tables.forEach(table => {
      if (table instanceof HTMLElement) {
        table.style.width = '100%';
        table.style.borderCollapse = 'collapse';
        table.style.marginTop = '16px';
        
        // 处理表格标题对齐
        const headers = table.querySelectorAll('th');
        headers.forEach(header => {
          if (header instanceof HTMLElement) {
            header.style.textAlign = 'left';
            header.style.padding = '8px';
            header.style.borderBottom = '1px solid #000';
          }
        });
        
        // 处理表格单元格
        const cells = table.querySelectorAll('td');
        cells.forEach(cell => {
          if (cell instanceof HTMLElement) {
            cell.style.padding = '8px';
            cell.style.borderBottom = '1px solid #ccc';
            
            // 数值单元格右对齐
            if (cell.textContent?.includes('万元') || !isNaN(Number(cell.textContent))) {
              cell.style.textAlign = 'right';
            }
          }
        });
      }
    });
    
    // 处理"其中："标签的样式
    const subHeaders = container.querySelectorAll('.subheader');
    subHeaders.forEach(header => {
      if (header instanceof HTMLElement) {
        header.style.marginLeft = '2em';
        header.style.marginTop = '8px';
        header.style.marginBottom = '8px';
      }
    });
    
    // 处理风险提示框
    const riskBox = container.querySelector('.risk-box');
    if (riskBox instanceof HTMLElement) {
      riskBox.style.border = '1px solid #000';
      riskBox.style.padding = '16px';
      riskBox.style.marginTop = '16px';
      riskBox.style.minHeight = '100px';
    }
    
  } catch (error) {
    console.error('Error in enhanceLayoutStructure:', error);
  }
};
