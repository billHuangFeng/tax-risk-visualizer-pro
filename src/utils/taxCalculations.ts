
// Tax calculation utility functions

// Calculate deductible R&D expenses
export const calculateDeductibleRD = (actualRD: number): number => {
  return actualRD * 2; // 200% deduction for R&D expenses
};

// Calculate excess business entertainment expenses
export const calculateExcessEntertainment = (
  actualEntertainment: number,
  revenue: number
): { deductible: number; excess: number } => {
  const limit = revenue * 0.005; // 0.5% of revenue limit
  if (actualEntertainment <= limit) {
    return {
      deductible: actualEntertainment,
      excess: 0
    };
  }
  return {
    deductible: limit,
    excess: actualEntertainment - limit
  };
};

// Calculate tax adjustments
export const calculateTaxAdjustments = (
  adjustments: { actual: number; deductible: number }[]
): number => {
  return adjustments.reduce((total, item) => {
    return total + (item.deductible - item.actual);
  }, 0);
};

// Calculate corporate income tax
export const calculateCorporateIncomeTax = (
  revenue: number, 
  expenses: number,
  adjustments: number,
  taxRate: number
): {
  taxableIncome: number;
  theoreticalTax: number;
  actualTax: number;
  riskValue: number;
} => {
  const taxableIncome = revenue - expenses + adjustments;
  const theoreticalTax = Math.max(0, taxableIncome * (taxRate / 100));
  // For demo purposes, we're setting actual tax to a fixed value
  // In a real system, this would be user input
  const actualTax = theoreticalTax * 0.6; // Example: 60% of theoretical tax
  const riskValue = Math.abs(theoreticalTax - actualTax);

  return {
    taxableIncome,
    theoreticalTax,
    actualTax,
    riskValue
  };
};

// Format currency for display
export const formatCurrency = (value: number): string => {
  return value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
};

// Tax risk assessment
export const assessTaxRisk = (theoreticalTax: number, actualTax: number): {
  level: 'low' | 'medium' | 'high';
  percentage: number;
  message: string;
} => {
  const difference = Math.abs(theoreticalTax - actualTax);
  const percentage = theoreticalTax > 0 ? (difference / theoreticalTax) * 100 : 0;
  
  if (percentage < 30) {
    return {
      level: 'low',
      percentage,
      message: '企业所得税申报风险较低，与理论计算值接近，符合一般纳税规律。'
    };
  } else if (percentage < 70) {
    return {
      level: 'medium',
      percentage,
      message: '企业所得税申报风险中等，与理论计算值有一定差距，建议核实税收优惠政策适用情况。'
    };
  } else {
    return {
      level: 'high',
      percentage,
      message: '企业所得税申报风险较高，与理论计算值差距较大，建议进行税务自查并完善相关资料。'
    };
  }
};

// Get information data for tooltips and info panel
export const getTaxInformationData = () => {
  return {
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
    }
  };
};
