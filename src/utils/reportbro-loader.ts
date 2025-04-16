
// 用于动态加载ReportBro相关的库
export const loadReportBroLibraries = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      // 添加 jQuery 和 ReportBro 库到全局对象以解决一些依赖问题
      window.$ = window.$ || {};
      window.ReportBro = window.ReportBro || {};
      window.ReportBroDesigner = window.ReportBroDesigner || {};

      // 首先尝试检测是否已经加载过
      if (typeof window.ReportBro === 'function' && typeof window.ReportBroDesigner === 'function') {
        console.log("ReportBro already loaded, skipping load");
        return resolve();
      }

      // 加载ReportBro样式
      loadStylesheet('https://unpkg.com/reportbro-designer@2.0.3/dist/reportbro.css')
        .then(() => loadJQuery())
        .then(() => loadReportBroLib())
        .then(() => loadReportBroDesigner())
        .then(() => {
          // 验证所有组件是否加载完成
          setTimeout(() => {
            if (typeof window.ReportBro === 'function' && typeof window.ReportBroDesigner === 'function') {
              console.log("All ReportBro components verified successfully");
              resolve();
            } else {
              reject(new Error('ReportBro组件加载不完整'));
            }
          }, 500);
        })
        .catch(error => {
          console.error("ReportBro loading chain error:", error);
          reject(error);
        });
    } catch (error) {
      console.error("ReportBro loader error:", error);
      reject(error);
    }
  });
};

// 加载样式表
const loadStylesheet = (url: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    
    link.onload = () => {
      console.log(`Stylesheet loaded: ${url}`);
      resolve();
    };
    
    link.onerror = () => {
      console.warn(`Failed to load stylesheet: ${url}, trying fallback`);
      // 尝试备用CDN
      const fallbackLink = document.createElement('link');
      fallbackLink.rel = 'stylesheet';
      fallbackLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/reportbro-designer/2.0.3/reportbro.min.css';
      
      fallbackLink.onload = () => {
        console.log("Stylesheet loaded from fallback");
        resolve();
      };
      
      fallbackLink.onerror = () => {
        // 即使样式加载失败也继续，因为功能可能仍然正常
        console.warn("Failed to load stylesheet from fallback, continuing anyway");
        resolve();
      };
      
      document.head.appendChild(fallbackLink);
    };
    
    document.head.appendChild(link);
  });
};

// 加载jQuery
const loadJQuery = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    // 如果jQuery已经加载，直接返回
    if (window.$ && typeof window.$ === 'function') {
      console.log("jQuery already loaded");
      return resolve();
    }
    
    const jqueryScript = document.createElement('script');
    jqueryScript.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
    jqueryScript.crossOrigin = 'anonymous';
    
    jqueryScript.onload = () => {
      console.log("jQuery loaded successfully");
      resolve();
    };
    
    jqueryScript.onerror = () => {
      console.warn("Failed to load jQuery from primary source, trying fallback");
      
      // 尝试备用CDN
      const fallbackScript = document.createElement('script');
      fallbackScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js';
      fallbackScript.crossOrigin = 'anonymous';
      
      fallbackScript.onload = () => {
        console.log("jQuery loaded from fallback CDN");
        resolve();
      };
      
      fallbackScript.onerror = () => {
        reject(new Error('无法加载 jQuery'));
      };
      
      document.head.appendChild(fallbackScript);
    };
    
    document.head.appendChild(jqueryScript);
  });
};

// 加载ReportBro库
const loadReportBroLib = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    // 按顺序尝试多个CDN源
    const cdnUrls = [
      'https://unpkg.com/reportbro-lib@2.0.3/dist/reportbro.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/reportbro/2.0.3/reportbro.min.js',
      'https://cdn.jsdelivr.net/npm/reportbro-lib@2.0.3/dist/reportbro.min.js',
      // 尝试一个非常老的可用版本作为最后手段
      'https://cdn.jsdelivr.net/npm/reportbro-lib@1.8.0/dist/reportbro.min.js'
    ];
    
    // 递归尝试加载不同的URL
    const tryLoadScript = (urlIndex: number) => {
      if (urlIndex >= cdnUrls.length) {
        return reject(new Error('无法从任何来源加载 ReportBro 库'));
      }
      
      const script = document.createElement('script');
      script.src = cdnUrls[urlIndex];
      script.crossOrigin = 'anonymous';
      
      script.onload = () => {
        console.log(`ReportBro library loaded successfully from ${cdnUrls[urlIndex]}`);
        resolve();
      };
      
      script.onerror = () => {
        console.warn(`Failed to load ReportBro library from ${cdnUrls[urlIndex]}, trying next source`);
        // 尝试下一个CDN
        tryLoadScript(urlIndex + 1);
      };
      
      document.head.appendChild(script);
    };
    
    // 开始尝试加载
    tryLoadScript(0);
  });
};

// 加载ReportBro设计器
const loadReportBroDesigner = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    // 按顺序尝试多个CDN源
    const cdnUrls = [
      'https://unpkg.com/reportbro-designer@2.0.3/dist/reportbro-designer.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/reportbro-designer/2.0.3/reportbro-designer.min.js',
      'https://cdn.jsdelivr.net/npm/reportbro-designer@2.0.3/dist/reportbro-designer.min.js',
      // 尝试一个非常老的可用版本作为最后手段
      'https://cdn.jsdelivr.net/npm/reportbro-designer@1.8.0/dist/reportbro-designer.min.js'
    ];
    
    // 递归尝试加载不同的URL
    const tryLoadScript = (urlIndex: number) => {
      if (urlIndex >= cdnUrls.length) {
        return reject(new Error('无法从任何来源加载 ReportBro 设计器'));
      }
      
      const script = document.createElement('script');
      script.src = cdnUrls[urlIndex];
      script.crossOrigin = 'anonymous';
      
      script.onload = () => {
        console.log(`ReportBro designer loaded successfully from ${cdnUrls[urlIndex]}`);
        resolve();
      };
      
      script.onerror = () => {
        console.warn(`Failed to load ReportBro designer from ${cdnUrls[urlIndex]}, trying next source`);
        // 尝试下一个CDN
        tryLoadScript(urlIndex + 1);
      };
      
      document.head.appendChild(script);
    };
    
    // 开始尝试加载
    tryLoadScript(0);
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
