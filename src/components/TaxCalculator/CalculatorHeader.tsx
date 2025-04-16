
import React from 'react';
import { Calculator, Smartphone, RotateCw } from 'lucide-react';
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
    <header className="bg-tax-blue text-white py-4 md:py-6 mb-4 md:mb-8 relative">
      <div className="container">
        <h1 className="text-xl md:text-3xl font-bold flex items-center gap-2">
          <Calculator className="h-6 w-6 md:h-8 md:w-8" />
          {title}
        </h1>
        <p className="mt-2 text-sm md:text-base text-blue-100">
          {description}
        </p>
        {isMobile && (
          <div className="absolute top-full left-0 w-full bg-yellow-500 text-black text-xs md:text-sm text-center py-1 flex items-center justify-center">
            <RotateCw className="h-3 w-3 mr-1 md:h-4 md:w-4 md:mr-2" />
            手机横屏显示更方便查看表格数据
          </div>
        )}
      </div>
    </header>
  );
};

export default CalculatorHeader;
