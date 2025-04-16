
// 用于动态加载ReportBro相关的库
export const loadReportBroLibraries = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      // 加载ReportBro样式
      const reportBroStyle = document.createElement('link');
      reportBroStyle.rel = 'stylesheet';
      reportBroStyle.href = 'https://cdn.jsdelivr.net/npm/reportbro-designer@3.2.0/dist/reportbro-designer.css';
      document.head.appendChild(reportBroStyle);

      // 加载jQuery (ReportBro依赖)
      const jqueryScript = document.createElement('script');
      jqueryScript.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
      jqueryScript.onload = () => {
        // 加载ReportBro库
        const reportBroScript = document.createElement('script');
        reportBroScript.src = 'https://cdn.jsdelivr.net/npm/reportbro-lib@3.2.0/dist/reportbro-lib.min.js';
        reportBroScript.onload = () => {
          // 加载ReportBro Designer
          const designerScript = document.createElement('script');
          designerScript.src = 'https://cdn.jsdelivr.net/npm/reportbro-designer@3.2.0/dist/reportbro-designer.min.js';
          designerScript.onload = () => {
            // 所有库加载完成
            console.log("ReportBro libraries loaded successfully");
            resolve();
          };
          designerScript.onerror = (err) => reject(new Error('Failed to load ReportBro Designer'));
          document.head.appendChild(designerScript);
        };
        reportBroScript.onerror = (err) => reject(new Error('Failed to load ReportBro Lib'));
        document.head.appendChild(reportBroScript);
      };
      jqueryScript.onerror = (err) => reject(new Error('Failed to load jQuery'));
      document.head.appendChild(jqueryScript);
    } catch (error) {
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
