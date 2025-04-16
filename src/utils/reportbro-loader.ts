
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
      
      console.log("创建最小化PDF设计器库");
      
      // 极简化的ReportBro对象
      window.ReportBro = function(reportDefinition) {
        this.reportDefinition = reportDefinition || { 
          docElements: [], 
          parameters: [], 
          styles: [],
          version: "1.0"
        };
        
        this.getReport = function() {
          return this.reportDefinition;
        };
        
        this.generatePdf = function() {
          return Promise.resolve(new Blob(['PDF内容'], {type: 'application/pdf'}));
        };
      };
      
      // 极简化的ReportBroDesigner对象
      window.ReportBroDesigner = function(element, options, reportDefinition) {
        this.element = element;
        this.reportDefinition = reportDefinition || { 
          docElements: [], 
          parameters: [], 
          styles: [],
          version: "1.0"
        };
        
        // 创建报表对象
        this.report = new window.ReportBro(this.reportDefinition);
        
        // 设置UI
        if (this.element) {
          this.element.innerHTML = '<div style="padding:20px"><h3>PDF设计器</h3><div style="border:1px dashed #ccc; padding:20px; margin-top:10px;">设计区域</div></div>';
        }
        
        this.getReport = function() {
          return this.report.getReport();
        };
        
        this.destroy = function() {
          if (this.element) {
            this.element.innerHTML = '';
          }
        };
      };
      
      console.log("本地PDF设计器库初始化完成");
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
