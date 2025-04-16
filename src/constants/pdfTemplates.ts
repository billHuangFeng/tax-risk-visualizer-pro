import { PdfTemplate } from "@/types/pdfTemplates";

const defaultLayout = {
  sections: [
    {
      id: "basic-info",
      type: "basic-info",
      title: "基本信息",
      visible: true,
      order: 1,
      fields: [
        { id: "companyName", type: "text", label: "公司名称", visible: true, sourceField: "companyName" },
        { id: "employeeCount", type: "number", label: "员工数量", visible: true, sourceField: "employeeCount" },
        { id: "highTechEnterprise", type: "checkbox", label: "高新技术企业", visible: true, sourceField: "isHighTech" }
      ]
    },
    {
      id: "revenue-expenses",
      type: "revenue-expenses",
      title: "收入支出",
      visible: true,
      order: 2,
      fields: [
        { id: "totalRevenue", type: "number", label: "总收入", visible: true, sourceField: "totalRevenue" },
        { id: "totalExpenses", type: "number", label: "总支出", visible: true, sourceField: "totalExpenses" }
      ]
    },
    {
      id: "tax-summary",
      type: "tax-summary",
      title: "税务总结",
      visible: true,
      order: 3,
      fields: [
        { id: "taxRate", type: "number", label: "适用税率", visible: true, sourceField: "taxRate" },
        { id: "taxAmount", type: "number", label: "应纳税额", visible: true, sourceField: "taxAmount" }
      ]
    }
  ]
};

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
      layout: defaultLayout
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
      layout: defaultLayout
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
      layout: defaultLayout
    }
  }
];
