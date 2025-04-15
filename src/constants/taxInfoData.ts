const taxInfoData = {
  rdExpenses: {
    title: "研发费用",
    description: "企业为开发新技术、新产品、新工艺所发生的研究与开发费用",
    analysis: "研发费用可以享受加计扣除政策，对企业减轻税负有重要作用",
    risk: "研发费用加计扣除比例过高可能引起税务机关关注，建议保留详细的研发项目文档"
  },
  entertainmentExpenses: {
    title: "业务招待费",
    description: "企业发生的与经营活动相关的业务招待支出",
    analysis: "业务招待费超出税法规定限额的部分不得在税前扣除，需要调增应纳税所得额",
    risk: "业务招待费超标是税务稽查的常见关注点，建议严格控制在收入的0.5%以内"
  },
  taxableIncome: {
    title: "应纳税所得额",
    description: "企业所得税的计税依据，计算公式为收入总额减去不征税收入、免税收入、各项扣除以及弥补以前年度亏损后的余额",
    analysis: "应纳税所得额的计算是企业所得税申报的核心，直接关系到企业税负",
    risk: "与行业平均水平差异过大可能引起税务机关关注，建议定期对标行业水平"
  },
  theoreticalTax: {
    title: "理论应纳企业所得税",
    description: "根据应纳税所得额和适用税率计算出的理论上应缴纳的企业所得税金额",
    analysis: "反映了企业在正常情况下的税负水平，是评估纳税风险的基准值",
    risk: "实际申报税额与理论应纳税额差异过大，会增加税务风险"
  },
  actualTax: {
    title: "实际申报企业所得税",
    description: "企业实际在企业所得税纳税申报表中填报并缴纳的所得税金额",
    analysis: "实际申报税额过低可能是享受了税收优惠政策，或存在税务风险",
    risk: "如果无法说明实际申报税额低于理论税额的合理原因，可能面临税务稽查风险"
  },
  riskValue: {
    title: "风险差值",
    description: "理论应纳税额与实际申报税额的绝对差值",
    analysis: "差值越大，表示企业税务申报与理论计算的差距越大",
    risk: "差值超过理论税额30%的企业，建议进行税务自查，并确保所有税收优惠政策都有充分的政策依据和完备的资料"
  },
  nonInvoicedRevenue: {
    title: "不需要开票的收入",
    description: "不需要开具发票的收入，包括按规定无需开具发票的政府性基金、补贴等",
    analysis: "此类收入通常有专门的税务处理规定，需要详细了解相关政策",
    risk: "若误将应税收入归类为不需开票收入，可能导致税务风险"
  },
  newInvoicedRevenue: {
    title: "暂时没开票的收入",
    description: "尚未开具发票的应税收入，包括已确认但未开票的销售收入",
    analysis: "企业应在规定期限内开具发票，否则可能面临税务处罚",
    risk: "长期未开票收入过高，可能引起税务机关关注，建议及时开具发票"
  },
  invoicedExpenses: {
    title: "有发票的支出",
    description: "取得合规发票的各项成本费用支出，是企业税前扣除的重要依据",
    analysis: "合规发票是企业所得税税前扣除的重要凭证，对降低企业税负有重要作用",
    risk: "发票真实性存疑或不符合税法规定的发票可能被税务机关否认扣除"
  },
  nonInvoicedExpenses: {
    title: "没有发票的支出",
    description: "未取得合规发票的各项成本费用支出，税前扣除需满足特定条件",
    analysis: "无票支出通常需要特殊的税务处理，如工资薪金支出、特定政府收费等",
    risk: "无票支出过高或缺乏充分证据，可能导致税前扣除被否认，增加税务风险"
  },
  totalAssets: {
    title: "资产总额",
    description: "企业拥有或控制的全部资产价值总和，是判断小型微利企业的重要指标之一",
    analysis: "资产总额是企业规模的重要指标，对税收优惠政策的适用有直接影响",
    risk: "资产规模变化可能导致企业税收优惠资格的变更，应及时关注政策动态"
  },
  employeeCount: {
    title: "员工人数",
    description: "企业聘用并发放薪资的员工总数，是判断小型微利企业的重要指标之一",
    analysis: "员工人数是企业规模的重要指标，对税收优惠政策的适用有直接影响",
    risk: "员工人数变化可能导致企业税收优惠资格的变更，应及时关注政策动态"
  },
  nonDeductibleExpenses: {
    title: "没有发票不能税前扣除的费用",
    description: "无法取得合规发票且不符合特殊规定的支出，不得在税前扣除",
    analysis: "这类支出将全额调增应纳税所得额，增加企业所得税负担",
    risk: "金额较大时将显著增加税负，建议加强发票管理，规范支出凭证"
  },
  totalRevenue: {
    title: "销售收入",
    description: "企业在一个纳税年度内取得的全部营业收入，包括已开票收入、未开票收入和不需要开票的收入",
    analysis: "销售收入是企业规模和经营状况的重要指标，也是判断小型微利企业资格的依据之一",
    risk: "销售收入异常波动或与行业平均水平差异过大，可能引起税务机关关注"
  },
  personalTax: {
    title: "个人所得税",
    description: "企业为员工代扣代缴的个人所得税总额",
    analysis: "个人所得税的代扣代缴是企业的法定义务，合理的个税支出反映了企业的人力成本结构",
    risk: "个税申报金额异常或与工资薪金不匹配，可能引发税务稽查"
  },
  socialSecurity: {
    title: "社保公积金",
    description: "企业为员工缴纳的社会保险费和住房公积金总额",
    analysis: "社保公积金是法定福利支出，可以税前扣除，体现企业的用工规范性",
    risk: "未按规定缴纳或缴纳金额明显偏低，可能面临补缴和处罚风险"
  },
  depreciation: {
    title: "折旧",
    description: "企业固定资产按照规定计提的折旧费用",
    analysis: "折旧费用是重要的税前扣除项目，反映企业的资产使用情况",
    risk: "折旧计提不符合税法规定或超过规定标准，可能被税务机关调整"
  },
  otherExpenses: {
    title: "其他支出",
    description: "除上述类型外的其他各项经营支出",
    analysis: "其他支出需符合税法规定的支出标准和范围才能税前扣除",
    risk: "其他支出占比过高或构成不合理，可能增加税务检查风险"
  },
  advertisingExpenses: {
    title: "广告费",
    description: "企业发生的各项广告宣传费用支出",
    analysis: "广告费支出超过当年销售（营业）收入15%的部分，准予结转下一年度扣除",
    risk: "广告费支出比例过高可能引起税务机关关注，建议留存完整的广告投放证据"
  },
  welfareExpenses: {
    title: "职工福利费",
    description: "企业为职工提供的各项福利支出",
    analysis: "职工福利费支出不得超过工资薪金总额的14%",
    risk: "超标准列支职工福利费将不能税前扣除，且可能引起税务稽查"
  },
  educationExpenses: {
    title: "教育经费",
    description: "企业发生的职工教育和培训相关支出",
    analysis: "职工教育经费支出不得超过工资薪金总额的8%，超过部分准予结转下一年度扣除",
    risk: "教育e支出构成不合理或缺乏真实性，可能引起税务检查"
  },
  insuranceExpenses: {
    title: "保险费",
    description: "企业为雇主责任险、财产保险等支付的保险费用",
    analysis: "与生产经营相关的保险费可以税前扣除，部分商业保险支出可能需要调整",
    risk: "保险费支出需关注是否属于税前扣除范围，避免产生税务风险"
  }
};

export default taxInfoData;
