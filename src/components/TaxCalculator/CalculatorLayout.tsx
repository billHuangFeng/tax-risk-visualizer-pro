
import React from 'react';
import { TaxInfoPanelItem } from '@/types/calculator';
import TaxInfoPanel from '@/components/TaxCalculator/TaxInfoPanel';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { CircleAlert, Info } from 'lucide-react';
import TopSection from './TopSection';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';

interface CalculatorLayoutProps {
  children: React.ReactNode;
  selectedInfoItem: TaxInfoPanelItem | null;
}

const CalculatorLayout: React.FC<CalculatorLayoutProps> = ({ 
  children, 
  selectedInfoItem,
}) => {
  const isMobile = useIsMobile();

  const InfoPanelContent = () => (
    <TaxInfoPanel selectedItem={selectedInfoItem} />
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <div className="container max-w-[100vw] px-4 md:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full">
            <TopSection />
            {children}
          </div>
          
          {isMobile ? (
            selectedInfoItem && (
              isMobile ? (
                <Drawer>
                  <DrawerTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="fixed bottom-4 right-4 z-50 rounded-full shadow-lg bg-white"
                      aria-label="查看详情"
                    >
                      <Info className="h-5 w-5 text-blue-600" />
                    </Button>
                  </DrawerTrigger>
                  <DrawerContent className="px-4 pb-8 pt-2">
                    <div className="mt-2 mb-6">
                      <h3 className="text-lg font-semibold text-center">详细信息</h3>
                    </div>
                    <div className="max-h-[70vh] overflow-y-auto px-1">
                      <InfoPanelContent />
                    </div>
                  </DrawerContent>
                </Drawer>
              ) : (
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
