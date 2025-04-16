
// 简化实现的本地设计器库
export const loadReportBroLibraries = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      console.log("初始化本地PDF设计器...");
      
      // 如果已经加载了，直接返回成功
      if (window.ReportBro && window.ReportBroDesigner) {
        console.log("本地PDF设计器库已加载，跳过初始化");
        resolve();
        return;
      }
      
      console.log("开始创建ReportBro对象");
      
      // 创建基础的ReportBro对象 - 确保不使用箭头函数，保持正确的this绑定
      window.ReportBro = function() {
        function ReportBro(reportDefinition) {
          this.reportDefinition = reportDefinition || { 
            docElements: [], 
            parameters: [], 
            styles: [],
            version: "1.0"
          };
          console.log("ReportBro实例已创建");
        }
        
        ReportBro.prototype.getReport = function() {
          return this.reportDefinition;
        };
        
        ReportBro.prototype.generatePdf = function() {
          console.log("生成PDF...");
          return Promise.resolve(new Blob(['PDF内容'], {type: 'application/pdf'}));
        };
        
        return ReportBro;
      }();
      
      console.log("开始创建ReportBroDesigner对象");
      
      // 创建简化版的ReportBroDesigner - 使用直接赋值而非函数闭包
      window.ReportBroDesigner = function() {
        function ReportBroDesigner(element, options, reportDefinition) {
          if (!element) {
            console.error("容器元素无效");
            throw new Error("容器元素无效");
          }
          
          this.element = element;
          this.reportDefinition = reportDefinition || { 
            docElements: [], 
            parameters: [], 
            styles: [],
            version: "1.0"
          };
          
          // 创建报表对象
          this.report = new window.ReportBro(this.reportDefinition);
          
          // 设置设计器UI
          this.setupDesigner();
          
          console.log("ReportBroDesigner实例已创建");
        }
        
        // 设计器UI设置 - 简化版
        ReportBroDesigner.prototype.setupDesigner = function() {
          if (!this.element) {
            throw new Error("容器元素无效");
          }
          
          // 确保容器是可见的
          this.element.style.display = 'block';
          this.element.style.visibility = 'visible';
          
          // 清空容器
          this.element.innerHTML = '';
          
          // 创建简单的UI
          const container = document.createElement('div');
          container.className = 'rb-designer-container';
          container.style.display = 'flex';
          container.style.flexDirection = 'column';
          container.style.height = '100%';
          container.style.width = '100%';
          container.style.backgroundColor = '#fff';
          container.style.padding = '20px';
          
          // 创建标题
          const header = document.createElement('div');
          header.innerHTML = '<h3 style="margin: 0 0 8px 0;">PDF模板设计器</h3>' + 
                            '<p style="margin: 0; color: #666;">您可以添加和布局PDF报表中的元素</p>';
          
          // 创建主内容区域
          const content = document.createElement('div');
          content.style.flex = '1';
          content.style.border = '1px dashed #ccc';
          content.style.marginTop = '20px';
          content.style.display = 'flex';
          content.style.alignItems = 'center';
          content.style.justifyContent = 'center';
          content.innerHTML = '<p style="color: #999;">在此区域拖放元素以设计PDF模板</p>';
          
          // 添加所有元素到容器
          container.appendChild(header);
          container.appendChild(content);
          this.element.appendChild(container);
        };
        
        // 获取报表定义
        ReportBroDesigner.prototype.getReport = function() {
          return this.report.getReport();
        };
        
        // 销毁设计器实例
        ReportBroDesigner.prototype.destroy = function() {
          if (this.element) {
            this.element.innerHTML = '';
          }
        };
        
        return ReportBroDesigner;
      }();
      
      console.log("本地PDF设计器库初始化完成");
      
      // 立即解析承诺，不再延迟
      resolve();
    } catch (error) {
      console.error("PDF设计器库加载错误:", error);
      reject(error);
    }
  });
};

// 声明全局对象以便TypeScript识别
declare global {
  interface Window {
    ReportBro: any;
    ReportBroDesigner: any;
  }
}
