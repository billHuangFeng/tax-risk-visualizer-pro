
// 用于动态加载ReportBro相关的库
export const loadReportBroLibraries = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      // 添加 jQuery 和 ReportBro 库到全局对象以解决一些依赖问题
      window.$ = window.$ || {};
      window.ReportBro = window.ReportBro || {};
      window.ReportBroDesigner = window.ReportBroDesigner || {};

      // 加载ReportBro样式
      const reportBroStyle = document.createElement('link');
      reportBroStyle.rel = 'stylesheet';
      reportBroStyle.href = 'https://cdn.jsdelivr.net/npm/reportbro-designer@3.0.0/dist/reportbro.css';
      document.head.appendChild(reportBroStyle);

      // 加载jQuery (ReportBro依赖)
      const jqueryScript = document.createElement('script');
      jqueryScript.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
      
      jqueryScript.onload = () => {
        console.log("jQuery loaded successfully");
        
        // 加载ReportBro库 - 使用旧版本可能更稳定
        const reportBroScript = document.createElement('script');
        reportBroScript.src = 'https://cdn.jsdelivr.net/npm/reportbro-lib@2.0.3/dist/reportbro.min.js';
        
        reportBroScript.onload = () => {
          console.log("ReportBro library loaded successfully");
          
          // 加载ReportBro Designer
          const designerScript = document.createElement('script');
          designerScript.src = 'https://cdn.jsdelivr.net/npm/reportbro-designer@2.0.3/dist/reportbro-designer.min.js';
          
          designerScript.onload = () => {
            console.log("ReportBro Designer loaded successfully");
            // 确保所有脚本都已完全加载
            setTimeout(() => {
              resolve();
            }, 500);
          };
          
          designerScript.onerror = (err) => {
            console.error("Failed to load ReportBro Designer", err);
            reject(new Error('无法加载 ReportBro 设计器'));
          };
          
          document.head.appendChild(designerScript);
        };
        
        reportBroScript.onerror = (err) => {
          console.error("Failed to load ReportBro Lib", err);
          reject(new Error('无法加载 ReportBro 库'));
        };
        
        document.head.appendChild(reportBroScript);
      };
      
      jqueryScript.onerror = (err) => {
        console.error("Failed to load jQuery", err);
        reject(new Error('无法加载 jQuery'));
      };
      
      document.head.appendChild(jqueryScript);
    } catch (error) {
      console.error("ReportBro loader error:", error);
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
  }
}
