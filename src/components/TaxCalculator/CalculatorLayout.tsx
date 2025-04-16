
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { CircleAlert, ListOrdered } from 'lucide-react';
import { TaxInfoPanelItem } from '@/types/calculator';
import TaxInfoPanel from '@/components/TaxCalculator/TaxInfoPanel';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

interface CalculatorLayoutProps {
  children: React.ReactNode;
  selectedInfoItem: TaxInfoPanelItem | null;
}

const CalculatorLayout: React.FC<CalculatorLayoutProps> = ({ children, selectedInfoItem }) => {
  const isMobile = useIsMobile();

  const handleContactAdvisor = () => {
    window.open('https://work.weixin.qq.com/ca/cawcde03d69f2d37e9', '_blank');
  };

  const InfoPanelContent = () => (
    <TaxInfoPanel selectedItem={selectedInfoItem} />
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <div className="container max-w-[100vw] px-4 md:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full">
            <div className="grid gap-4 md:gap-8 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-tax-blue gap-2 text-base">
                    <CircleAlert className="h-4 w-4" />
                    使用说明
                  </CardTitle>
                </CardHeader>
                <CardContent className="py-2">
                  <div className="text-xs text-gray-600 space-y-1">
                    <div className="flex items-start gap-2">
                      <ListOrdered className="h-3 w-3 mt-1 flex-shrink-0" />
                      <span>填写基本信息和财务数据</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <ListOrdered className="h-3 w-3 mt-1 flex-shrink-0" />
                      <span>系统将自动计算税务调整及风险值</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <ListOrdered className="h-3 w-3 mt-1 flex-shrink-0" />
                      <span>风险指数越高，表示理论应纳税额差异越大</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <ListOrdered className="h-3 w-3 mt-1 flex-shrink-0" />
                      <span>点击数据后方的信息图标查看详细分析</span>
                    </div>
                  </div>
                  <Button 
                    onClick={handleContactAdvisor}
                    className="w-full mt-1 bg-vivid-purple hover:bg-secondary-purple text-white text-xs py-1"
                  >
                    立即联系税务顾问
                  </Button>
                </CardContent>
              </Card>
              {children}
            </div>
          </div>
          
          {isMobile ? (
            selectedInfoItem && (
              <Sheet>
                <SheetTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="fixed bottom-4 right-4 z-50 rounded-full shadow-lg bg-white"
                  >
                    <CircleAlert className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-[80vh]">
                  <InfoPanelContent />
                </SheetContent>
              </Sheet>
            )
          ) : (
            <div className="w-full md:w-1/3 mt-8 md:mt-0">
              <InfoPanelContent />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalculatorLayout;
