
import React from 'react';
import { TaxInfoPanelItem } from '@/types/calculator';
import TaxInfoPanel from '@/components/TaxCalculator/TaxInfoPanel';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { CircleAlert } from 'lucide-react';
import TopSection from './TopSection';

interface CalculatorLayoutProps {
  children: React.ReactNode;
  selectedInfoItem: TaxInfoPanelItem | null;
  companyName: string;
  setCompanyName: (value: string) => void;
}

const CalculatorLayout: React.FC<CalculatorLayoutProps> = ({ 
  children, 
  selectedInfoItem,
  companyName,
  setCompanyName
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
            <TopSection 
              companyName={companyName}
              setCompanyName={setCompanyName}
            />
            {children}
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
