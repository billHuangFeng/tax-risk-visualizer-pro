import { Template } from '@pdfme/generator';
import { PdfTemplate } from '@/types/pdfTemplates';

export const DEFAULT_TEMPLATES: PdfTemplate[] = [
  {
    id: 'default-tax-report',
    name: '默认税务报告模板',
    baseTemplate: undefined, // 可以添加基础PDF模板路径
    schemas: [
      {
        companyName: {
          type: 'text',
          position: { x: 50, y: 50 },
          width: 100,
          height: 10,
        },
        totalRevenue: {
          type: 'text',
          position: { x: 50, y: 70 },
          width: 100,
          height: 10,
        },
        // 添加更多字段定义
      }
    ],
    styles: {
      fontFamily: 'SimSun, serif',
      headingStyle: {
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#000000',
        borderBottom: '1px solid #000',
        marginBottom: '16px'
      },
      tableStyle: {
        headerBgColor: '#f5f5f5',
        borderColor: '#000',
        cellPadding: '8px'
      },
      formFieldStyle: {
        labelColor: '#333',
        borderColor: '#ccc',
        padding: '4px 8px'
      },
      layout: {
        pageMargin: '40px',
        sectionSpacing: '20px'
      }
    },
    layout: {
      sections: [
        {
          id: 'basic-info',
          type: 'basic-info',
          title: '基本信息',
          visible: true,
          fields: [
            {
              id: 'company-name',
              sourceField: 'companyName',
              type: 'text',
              visible: true
            },
            {
              id: 'total-assets',
              sourceField: 'totalAssets',
              type: 'number',
              visible: true,
              prefix: '¥',
              style: {
                alignment: 'right'
              }
            }
          ]
        },
        {
          id: 'revenue-expenses',
          type: 'revenue-expenses',
          title: '收入与支出',
          visible: true,
          fields: []
        },
        {
          id: 'tax-adjustments',
          type: 'tax-adjustments',
          title: '税务调整',
          visible: true,
          fields: []
        },
        {
          id: 'tax-summary',
          type: 'tax-summary',
          title: '税务总结',
          visible: true,
          fields: [
            {
              id: 'risk-percentage',
              sourceField: 'riskPercentage',
              type: 'number',
              visible: true,
              suffix: '%',
              style: {
                fontWeight: 'bold',
                color: '#ff0000'
              }
            }
          ]
        }
      ]
    }
  }
];
