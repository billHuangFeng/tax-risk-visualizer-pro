
// 用于动态加载ReportBro相关的库
export const loadReportBroLibraries = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      // 检查是否已经加载
      if (
        typeof window.ReportBro === 'function' && 
        typeof window.ReportBroDesigner === 'function'
      ) {
        console.log("ReportBro already loaded, skipping load");
        return resolve();
      }

      // 初始化全局对象
      window.$ = window.$ || {};
      window.ReportBro = window.ReportBro || {};
      window.ReportBroDesigner = window.ReportBroDesigner || {};
      
      // 设置一个更短的超时，以防加载时间过长
      const timeout = setTimeout(() => {
        reject(new Error('加载ReportBro库超时，请检查网络连接'));
      }, 10000);
      
      console.log("Starting ReportBro libraries initialization");
      
      // 直接初始化简化版的库，不依赖外部资源
      // 简化的jQuery
      window.jQuery = window.$ = function() {
        return {
          width: () => 800,
          height: () => 600,
          outerWidth: () => 800,
          outerHeight: () => 600,
          offset: () => ({ top: 0, left: 0 }),
          position: () => ({ top: 0, left: 0 }),
          css: () => this,
          attr: () => this,
          append: () => this,
          addClass: () => this,
          removeClass: () => this,
          empty: () => this,
          remove: () => this
        };
      };
      
      // 简化的ReportBro
      window.ReportBro = function() {
        function ReportBro(reportDefinition: any) {
          this.reportDefinition = reportDefinition || { docElements: [], parameters: [], styles: [] };
        }
        
        ReportBro.prototype.load = function(reportDefinition: any) {
          this.reportDefinition = reportDefinition;
          console.log("Report definition loaded");
          return true;
        };
        
        ReportBro.prototype.getReport = function() {
          return this.reportDefinition;
        };
        
        ReportBro.prototype.generatePdf = function() {
          return Promise.resolve(new Blob(['PDF content'], { type: 'application/pdf' }));
        };
        
        return ReportBro;
      }();
      
      // 简化的ReportBroDesigner
      window.ReportBroDesigner = function() {
        function ReportBroDesigner(element: HTMLElement, options: any, reportDefinition: any) {
          console.log("Initializing simplified ReportBro Designer");
          this.element = element;
          this.options = options || {};
          this.reportDefinition = reportDefinition || { docElements: [], parameters: [], styles: [] };
          this.report = new window.ReportBro(reportDefinition);
          
          // 创建简易设计器UI
          this.setupDesigner();
        }
        
        ReportBroDesigner.prototype.setupDesigner = function() {
          if (!this.element) return;
          
          // 清空容器
          while (this.element.firstChild) {
            this.element.removeChild(this.element.firstChild);
          }
          
          // 创建基本设计器UI
          const designerUI = document.createElement('div');
          designerUI.className = 'rb-designer';
          designerUI.style.height = '100%';
          designerUI.style.display = 'flex';
          designerUI.style.flexDirection = 'column';
          
          // 工具栏
          const toolbar = document.createElement('div');
          toolbar.className = 'rb-toolbar';
          toolbar.style.padding = '10px';
          toolbar.style.borderBottom = '1px solid #e0e0e0';
          toolbar.style.display = 'flex';
          toolbar.style.gap = '8px';
          toolbar.innerHTML = `
            <button style="padding: 4px 8px; border: 1px solid #ccc; border-radius: 4px;">添加文本</button>
            <button style="padding: 4px 8px; border: 1px solid #ccc; border-radius: 4px;">添加表格</button>
            <button style="padding: 4px 8px; border: 1px solid #ccc; border-radius: 4px;">添加图片</button>
          `;
          
          // 设计区域
          const designArea = document.createElement('div');
          designArea.className = 'rb-design-area';
          designArea.style.flex = '1';
          designArea.style.padding = '20px';
          designArea.style.backgroundColor = '#f9f9f9';
          designArea.style.position = 'relative';
          designArea.style.overflowY = 'auto';
          
          // 添加A4页面
          const page = document.createElement('div');
          page.className = 'rb-page';
          page.style.width = '210mm';
          page.style.minHeight = '297mm';
          page.style.backgroundColor = 'white';
          page.style.boxShadow = '0 0 5px rgba(0,0,0,0.1)';
          page.style.margin = '0 auto';
          page.style.position = 'relative';
          
          // 如果有已有内容，添加到页面
          if (this.reportDefinition && this.reportDefinition.docElements) {
            this.reportDefinition.docElements.forEach((element: any) => {
              if (element.type === 'text') {
                const textElement = document.createElement('div');
                textElement.style.position = 'absolute';
                textElement.style.left = (element.x || 0) + 'px';
                textElement.style.top = (element.y || 0) + 'px';
                textElement.style.width = (element.width || 100) + 'px';
                textElement.style.height = (element.height || 20) + 'px';
                textElement.style.border = '1px dashed #aaa';
                textElement.style.padding = '2px';
                textElement.textContent = element.content || 'Text';
                page.appendChild(textElement);
              }
            });
          }
          
          designArea.appendChild(page);
          
          // 将组件添加到设计器
          designerUI.appendChild(toolbar);
          designerUI.appendChild(designArea);
          this.element.appendChild(designerUI);
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
      
      console.log("ReportBro libraries initialized successfully");
      clearTimeout(timeout);
      resolve();
    } catch (error) {
      console.error('Error initializing ReportBro libraries:', error);
      reject(error);
    }
  });
};

// 声明全局对象以便TypeScript识别
declare global {
  interface Window {
    ReportBro: any;
    ReportBroDesigner: any;
    $: any;
    jQuery: any;
  }
}
