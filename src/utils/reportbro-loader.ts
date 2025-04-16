
// 使用完全自定义的本地设计器模拟而不依赖外部库
export const loadReportBroLibraries = (): Promise<void> => {
  return new Promise((resolve) => {
    console.log("初始化本地PDF设计器...");
    
    // 创建本地模拟版本的ReportBro
    window.ReportBro = function() {
      function ReportBro(reportDefinition: any) {
        this.reportDefinition = reportDefinition || { 
          docElements: [], 
          parameters: [], 
          styles: [],
          version: "1.0"
        };
      }
      
      ReportBro.prototype.load = function(reportDefinition: any) {
        this.reportDefinition = reportDefinition;
        console.log("已加载报表定义");
        return true;
      };
      
      ReportBro.prototype.getReport = function() {
        return this.reportDefinition;
      };
      
      return ReportBro;
    }();
    
    // 创建本地模拟版本的设计器
    window.ReportBroDesigner = function() {
      function ReportBroDesigner(element: HTMLElement, options: any, reportDefinition: any) {
        this.element = element;
        this.options = options || {};
        this.initialReport = reportDefinition || { 
          docElements: [], 
          parameters: [], 
          styles: [],
          version: "1.0"
        };
        this.report = new window.ReportBro(this.initialReport);
        this.setupDesigner();
      }
      
      ReportBroDesigner.prototype.setupDesigner = function() {
        if (!this.element) return;
        
        // 清空容器
        while (this.element.firstChild) {
          this.element.removeChild(this.element.firstChild);
        }
        
        // 创建简易设计器界面
        const container = document.createElement('div');
        container.className = 'rb-designer-container';
        container.style.display = 'flex';
        container.style.flexDirection = 'column';
        container.style.height = '100%';
        container.style.width = '100%';
        container.style.position = 'relative';
        container.style.backgroundColor = '#fff';
        container.style.padding = '20px';
        container.style.borderRadius = '8px';
        container.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        
        // 创建标题
        const header = document.createElement('div');
        header.style.marginBottom = '20px';
        header.innerHTML = '<h3 style="margin: 0 0 8px 0; font-size: 16px;">PDF模板设计器</h3><p style="margin: 0; color: #666; font-size: 14px;">自定义您的PDF模板布局</p>';
        
        // 创建设计面板
        const designPanel = document.createElement('div');
        designPanel.style.display = 'flex';
        designPanel.style.gap = '20px';
        designPanel.style.flex = '1';
        
        // 创建工具栏
        const toolbar = document.createElement('div');
        toolbar.style.width = '200px';
        toolbar.style.padding = '15px';
        toolbar.style.backgroundColor = '#f5f5f5';
        toolbar.style.borderRadius = '8px';
        
        // 添加工具栏标题
        const toolbarTitle = document.createElement('h4');
        toolbarTitle.textContent = '组件';
        toolbarTitle.style.margin = '0 0 15px 0';
        toolbarTitle.style.fontSize = '14px';
        toolbar.appendChild(toolbarTitle);
        
        // 添加组件按钮
        const components = [
          { id: 'text', name: '文本' },
          { id: 'image', name: '图片' },
          { id: 'table', name: '表格' },
          { id: 'line', name: '分割线' },
          { id: 'header', name: '页头' },
          { id: 'footer', name: '页脚' }
        ];
        
        components.forEach(comp => {
          const btn = document.createElement('button');
          btn.textContent = comp.name;
          btn.style.display = 'block';
          btn.style.width = '100%';
          btn.style.padding = '8px 12px';
          btn.style.marginBottom = '8px';
          btn.style.border = '1px solid #ddd';
          btn.style.borderRadius = '4px';
          btn.style.backgroundColor = '#fff';
          btn.style.cursor = 'pointer';
          btn.style.textAlign = 'left';
          btn.style.fontSize = '13px';
          
          btn.addEventListener('mouseenter', () => {
            btn.style.backgroundColor = '#f0f0f0';
          });
          
          btn.addEventListener('mouseleave', () => {
            btn.style.backgroundColor = '#fff';
          });
          
          btn.addEventListener('click', () => {
            this.addElement(comp.id);
          });
          
          toolbar.appendChild(btn);
        });
        
        // 创建预览区域
        const previewArea = document.createElement('div');
        previewArea.style.flex = '1';
        previewArea.style.padding = '20px';
        previewArea.style.backgroundColor = '#f9f9f9';
        previewArea.style.borderRadius = '8px';
        previewArea.style.position = 'relative';
        previewArea.style.overflow = 'auto';
        
        // 添加A4预览页
        const a4Page = document.createElement('div');
        a4Page.className = 'a4-page';
        a4Page.style.width = '210mm';
        a4Page.style.height = '297mm';
        a4Page.style.maxWidth = '100%';
        a4Page.style.backgroundColor = '#fff';
        a4Page.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
        a4Page.style.position = 'relative';
        a4Page.style.margin = '0 auto';
        
        // 如果有现有内容，加载到页面
        if (this.initialReport && this.initialReport.docElements && Array.isArray(this.initialReport.docElements)) {
          this.initialReport.docElements.forEach((element: any) => {
            const elem = this.createElementByType(element);
            if (elem) a4Page.appendChild(elem);
          });
        }
        
        // 添加A4页面到预览区域
        previewArea.appendChild(a4Page);
        
        // 添加右侧属性面板
        const propertiesPanel = document.createElement('div');
        propertiesPanel.style.width = '250px';
        propertiesPanel.style.padding = '15px';
        propertiesPanel.style.backgroundColor = '#f5f5f5';
        propertiesPanel.style.borderRadius = '8px';
        
        // 添加属性面板标题
        const propertiesTitle = document.createElement('h4');
        propertiesTitle.textContent = '属性';
        propertiesTitle.style.margin = '0 0 15px 0';
        propertiesTitle.style.fontSize = '14px';
        propertiesPanel.appendChild(propertiesTitle);
        
        // 添加一些示例属性控件
        const props = [
          { id: 'width', name: '宽度', type: 'text', value: '100' },
          { id: 'height', name: '高度', type: 'text', value: '30' },
          { id: 'font', name: '字体', type: 'select', options: ['宋体', '黑体', '微软雅黑'] },
          { id: 'fontSize', name: '字号', type: 'select', options: ['10', '12', '14', '16', '18'] },
          { id: 'align', name: '对齐', type: 'radio', options: ['左', '中', '右'] }
        ];
        
        props.forEach(prop => {
          const group = document.createElement('div');
          group.style.marginBottom = '12px';
          
          const label = document.createElement('label');
          label.textContent = prop.name;
          label.style.display = 'block';
          label.style.marginBottom = '4px';
          label.style.fontSize = '13px';
          
          group.appendChild(label);
          
          if (prop.type === 'text') {
            const input = document.createElement('input');
            input.type = 'text';
            input.value = prop.value || '';
            input.style.width = '100%';
            input.style.padding = '6px 8px';
            input.style.border = '1px solid #ddd';
            input.style.borderRadius = '4px';
            input.style.fontSize = '13px';
            
            group.appendChild(input);
          } else if (prop.type === 'select') {
            const select = document.createElement('select');
            select.style.width = '100%';
            select.style.padding = '6px 8px';
            select.style.border = '1px solid #ddd';
            select.style.borderRadius = '4px';
            select.style.fontSize = '13px';
            
            if (prop.options && Array.isArray(prop.options)) {
              prop.options.forEach(opt => {
                const option = document.createElement('option');
                option.value = opt;
                option.textContent = opt;
                select.appendChild(option);
              });
            }
            
            group.appendChild(select);
          } else if (prop.type === 'radio') {
            const radioGroup = document.createElement('div');
            radioGroup.style.display = 'flex';
            radioGroup.style.gap = '8px';
            
            if (prop.options && Array.isArray(prop.options)) {
              prop.options.forEach((opt, index) => {
                const radioContainer = document.createElement('label');
                radioContainer.style.display = 'flex';
                radioContainer.style.alignItems = 'center';
                radioContainer.style.cursor = 'pointer';
                radioContainer.style.fontSize = '13px';
                
                const radio = document.createElement('input');
                radio.type = 'radio';
                radio.name = prop.id;
                radio.value = opt;
                radio.checked = index === 0;
                radio.style.marginRight = '4px';
                
                radioContainer.appendChild(radio);
                radioContainer.appendChild(document.createTextNode(opt));
                radioGroup.appendChild(radioContainer);
              });
            }
            
            group.appendChild(radioGroup);
          }
          
          propertiesPanel.appendChild(group);
        });
        
        // 组装设计面板
        designPanel.appendChild(toolbar);
        designPanel.appendChild(previewArea);
        designPanel.appendChild(propertiesPanel);
        
        // 组装所有元素
        container.appendChild(header);
        container.appendChild(designPanel);
        
        // 添加到设计器元素
        this.element.appendChild(container);
      };
      
      ReportBroDesigner.prototype.createElementByType = function(element: any) {
        const elem = document.createElement('div');
        elem.style.position = 'absolute';
        elem.style.left = (element.x || 0) + 'px';
        elem.style.top = (element.y || 0) + 'px';
        elem.style.width = (element.width || 100) + 'px';
        elem.style.height = (element.height || 30) + 'px';
        elem.style.border = '1px dashed #ccc';
        elem.style.backgroundColor = 'rgba(200, 200, 200, 0.1)';
        elem.style.cursor = 'move';
        elem.setAttribute('data-id', element.id || '');
        elem.setAttribute('data-type', element.type || '');
        
        if (element.type === 'text') {
          elem.textContent = element.content || '文本内容';
          elem.style.lineHeight = element.height + 'px';
          elem.style.padding = '0 5px';
        } else if (element.type === 'image') {
          elem.style.backgroundImage = 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'30\' height=\'30\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23999\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Crect x=\'3\' y=\'3\' width=\'18\' height=\'18\' rx=\'2\' ry=\'2\'/%3E%3Ccircle cx=\'8.5\' cy=\'8.5\' r=\'1.5\'/%3E%3Cpolyline points=\'21 15 16 10 5 21\'/%3E%3C/svg%3E")';
          elem.style.backgroundRepeat = 'no-repeat';
          elem.style.backgroundPosition = 'center';
          elem.style.backgroundSize = '30px';
        } else if (element.type === 'table') {
          const table = document.createElement('table');
          table.style.width = '100%';
          table.style.height = '100%';
          table.style.borderCollapse = 'collapse';
          
          // 创建3x3示例表格
          for (let i = 0; i < 3; i++) {
            const row = document.createElement('tr');
            for (let j = 0; j < 3; j++) {
              const cell = document.createElement(i === 0 ? 'th' : 'td');
              cell.style.border = '1px solid #ccc';
              cell.style.padding = '2px 4px';
              cell.style.fontSize = '12px';
              cell.textContent = i === 0 ? `标题${j+1}` : `内容${i}-${j+1}`;
              row.appendChild(cell);
            }
            table.appendChild(row);
          }
          
          elem.appendChild(table);
        } else if (element.type === 'line') {
          elem.style.height = '1px';
          elem.style.backgroundColor = '#000';
          elem.style.border = 'none';
        }
        
        // 添加事件处理（简单示范）
        elem.addEventListener('click', (e) => {
          e.stopPropagation();
          // 选中元素
          const selected = this.element.querySelectorAll('.selected-element');
          selected.forEach((el: Element) => {
            el.classList.remove('selected-element');
            (el as HTMLElement).style.border = '1px dashed #ccc';
          });
          
          elem.classList.add('selected-element');
          elem.style.border = '1px dashed #007bff';
        });
        
        return elem;
      };
      
      ReportBroDesigner.prototype.addElement = function(type: string) {
        // 找到A4页面
        const a4Page = this.element.querySelector('.a4-page');
        if (!a4Page) return;
        
        // 创建新元素数据
        const elementData = {
          id: 'el_' + Date.now(),
          type: type,
          x: 50,
          y: 50,
          width: type === 'line' ? 200 : 100,
          height: type === 'line' ? 1 : 30,
          content: type === 'text' ? '新文本' : ''
        };
        
        // 更新报表数据
        this.report.reportDefinition.docElements.push(elementData);
        
        // 创建DOM元素
        const newElement = this.createElementByType(elementData);
        if (newElement) {
          a4Page.appendChild(newElement);
        }
      };
      
      ReportBroDesigner.prototype.getReport = function() {
        return this.report.getReport();
      };
      
      ReportBroDesigner.prototype.destroy = function() {
        if (this.element) {
          while (this.element.firstChild) {
            this.element.removeChild(this.element.firstChild);
          }
        }
      };
      
      return ReportBroDesigner;
    }();
    
    console.log("本地PDF设计器库初始化完成");
    
    // 立即解析，因为我们不需要等待外部资源加载
    resolve();
  });
};

// 声明全局对象以便TypeScript识别
declare global {
  interface Window {
    ReportBro: any;
    ReportBroDesigner: any;
  }
}
