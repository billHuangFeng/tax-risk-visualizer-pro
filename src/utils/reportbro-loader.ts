
// 简化并改进模拟实现的本地设计器库
export const loadReportBroLibraries = (): Promise<void> => {
  return new Promise((resolve) => {
    console.log("初始化本地PDF设计器...");
    
    // 如果已经加载了，直接返回成功
    if (window.ReportBro && window.ReportBroDesigner) {
      console.log("本地PDF设计器库已加载，跳过初始化");
      resolve();
      return;
    }
    
    // 创建基础的ReportBro对象
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
      
      ReportBro.prototype.generatePdf = function(data: any) {
        return new Promise((resolve) => {
          console.log("模拟生成PDF...");
          
          // 创建一个简单的PDF blob作为响应
          const pdfContent = "JVBERi0xLjcKJeLjz9MKNSAwIG9iago8PAovRmlsdGVyIC9GbGF0ZURlY29kZQovTGVuZ3RoIDM4Cj4+CnN0cmVhbQp4nCvkMlAwMDDgMjJRMAZiCyDNZchlCOQyNOS64AIySZIFQIkMAGd7Bm0KZW5kc3RyZWFtCmVuZG9iago0IDAgb2JqCjw8Ci9UeXBlIC9QYWdlCi9NZWRpYUJveCBbMCAwIDU5NS4yOCA4NDEuODldCi9SZXNvdXJjZXMgPDwKL0ZvbnQgPDwKL0YxIDEgMCBSCi9GMiAyIDAgUgo+Pgo+PgovQ29udGVudHMgNSAwIFIKL1BhcmVudCAzIDAgUgo+PgplbmRvYmoKMyAwIG9iago8PAovVHlwZSAvUGFnZXMKL0NvdW50IDEKL0tpZHMgWzQgMCBSXQo+PgplbmRvYmoKNiAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMyAwIFIKPj4KZW5kb2JqCjcgMCBvYmoKPDwKL1Byb2R1Y2VyIChMb3ZhYmxlIFBERiBHZW5lcmF0b3IpCi9DcmVhdGlvbkRhdGUgKEQ6MjAyNTA0MTYpCj4+CmVuZG9iagp4cmVmCjAgOAowMDAwMDAwMDAwIDY1NTM1IGYNCjAwMDAwMDAwMDAgMDAwMDAgbg0KMDAwMDAwMDAwMCAwMDAwMCBuDQowMDAwMDAwMjI0IDAwMDAwIG4NCjAwMDAwMDAwODcgMDAwMDAgbg0KMDAwMDAwMDAwOSAwMDAwMCBuDQowMDAwMDAwMjgxIDAwMDAwIG4NCjAwMDAwMDAzMzAgMDAwMDAgbg0KdHJhaWxlcgo8PAovU2l6ZSA4Ci9Sb290IDYgMCBSCi9JbmZvIDcgMCBSCj4+CnN0YXJ0eHJlZgozOTkKJSVFT0YK";
          const byteCharacters = atob(pdfContent);
          const byteArrays = [];
          
          for (let offset = 0; offset < byteCharacters.length; offset += 512) {
            const slice = byteCharacters.slice(offset, offset + 512);
            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
              byteNumbers[i] = slice.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
          }
          
          const blob = new Blob(byteArrays, {type: 'application/pdf'});
          setTimeout(() => resolve(blob), 500); // 模拟处理时间
        });
      };
      
      return ReportBro;
    }();
    
    // 创建简化版的ReportBroDesigner
    window.ReportBroDesigner = function() {
      function ReportBroDesigner(element: HTMLElement, options: any, reportDefinition: any) {
        if (!element || !document.body.contains(element)) {
          console.error("Designer初始化失败: 容器元素不存在或不在DOM中");
          throw new Error("容器元素无效");
        }

        this.element = element;
        this.options = options || {};
        this.reportDefinition = reportDefinition || { 
          docElements: [], 
          parameters: [], 
          styles: [],
          version: "1.0"
        };
        this.report = new window.ReportBro(this.reportDefinition);
        
        // 立即设置设计器UI
        this.setupDesigner();
      }
      
      // 简化设计器UI设置逻辑
      ReportBroDesigner.prototype.setupDesigner = function() {
        if (!this.element || !document.body.contains(this.element)) {
          console.error("设计器设置失败: 容器元素不存在或不在DOM中");
          return;
        }
        
        // 清空容器
        this.element.innerHTML = '';
        
        // 创建一个简单的设计器界面
        const container = document.createElement('div');
        container.className = 'rb-designer-container';
        container.style.display = 'flex';
        container.style.flexDirection = 'column';
        container.style.height = '100%';
        container.style.width = '100%';
        container.style.backgroundColor = '#fff';
        container.style.padding = '20px';
        container.style.borderRadius = '8px';
        
        // 创建标题
        const header = document.createElement('div');
        header.style.marginBottom = '20px';
        header.innerHTML = '<h3 style="margin: 0 0 8px 0; font-size: 16px;">PDF模板设计器</h3>' + 
                            '<p style="margin: 0; color: #666; font-size: 14px;">您可以添加和布局PDF报表中的元素</p>';
        
        // 创建工具面板
        const toolbar = document.createElement('div');
        toolbar.style.display = 'flex';
        toolbar.style.gap = '8px';
        toolbar.style.marginBottom = '16px';
        
        // 添加一些工具按钮
        const tools = ['文本', '表格', '图片', '形状'];
        tools.forEach(tool => {
          const btn = document.createElement('button');
          btn.textContent = tool;
          btn.style.padding = '6px 12px';
          btn.style.border = '1px solid #e0e0e0';
          btn.style.borderRadius = '4px';
          btn.style.backgroundColor = '#f8f8f8';
          btn.style.cursor = 'pointer';
          toolbar.appendChild(btn);
        });
        
        // 创建主内容区域
        const content = document.createElement('div');
        content.style.flex = '1';
        content.style.border = '1px dashed #ccc';
        content.style.borderRadius = '4px';
        content.style.backgroundColor = '#fcfcfc';
        content.style.display = 'flex';
        content.style.alignItems = 'center';
        content.style.justifyContent = 'center';
        content.innerHTML = '<p style="color: #999; font-size: 14px;">在此区域拖放元素以设计PDF模板</p>';
        
        // 添加所有元素到容器
        container.appendChild(header);
        container.appendChild(toolbar);
        container.appendChild(content);
        this.element.appendChild(container);
        
        console.log("设计器界面设置完成");
      };
      
      ReportBroDesigner.prototype.getReport = function() {
        return this.report.getReport();
      };
      
      ReportBroDesigner.prototype.destroy = function() {
        try {
          if (this.element) {
            this.element.innerHTML = '';
          }
        } catch (e) {
          console.error("销毁设计器出错:", e);
        }
      };
      
      return ReportBroDesigner;
    }();
    
    console.log("本地PDF设计器库初始化完成");
    
    // 异步解析以模拟库加载
    setTimeout(resolve, 0);
  });
};

// 声明全局对象以便TypeScript识别
declare global {
  interface Window {
    ReportBro: any;
    ReportBroDesigner: any;
  }
}
