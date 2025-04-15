
import React from 'react';
import { Calculator } from 'lucide-react';

const CalculatorHeader = () => {
  return (
    <header className="bg-tax-blue text-white py-6 mb-8">
      <div className="container">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Calculator className="h-8 w-8" />
          企业所得税风险评测计算器
        </h1>
        <p className="mt-2 text-blue-100">
          评估企业所得税风险，优化税务决策
        </p>
      </div>
    </header>
  );
};

export default CalculatorHeader;
