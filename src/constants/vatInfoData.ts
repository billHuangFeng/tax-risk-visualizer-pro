import { TaxInfoData } from '@/types/calculator';

const vatInfoData: TaxInfoData = {
  outputTax: {
    title: "销项税额",
    description: "企业在销售货物、提供应税劳务和服务时收取的增值税额",
    analysis: "销项税额越高，说明销售额和税率越高，需要注意销售额与销项税额是否匹配",
    risk: "销项税额与实际收入不匹配可能导致税务风险，建议确保开票金额与实际收入一致"
  },
  inputTax: {
    title: "进项税额",
    description: "企业在购进货物、接受应税劳务和服务时支付的增值税额",
    analysis: "进项税额是企业可以抵扣的税额，直接影响最终应纳税额",
    risk: "进项税额过高或与实际采购不符可能引起税务机关关注，确保所有抵扣凭证合规"
  },
  payableTax: {
    title: "应交增值税",
    description: "销项税额减去进项税额后的差额，即企业实际需要缴纳的增值税额",
    analysis: "应交增值税为负数表示留抵税额，可以在下期继续抵扣",
    risk: "应交增值税与实际缴纳税款差异过大需要合理解释，否则可能面临税务稽查"
  },
  actualTax: {
    title: "实缴增值税",
    description: "企业实际缴纳的增值税额，可能与理论应交增值税有差异",
    analysis: "实缴税额低于应交税额可能是因为享受了税收优惠或有留抵税额",
    risk: "无法解释的实缴税额与应交税额差异可能导致补税、滞纳金甚至处罚"
  },
  taxDifference: {
    title: "增值税差异",
    description: "理论应交增值税与实际缴纳增值税之间的差额",
    analysis: "差异产生的原因可能是税收优惠、留抵税额或税务处理不当",
    risk: "无法解释的税额差异会增加税务风险，建议详细分析差异原因"
  },
  bankSalesAmount: {
    title: "银行收款金额",
    description: "企业银行账户收到的销售款项总额",
    analysis: "银行收款金额与开票销售额的比较可反映销售真实性",
    risk: "银行收款明显低于开票销售额可能表明虚开增值税发票的风险"
  },
  bankPurchasesAmount: {
    title: "银行采购付款",
    description: "企业通过银行支付的采购款项总额",
    analysis: "银行采购付款与进项抵扣的比较可反映采购真实性",
    risk: "银行付款明显低于进项抵扣可能表明虚假采购的风险"
  },
  differenceFactors: {
    title: "差异因素分析",
    description: "分析增值税差异的具体原因和金额",
    analysis: "通过列举各种差异因素，可以更好地解释税款差异",
    risk: "未能解释的差异将增加税务风险，建议进行全面分析"
  },
  unexplainedDifference: {
    title: "未解释差异",
    description: "扣除已知差异因素后仍无法解释的税款差异",
    analysis: "未解释差异越小，表明对税款差异的理解越充分",
    risk: "大额未解释差异将显著增加税务风险，需要重点关注"
  },
  salesCollectionDifference: {
    title: "销售与收款差异",
    description: "销售额(含税)与银行实际收款金额的差异",
    analysis: "差异金额 = 销售额(不含税) + 销项税 - 银行收款金额",
    risk: "较大差异可能表明存在销售收入未入账或收款未开具发票等风险"
  },
  riskAssessment: {
    title: "增值税风险评估",
    description: "系统基于多个维度对企业的增值税申报进行风险评估，包括：\n1. 应纳税额与实缴税额的差异\n2. 销项税额与收款金额的匹���度\n3. 进项税额与付款金额的匹配度",
    analysis: "风险评估百分比计算方法：\n1. 基数 = Max(应交增值税, 销项税额×10%)\n2. 风险百分比 = |应交增值税 - 实缴增值税| ÷ 基数 × 100%\n\n风险等级划分：\n- 超过50%：风险非常高\n- 超过20%：风险比较高\n- 超过10%：存在风险\n- 10%以下：基本安全",
    risk: "1. 高风险提示：税款差异过大可能导致税务稽查\n2. 中风险提示：需要准备充分的差异说明材料\n3. 低风险提示：建议定期自查，保持合规经营"
  }
};

export default vatInfoData;
