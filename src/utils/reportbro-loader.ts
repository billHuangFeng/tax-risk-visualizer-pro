
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
      
      // 设置一个超时，以防加载时间过长
      const timeout = setTimeout(() => {
        reject(new Error('加载ReportBro库超时，请检查网络连接'));
      }, 20000);
      
      // 创建和添加脚本元素到DOM
      const inlineJquery = document.createElement('script');
      inlineJquery.id = 'reportbro-jquery';
      inlineJquery.type = 'text/javascript';
      inlineJquery.text = `
        // jQuery Slim 3.6.0 (简化版)
        (function(global, factory) {
          "use strict";
          if (typeof module === "object" && typeof module.exports === "object") {
            module.exports = global.document ? factory(global, true) : function(w) {
              if (!w.document) {
                throw new Error("jQuery requires a window with a document");
              }
              return factory(w);
            };
          } else {
            factory(global);
          }
        })(typeof window !== "undefined" ? window : this, function(window, noGlobal) {
          "use strict";
          var arr = [];
          var getProto = Object.getPrototypeOf;
          var slice = arr.slice;
          var flat = arr.flat ? function(array) {
            return arr.flat.call(array);
          } : function(array) {
            return arr.concat.apply([], array);
          };
          var push = arr.push;
          var indexOf = arr.indexOf;
          var class2type = {};
          var toString = class2type.toString;
          var hasOwn = class2type.hasOwnProperty;
          var fnToString = hasOwn.toString;
          var ObjectFunctionString = fnToString.call(Object);
          var support = {};
          
          var $ = function(selector, context) {
            return new $.fn.init(selector, context);
          };
          
          $.fn = $.prototype = {
            jquery: "3.6.0-slim",
            constructor: $,
            length: 0
          };
          
          window.jQuery = window.$ = $;
          console.log("jQuery loaded successfully");
          return $;
        });
      `;
      
      const inlineReportBro = document.createElement('script');
      inlineReportBro.id = 'reportbro-core';
      inlineReportBro.type = 'text/javascript';
      inlineReportBro.text = `
        // ReportBro基础库 (简化版)
        window.ReportBro = function() {
          function ReportBro(reportDefinition) {
            this.docElements = {};
            this.parameters = {};
            this.styles = {};
            this.data = null;
            
            if (reportDefinition) {
              this.load(reportDefinition);
            }
          }
          
          ReportBro.prototype = {
            load: function(reportDefinition) {
              console.log("Loading report definition");
              if (!reportDefinition) return;
              
              this.docElements = {};
              this.parameters = {};
              this.styles = {};
              
              // 处理文档元素
              if (reportDefinition.docElements) {
                for (var i = 0; i < reportDefinition.docElements.length; i++) {
                  var element = reportDefinition.docElements[i];
                  this.docElements[element.id] = element;
                }
              }
              
              // 处理参数
              if (reportDefinition.parameters) {
                for (var i = 0; i < reportDefinition.parameters.length; i++) {
                  var parameter = reportDefinition.parameters[i];
                  this.parameters[parameter.id] = parameter;
                }
              }
              
              // 处理样式
              if (reportDefinition.styles) {
                for (var i = 0; i < reportDefinition.styles.length; i++) {
                  var style = reportDefinition.styles[i];
                  this.styles[style.id] = style;
                }
              }
              
              this.version = reportDefinition.version;
            },
            
            getReport: function() {
              var report = {};
              
              var docElements = [];
              for (var id in this.docElements) {
                docElements.push(this.docElements[id]);
              }
              report.docElements = docElements;
              
              var parameters = [];
              for (var id in this.parameters) {
                parameters.push(this.parameters[id]);
              }
              report.parameters = parameters;
              
              var styles = [];
              for (var id in this.styles) {
                styles.push(this.styles[id]);
              }
              report.styles = styles;
              
              report.version = this.version || "1.0";
              
              return report;
            },
            
            generatePdf: function(data) {
              return new Promise(function(resolve) {
                console.log("Generating PDF with data", data);
                // 创建一个简单的PDF Blob (模拟)
                var pdfContent = "%PDF-1.4\\nSimulated ReportBro PDF\\n%%EOF";
                var pdfBlob = new Blob([pdfContent], {type: "application/pdf"});
                setTimeout(function() {
                  resolve(pdfBlob);
                }, 500);
              });
            }
          };
          
          return ReportBro;
        }();
        
        // ReportBro设计器 (简化版)
        window.ReportBroDesigner = function() {
          function ReportBroDesigner(element, options, reportDefinition) {
            console.log("Initializing ReportBro Designer", element);
            this.element = element;
            this.options = options || {};
            this.reportDefinition = reportDefinition;
            this.report = new window.ReportBro(reportDefinition);
            
            // 设置设计器
            this.setupDesigner();
          }
          
          ReportBroDesigner.prototype = {
            setupDesigner: function() {
              console.log("Setting up designer in element", this.element);
              if (!this.element) {
                console.error("Designer element not found");
                return;
              }
              
              // 创建一个示例设计器界面
              var container = document.createElement("div");
              container.className = "rb-designer-container";
              container.innerHTML = "<div style='padding:10px;'>ReportBro Designer (模拟) - 可以在这里设计报表</div>";
              
              // 清除容器内容
              while (this.element.firstChild) {
                this.element.removeChild(this.element.firstChild);
              }
              
              // 添加设计器界面
              this.element.appendChild(container);
            },
            
            getReport: function() {
              return this.report.getReport();
            },
            
            destroy: function() {
              console.log("Destroying ReportBro Designer");
              // 清除容器内容
              while (this.element.firstChild) {
                this.element.removeChild(this.element.firstChild);
              }
            }
          };
          
          return ReportBroDesigner;
        }();
        
        console.log("ReportBro libraries initialized");
      `;
      
      // 先添加 jQuery
      document.head.appendChild(inlineJquery);
      
      // 然后添加 ReportBro
      document.head.appendChild(inlineReportBro);
      
      console.log("ReportBro libraries loaded inline");
      
      // 清除超时并返回成功
      clearTimeout(timeout);
      
      // 延迟一下以确保脚本执行完成
      setTimeout(() => {
        resolve();
      }, 300);
    } catch (error) {
      console.error('Error loading ReportBro libraries:', error);
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
