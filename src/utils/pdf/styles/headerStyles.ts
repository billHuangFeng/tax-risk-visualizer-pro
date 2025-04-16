
import { PdfTemplate } from '@/types/pdfTemplates';

/**
 * 创建公司标题
 */
export const createCompanyHeader = (container: HTMLElement) => {
  try {
    // 查找公司名称
    const companyNameInput = document.querySelector('input#companyName') as HTMLInputElement;
    const companyName = companyNameInput ? companyNameInput.value : '税务计算';
    
    // 查找或创建页面标题
    let headerEl = container.querySelector('.company-header');
    if (!headerEl) {
      // 创建标题容器
      const headerContainer = document.createElement('div');
      headerContainer.className = 'company-header';
      
      // 创建公司名称标题
      const titleEl = document.createElement('h1');
      titleEl.textContent = companyName;
      headerContainer.appendChild(titleEl);
      
      // 添加日期子标题
      const today = new Date();
      const dateStr = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`;
      const subtitleEl = document.createElement('div');
      subtitleEl.textContent = `税务计算报告 - ${dateStr}`;
      subtitleEl.style.fontSize = '14px';
      subtitleEl.style.marginTop = '8px';
      headerContainer.appendChild(subtitleEl);
      
      // 将标题添加到文档顶部
      if (container.firstChild) {
        container.insertBefore(headerContainer, container.firstChild);
      } else {
        container.appendChild(headerContainer);
      }
      
      // 设置样式
      headerContainer.style.textAlign = 'center';
      headerContainer.style.marginBottom = '24px';
      headerContainer.style.paddingBottom = '16px';
      headerContainer.style.borderBottom = '2px solid #000';
      
      titleEl.style.fontSize = '20px';
      titleEl.style.fontWeight = 'bold';
      titleEl.style.margin = '0 0 8px 0';
    } else if (headerEl instanceof HTMLElement) {
      // 更新现有标题
      const titleEl = headerEl.querySelector('h1');
      if (titleEl) {
        titleEl.textContent = companyName;
      }
    }
  } catch (error) {
    console.error('Error creating company header:', error);
  }
};

/**
 * 增强标题样式
 */
export const enhanceHeadings = (container: HTMLElement, template?: PdfTemplate) => {
  try {
    const headingFontSize = template?.styles.headingStyle.fontSize || '16px';
    const headingFontWeight = template?.styles.headingStyle.fontWeight || 'bold';
    const headingColor = template?.styles.headingStyle.color || '#000';
    const headingBorder = template?.styles.headingStyle.borderBottom || '1px solid #000';
    const headingMargin = template?.styles.headingStyle.marginBottom || '16px';
    
    // 处理所有标题（h1, h2等）
    const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headings.forEach(heading => {
      if (heading instanceof HTMLElement) {
        // 应用通用标题样式
        heading.style.fontSize = heading.tagName === 'H1' ? '20px' : headingFontSize;
        heading.style.fontWeight = headingFontWeight;
        heading.style.color = headingColor;
        heading.style.marginBottom = heading.tagName === 'H1' ? '8px' : headingMargin;
        
        // 为非公司标头的所有标题添加底部边框
        if (!heading.closest('.company-header')) {
          heading.style.borderBottom = headingBorder;
          heading.style.paddingBottom = '8px';
        }
        
        // 设置特定样式
        if (heading.tagName === 'H2') {
          heading.style.marginTop = '24px';
        }
      }
    });
    
    // 处理特定类型的标题
    const sectionTitles = container.querySelectorAll('.section-title, [class*="-title"]');
    sectionTitles.forEach(title => {
      if (title instanceof HTMLElement && !title.closest('.company-header')) {
        title.style.fontSize = headingFontSize;
        title.style.fontWeight = headingFontWeight;
        title.style.color = headingColor;
        title.style.marginBottom = '12px';
        title.style.borderBottom = headingBorder;
        title.style.paddingBottom = '4px';
      }
    });
  } catch (error) {
    console.error('Error enhancing headings:', error);
  }
};
