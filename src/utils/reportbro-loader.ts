
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
      reportBroStyle.href = 'https://unpkg.com/reportbro-designer@2.0.3/dist/reportbro.css';
      document.head.appendChild(reportBroStyle);

      // 加载jQuery (ReportBro依赖)
      const jqueryScript = document.createElement('script');
      jqueryScript.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
      
      jqueryScript.onload = () => {
        console.log("jQuery loaded successfully");
        
        // 加载ReportBro库 - 使用unpkg作为备用CDN
        const reportBroScript = document.createElement('script');
        reportBroScript.src = 'https://unpkg.com/reportbro-lib@2.0.3/dist/reportbro.min.js';
        reportBroScript.crossOrigin = 'anonymous';
        
        reportBroScript.onload = () => {
          console.log("ReportBro library loaded successfully");
          
          // 加载ReportBro Designer
          const designerScript = document.createElement('script');
          designerScript.src = 'https://unpkg.com/reportbro-designer@2.0.3/dist/reportbro-designer.min.js';
          designerScript.crossOrigin = 'anonymous';
          
          designerScript.onload = () => {
            console.log("ReportBro Designer loaded successfully");
            // 确保所有脚本都已完全加载
            setTimeout(() => {
              // 验证ReportBro是否正确加载
              if (window.ReportBro && window.ReportBroDesigner) {
                console.log("All ReportBro components verified");
                resolve();
              } else {
                reject(new Error('ReportBro组件加载不完整'));
              }
            }, 500);
          };
          
          designerScript.onerror = (err) => {
            console.error("Failed to load ReportBro Designer", err);
            
            // 尝试第二个CDN源
            const fallbackScript = document.createElement('script');
            fallbackScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/reportbro-designer/2.0.3/reportbro-designer.min.js';
            fallbackScript.crossOrigin = 'anonymous';
            
            fallbackScript.onload = () => {
              console.log("ReportBro Designer loaded from fallback CDN");
              setTimeout(() => resolve(), 500);
            };
            
            fallbackScript.onerror = () => {
              reject(new Error('无法加载 ReportBro 设计器'));
            };
            
            document.head.appendChild(fallbackScript);
          };
          
          document.head.appendChild(designerScript);
        };
        
        reportBroScript.onerror = (err) => {
          console.error("Failed to load ReportBro Lib", err);
          
          // 尝试第二个CDN源
          const fallbackScript = document.createElement('script');
          fallbackScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/reportbro/2.0.3/reportbro.min.js';
          fallbackScript.crossOrigin = 'anonymous';
          
          fallbackScript.onload = () => {
            console.log("ReportBro library loaded from fallback CDN");
            
            // 继续加载设计器
            const designerScript = document.createElement('script');
            designerScript.src = 'https://unpkg.com/reportbro-designer@2.0.3/dist/reportbro-designer.min.js';
            
            designerScript.onload = () => {
              console.log("ReportBro Designer loaded successfully");
              setTimeout(() => resolve(), 500);
            };
            
            designerScript.onerror = () => {
              reject(new Error('无法加载 ReportBro 设计器'));
            };
            
            document.head.appendChild(designerScript);
          };
          
          fallbackScript.onerror = () => {
            reject(new Error('无法加载 ReportBro 库'));
          };
          
          document.head.appendChild(fallbackScript);
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
