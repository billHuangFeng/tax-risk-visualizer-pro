
// Functions for styling specific sections in PDF export
export const enhanceSpecificSections = (container: HTMLElement) => {
  try {
    // Style 基本信息 section
    const basicInfoSection = container.querySelector('h2:contains("基本信息")');
    if (basicInfoSection && basicInfoSection instanceof HTMLElement) {
      basicInfoSection.style.fontSize = '18px';
      basicInfoSection.style.fontWeight = 'bold';
      basicInfoSection.style.marginBottom = '16px';
      basicInfoSection.style.borderBottom = '1px solid #000';
    }
    
    // Style 销售收入 section
    const revenueSection = container.querySelector('h2:contains("销售收入")');
    if (revenueSection && revenueSection instanceof HTMLElement) {
      revenueSection.style.fontSize = '18px';
      revenueSection.style.fontWeight = 'bold';
      revenueSection.style.marginTop = '24px';
      revenueSection.style.marginBottom = '16px';
      revenueSection.style.borderBottom = '1px solid #000';
    }
    
    // Style "其中:" labels
    const subheaderLabels = container.querySelectorAll('.subheader-label, div:contains("其中:")');
    subheaderLabels.forEach(label => {
      if (label instanceof HTMLElement) {
        label.style.fontStyle = 'italic';
        label.style.marginLeft = '20px';
        label.style.marginTop = '10px';
        label.style.marginBottom = '8px';
      }
    });
  } catch (error) {
    console.warn('Error enhancing specific sections:', error);
  }
};

