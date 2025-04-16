
// 简化版PDF增强器，专注于图片中的样式

export const enhanceLayout = (container: HTMLElement) => {
  try {
    console.log("Applying layout enhancements to match reference image");
    
    // 基础样式
    container.style.fontFamily = "SimSun, serif";
    container.style.color = "#000000";
    container.style.backgroundColor = "#ffffff";
    container.style.width = "100%";
    container.style.boxSizing = "border-box";
    container.style.padding = "40px";
    
    // 页眉样式
    const header = container.querySelector('.company-header');
    if (header instanceof HTMLElement) {
      header.style.textAlign = 'center';
      header.style.marginBottom = '20px';
      
      const title = header.querySelector('h1');
      if (title instanceof HTMLElement) {
        title.style.fontSize = '18px';
        title.style.fontWeight = 'normal';
        title.style.margin = '0';
      }
      
      const subtitle = header.querySelector('div:not(h1)');
      if (subtitle instanceof HTMLElement) {
        subtitle.style.fontSize = '14px';
        subtitle.style.margin = '5px 0';
      }
    }
    
    // 页眉下分隔线
    const headerSeparator = container.querySelector('.header-separator');
    if (headerSeparator instanceof HTMLElement) {
      headerSeparator.style.height = '1px';
      headerSeparator.style.backgroundColor = '#000';
      headerSeparator.style.marginBottom = '30px';
    }
    
    // 使用说明框
    const infoBox = container.querySelector('.instruction-box');
    if (infoBox instanceof HTMLElement) {
      infoBox.style.border = '1px solid #000';
      infoBox.style.borderRadius = '5px';
      infoBox.style.padding = '20px';
      infoBox.style.marginBottom = '30px';
      infoBox.style.textAlign = 'center';
    }
    
    // 部分标题栏
    const sectionTitles = container.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
      if (title instanceof HTMLElement) {
        const bar = document.createElement('div');
        bar.style.width = '3px';
        bar.style.height = '16px';
        bar.style.backgroundColor = '#000';
        bar.style.marginRight = '5px';
        
        const textEl = document.createElement('div');
        textEl.textContent = title.textContent || '';
        textEl.style.fontSize = '16px';
        textEl.style.fontWeight = 'bold';
        
        // 清空原内容并添加新的布局
        title.textContent = '';
        title.style.display = 'flex';
        title.style.alignItems = 'center';
        title.style.marginBottom = '10px';
        title.appendChild(bar);
        title.appendChild(textEl);
      }
    });
    
    // 检查并确保所有元素可见性
    const allElements = container.querySelectorAll('*');
    allElements.forEach(el => {
      if (el instanceof HTMLElement) {
        el.style.visibility = 'visible';
        el.style.color = '#000';
      }
    });
    
  } catch (error) {
    console.error('Error in layout enhancement:', error);
  }
};
