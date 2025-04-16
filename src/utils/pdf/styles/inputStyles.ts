
// Functions for styling input fields in PDF export
export const processInputFields = (container: HTMLElement) => {
  try {
    // Process all input elements for visibility in PDF
    const inputs = container.querySelectorAll('input');
    inputs.forEach((input) => {
      if (input instanceof HTMLInputElement) {
        const value = input.value || input.getAttribute('data-value') || '';
        
        // Find or create a visible element to display the input value
        const parentElement = input.parentElement;
        if (parentElement instanceof HTMLElement) {
          // 查找现有的pdf-value元素
          let valueDisplay = parentElement.querySelector('.pdf-value');
          
          // 如果没有找到，创建一个新的
          if (!valueDisplay) {
            valueDisplay = document.createElement('div');
            valueDisplay.className = 'pdf-value pdf-only';
            (valueDisplay as HTMLElement).style.display = 'none'; // 默认隐藏，仅PDF时显示
            parentElement.appendChild(valueDisplay);
          } else if (valueDisplay instanceof HTMLElement) {
            // 确保现有的元素也有pdf-only类
            valueDisplay.classList.add('pdf-only');
          }
          
          // 样式化值显示元素 (在PDF导出时将变为可见)
          if (valueDisplay instanceof HTMLElement) {
            valueDisplay.textContent = value;
            valueDisplay.style.minWidth = '120px';
            valueDisplay.style.display = 'block'; // PDF导出时会变为可见
            valueDisplay.style.visibility = 'visible';
            valueDisplay.style.opacity = '1';
            valueDisplay.style.border = '1px solid #000';
            valueDisplay.style.padding = '4px 8px';
            valueDisplay.style.textAlign = 'right';
            valueDisplay.dataset.pdfOnly = 'true';
            
            // 特殊处理数字输入
            if (input.type === 'number' || 
                input.id?.includes('Revenue') || 
                input.id?.includes('Expense') || 
                input.id?.includes('Amount') || 
                input.id?.includes('Value')) {
              try {
                // 格式化数字值
                if (value && !isNaN(Number(value))) {
                  valueDisplay.textContent = Number(value).toLocaleString('zh-CN', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  });
                }
              } catch (e) {
                console.warn('Number formatting error:', e);
              }
              
              // 如果需要，添加单位后缀
              if (input.dataset.unit || 
                  input.id?.includes('Revenue') || 
                  input.id?.includes('Expense') || 
                  input.id?.includes('Tax')) {
                const unitLabel = document.createElement('span');
                unitLabel.className = 'unit-label pdf-only';
                unitLabel.textContent = input.dataset.unit || ' 万元';
                (unitLabel as HTMLElement).style.marginLeft = '4px';
                (unitLabel as HTMLElement).style.display = 'none'; // 默认隐藏
                (unitLabel as HTMLElement).dataset.pdfOnly = 'true';
                parentElement.appendChild(unitLabel);
              }
            }
          }
          
          // 隐藏原始输入框 (仅在PDF导出时)
          // input.style.display = 'none'; // 注意：现在我们在PDF导出函数中处理这个
        }
      }
    });
    
    // 处理公司名称字段的特殊情况
    const companyNameField = container.querySelector('#companyName, input[name="companyName"]');
    if (companyNameField instanceof HTMLInputElement) {
      const value = companyNameField.value || '';
      const parentElement = companyNameField.parentElement;
      
      if (parentElement) {
        let valueDisplay = parentElement.querySelector('.pdf-value');
        
        if (!valueDisplay) {
          valueDisplay = document.createElement('div');
          valueDisplay.className = 'pdf-value pdf-only';
          (valueDisplay as HTMLElement).style.display = 'none'; // 默认隐藏
          (valueDisplay as HTMLElement).dataset.pdfOnly = 'true';
          parentElement.appendChild(valueDisplay);
        }
        
        if (valueDisplay instanceof HTMLElement) {
          valueDisplay.textContent = value;
          valueDisplay.style.border = '1px solid #000';
          valueDisplay.style.padding = '4px 8px';
          valueDisplay.style.display = 'block'; // PDF导出时会变为可见
          valueDisplay.style.minWidth = '200px';
          valueDisplay.style.textAlign = 'center';
        }
        
        // 注意：现在我们在PDF导出函数中处理这个
        // companyNameField.style.display = 'none';
      }
    }
  } catch (error) {
    console.warn('Error processing input fields:', error);
  }
};
