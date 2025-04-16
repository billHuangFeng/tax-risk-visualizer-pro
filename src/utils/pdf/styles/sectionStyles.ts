
// Functions for styling specific sections in PDF export
export const enhanceSpecificSections = (container: HTMLElement) => {
  try {
    // Add vertical bar to 基本信息 section
    const basicInfoSection = container.querySelector('h2:contains("基本信息"), h2:contains("企业信息")');
    if (basicInfoSection && basicInfoSection instanceof HTMLElement) {
      // Style the heading
      basicInfoSection.style.fontSize = '18px';
      basicInfoSection.style.fontWeight = 'bold';
      basicInfoSection.style.marginBottom = '16px';
      basicInfoSection.style.paddingLeft = '10px';
      basicInfoSection.style.borderLeft = '4px solid #000';
      
      // Get the parent section if available
      const parentSection = basicInfoSection.closest('section, .section, .basic-info-section');
      if (parentSection && parentSection instanceof HTMLElement) {
        parentSection.style.marginBottom = '30px';
        parentSection.style.position = 'relative';
        
        // Add a visual indicator to the section
        if (!parentSection.querySelector('.section-marker')) {
          const sectionMarker = document.createElement('div');
          sectionMarker.className = 'section-marker';
          sectionMarker.style.width = '4px';
          sectionMarker.style.position = 'absolute';
          sectionMarker.style.left = '0';
          sectionMarker.style.top = '0';
          sectionMarker.style.bottom = '0';
          sectionMarker.style.backgroundColor = '#000';
          parentSection.style.paddingLeft = '20px';
          
          if (parentSection.firstChild) {
            parentSection.insertBefore(sectionMarker, parentSection.firstChild);
          } else {
            parentSection.appendChild(sectionMarker);
          }
        }
      }
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
    
    // Style specific field groups
    const fieldGroups = container.querySelectorAll('.field-group, .form-row, [class*="grid"]');
    fieldGroups.forEach(group => {
      if (group instanceof HTMLElement) {
        group.style.marginBottom = '12px';
        
        // Handle checkboxes within groups
        const checkboxes = group.querySelectorAll('[role="checkbox"]');
        if (checkboxes.length > 0) {
          group.style.display = 'flex';
          group.style.alignItems = 'center';
          group.style.gap = '8px';
        }
      }
    });
    
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
    
    // Ensure proper spacing between sections
    const sections = container.querySelectorAll('section, .section');
    sections.forEach(section => {
      if (section instanceof HTMLElement) {
        section.style.marginBottom = '24px';
        section.style.pageBreakInside = 'avoid';
      }
    });
  } catch (error) {
    console.warn('Error enhancing specific sections:', error);
  }
};
