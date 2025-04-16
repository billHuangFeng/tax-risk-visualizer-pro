
import React from 'react';
import { Calculator, Smartphone } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface CalculatorHeaderProps {
  title?: string;
  description?: string;
}

const CalculatorHeader: React.FC<CalculatorHeaderProps> = ({ 
  title = "企业所得税风险评测计算器",
  description = "本计算器用于评估企业所得税的潜在风险，数据仅供参考，请根据实际情况谨慎使用"
}) => {
  const isMobile = useIsMobile();

  return (
    <header className="bg-tax-blue text-white py-6 mb-8 relative">
      <div className="container">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Calculator className="h-8 w-8" />
          {title}
        </h1>
        <p className="mt-2 text-blue-100">
          {description}
        </p>
        {isMobile && (
          <div className="absolute top-full left-0 w-full bg-yellow-500 text-black text-sm text-center py-1 flex items-center justify-center">
            <Smartphone className="h-4 w-4 mr-2" />
            手机横屏显示更方便查看
          </div>
        )}
      </div>
    </header>
  );
};

export default CalculatorHeader;
