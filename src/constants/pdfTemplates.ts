
import { PdfTemplate } from '@/types/pdfTemplates';

export const DEFAULT_TEMPLATES: PdfTemplate[] = [
  {
    id: 'default-tax-report',
    name: '默认税务报告模板',
    description: '标准税务计算报告模板',
    baseTemplate: undefined,
    schemas: [
      [
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
          invoicedRevenue: {
            type: 'text',
            position: { x: 50, y: 90 },
            width: 100,
            height: 10,
          },
          taxableIncome: {
            type: 'text',
            position: { x: 50, y: 110 },
            width: 100,
            height: 10,
          },
          actualTax: {
            type: 'text',
            position: { x: 50, y: 130 },
            width: 100,
            height: 10,
          },
          riskPercentage: {
            type: 'text',
            position: { x: 50, y: 150 },
            width: 100, 
            height: 10,
          }
        }
      ]
    ],
    styles: {
      fontFamily: 'SimSun, serif',
      headingStyle: {
        fontSize: '16px',
        fontWeight: 'normal',
        color: '#000000',
        borderBottom: 'none',
        marginBottom: '16px'
      },
      tableStyle: {
        headerBgColor: '#ffffff',
        borderColor: '#000',
        cellPadding: '8px'
      },
      formFieldStyle: {
        labelColor: '#000',
        borderColor: '#000',
        padding: '4px 8px'
      },
      layout: {
        pageMargin: '40px',
        sectionSpacing: '24px'
      }
    },
    layout: {
      sections: [
        {
          id: 'basic-info',
          type: 'basic-info',
          title: '',
          visible: true,
          order: 1,
          fields: [
            {
              id: 'company-name',
              sourceField: 'companyName',
              type: 'text',
              visible: true,
              label: '企业名称'
            },
            {
              id: 'total-assets',
              sourceField: 'totalAssets',
              type: 'number',
              visible: true,
              suffix: '万元',
              label: '资产总额'
            },
            {
              id: 'employee-count',
              sourceField: 'employeeCount',
              type: 'number',
              visible: true,
              suffix: '人',
              label: '发薪资、劳务费的员工人数'
            }
          ]
        },
        {
          id: 'revenue-expenses',
          type: 'revenue-expenses',
          title: '',
          visible: true,
          order: 2,
          fields: [
            {
              id: 'total-revenue',
              sourceField: 'totalRevenue',
              type: 'number',
              visible: true,
              suffix: '万元',
              label: '销售收入（不含销项税）'
            },
            {
              id: 'invoiced-revenue',
              sourceField: 'invoicedRevenue',
              type: 'number',
              visible: true,
              suffix: '万元',
              label: '其中：已开票'
            },
            {
              id: 'uninvoiced-revenue',
              sourceField: 'uninvoicedRevenue',
              type: 'number',
              visible: true,
              suffix: '万元',
              label: '不需要的开票'
            },
            {
              id: 'future-invoice-revenue',
              sourceField: 'futureInvoiceRevenue',
              type: 'number',
              visible: true,
              suffix: '万元',
              label: '暂未开票的销售额'
            }
          ]
        },
        {
          id: 'expenses',
          type: 'expenses',
          title: '',
          visible: true,
          order: 3,
          fields: [
            {
              id: 'total-expenses',
              sourceField: 'totalExpenses',
              type: 'number',
              visible: true,
              suffix: '万元',
              label: '成本费用（不含可抵扣进项税）'
            },
            {
              id: 'invoiced-expenses',
              sourceField: 'invoicedExpenses',
              type: 'number',
              visible: true,
              suffix: '万元',
              label: '其中：有发票的'
            },
            {
              id: 'uninvoiced-expenses',
              sourceField: 'uninvoicedExpenses',
              type: 'number',
              visible: true,
              suffix: '万元',
              label: '没有发票的'
            },
            {
              id: 'depreciation',
              sourceField: 'depreciation',
              type: 'number',
              visible: true,
              suffix: '万元',
              label: '资产的折旧/摊销'
            },
            {
              id: 'social-insurance',
              sourceField: 'socialInsurance',
              type: 'number',
              visible: true,
              suffix: '万元',
              label: '社保'
            },
            {
              id: 'other-expenses',
              sourceField: 'otherExpenses',
              type: 'number',
              visible: true,
              suffix: '万元',
              label: '其他'
            }
          ]
        },
        {
          id: 'tax-adjustments',
          type: 'tax-adjustments',
          title: '企业所得税前调增/调减',
          visible: true,
          order: 4,
          fields: [
            {
              id: 'rd-expenses',
              sourceField: 'rdExpenses',
              type: 'number',
              visible: true,
              suffix: '万元',
              label: '可加计扣除的研发费用'
            },
            {
              id: 'entertainment-expenses',
              sourceField: 'entertainmentExpenses',
              type: 'number',
              visible: true,
              suffix: '万元',
              label: '超标准的业务招待费'
            },
            {
              id: 'advertising-expenses',
              sourceField: 'advertisingExpenses',
              type: 'number',
              visible: true,
              suffix: '万元',
              label: '广告费和业务宣传费'
            },
            {
              id: 'education-expenses',
              sourceField: 'educationExpenses',
              type: 'number',
              visible: true,
              suffix: '万元',
              label: '职工教育经费'
            },
            {
              id: 'welfare-expenses',
              sourceField: 'welfareExpenses',
              type: 'number',
              visible: true,
              suffix: '万元',
              label: '职工福利费'
            },
            {
              id: 'insurance-expenses',
              sourceField: 'insuranceExpenses',
              type: 'number',
              visible: true,
              suffix: '万元',
              label: '补充养老保险和补充医疗保险支出'
            }
          ]
        },
        {
          id: 'tax-calculation',
          type: 'tax-calculation',
          title: '企业所得税',
          visible: true,
          order: 5,
          fields: [
            {
              id: 'taxable-income',
              sourceField: 'taxableIncome',
              type: 'number',
              visible: true,
              suffix: '万元',
              label: '应纳税所得额'
            },
            {
              id: 'tax-rate',
              sourceField: 'taxRate',
              type: 'number',
              visible: true,
              suffix: '%',
              label: '适用税率'
            },
            {
              id: 'theoretical-tax',
              sourceField: 'theoreticalTax',
              type: 'number',
              visible: true,
              suffix: '万元',
              label: '理论应缴企业所得税'
            },
            {
              id: 'actual-tax',
              sourceField: 'actualTax',
              type: 'number',
              visible: true,
              suffix: '万元',
              label: '实际申报企业所得税'
            },
            {
              id: 'risk-amount',
              sourceField: 'riskAmount',
              type: 'number',
              visible: true,
              suffix: '万元',
              label: '风险差值 = | 理论应纳税额 - 实际申报税额 |'
            }
          ]
        }
      ]
    }
  }
];
