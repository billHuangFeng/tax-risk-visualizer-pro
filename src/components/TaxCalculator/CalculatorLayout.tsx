
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { AlertCircle, Info } from 'lucide-react';
import { TaxInfoPanelItem } from '@/types/calculator';
import TaxInfoPanel from '@/components/TaxCalculator/TaxInfoPanel';

interface CalculatorLayoutProps {
  children: React.ReactNode;
  selectedInfoItem: TaxInfoPanelItem | null;
}

const CalculatorLayout: React.FC<CalculatorLayoutProps> = ({ children, selectedInfoItem }) => {
  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <div className="container">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-2/3">
            <div className="grid gap-8 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-tax-blue flex items-center gap-2">
                    <AlertCircle className="h-5 w-5" />
                    使用说明
                  </CardTitle>
                  <CardDescription>
                    本计算器用于评估企业所得税的潜在风险，数据仅供参考，请根据实际情况谨慎使用
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-gray-600">
                    <p>1. 填写基本信息和财务数据</p>
                    <p>2. 系统将自动计算税务调整及风险值</p>
                    <p>3. 风险指数越高，表示与理论应纳税额差异越大，需要更多关注</p>
                    <p>4. 点击数据后方的<Info className="h-3 w-3 inline-block text-tax-blue mx-1" />图标查看详细分析</p>
                  </div>
                </CardContent>
              </Card>
              {children}
            </div>
          </div>
          
          <div className="w-full md:w-1/3 mt-8 md:mt-0">
            <TaxInfoPanel selectedItem={selectedInfoItem} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorLayout;
