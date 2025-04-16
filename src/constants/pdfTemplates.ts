
import { PdfTemplate } from "@/types/pdfTemplates";

export const DEFAULT_TEMPLATES: PdfTemplate[] = [
  {
    id: "classic",
    name: "经典模板",
    description: "简洁清晰的专业税务报告模板",
    styles: {
      fontFamily: "SimSun, serif",
      headingStyle: {
        fontSize: "16px",
        fontWeight: "bold",
        color: "#000000",
        borderBottom: "1px solid #000",
        marginBottom: "16px"
      },
      tableStyle: {
        borderColor: "#000000",
        headerBgColor: "#f5f5f5",
        cellPadding: "8px"
      },
      formFieldStyle: {
        borderColor: "#000000",
        padding: "4px 8px",
        labelColor: "#000000"
      },
      layout: {
        pageMargin: "40px",
        sectionSpacing: "24px"
      }
    }
  },
  {
    id: "modern",
    name: "现代模板",
    description: "现代设计风格的税务报告模板",
    styles: {
      fontFamily: "Microsoft YaHei, sans-serif",
      headingStyle: {
        fontSize: "18px",
        fontWeight: "bold",
        color: "#333333",
        borderBottom: "2px solid #8B5CF6",
        marginBottom: "20px"
      },
      tableStyle: {
        borderColor: "#dddddd",
        headerBgColor: "#8B5CF6",
        cellPadding: "10px"
      },
      formFieldStyle: {
        borderColor: "#dddddd",
        padding: "6px 10px",
        labelColor: "#555555"
      },
      layout: {
        pageMargin: "30px",
        sectionSpacing: "30px"
      }
    }
  },
  {
    id: "minimal",
    name: "简约模板",
    description: "极简风格的财税报告模板",
    styles: {
      fontFamily: "SimHei, sans-serif",
      headingStyle: {
        fontSize: "14px",
        fontWeight: "normal",
        color: "#666666",
        borderBottom: "1px dotted #cccccc",
        marginBottom: "12px"
      },
      tableStyle: {
        borderColor: "#eeeeee",
        headerBgColor: "#f9f9f9",
        cellPadding: "6px"
      },
      formFieldStyle: {
        borderColor: "#eeeeee",
        padding: "3px 6px",
        labelColor: "#888888"
      },
      layout: {
        pageMargin: "20px",
        sectionSpacing: "16px"
      }
    }
  }
];
