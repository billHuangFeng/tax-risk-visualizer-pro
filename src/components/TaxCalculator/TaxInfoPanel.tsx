
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AlertTriangle, FileText, BarChart, Info } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface TaxInfoPanelProps {
  selectedItem: {
    title: string;
    description: string;
    analysis: string;
    risk: string;
  } | null;
}

const TaxInfoPanel: React.FC<TaxInfoPanelProps> = ({ selectedItem }) => {
  const isMobile = useIsMobile();

  return (
    <div className={`${isMobile ? 'relative' : 'sticky top-8'}`}>
      <Card className={`border-l-4 border-l-tax-blue shadow-md min-h-[${isMobile ? '400px' : '600px'}] max-h-[80vh] flex flex-col bg-white text-foreground`}>
        <CardHeader className="pb-3 bg-white">
          <CardTitle className="flex items-center text-lg md:text-xl text-tax-blue gap-2">
            <Info className="h-5 w-5" />
            {selectedItem ? selectedItem.title : '税务分析与风险提示信息'}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden bg-white">
          <ScrollArea className={`${isMobile ? 'h-[calc(100vh-350px)]' : 'h-[calc(100vh-250px)]'} pr-4`}>
            {selectedItem ? (
              <div className="space-y-6 md:space-y-8">
                <div className="space-y-3">
                  <h3 className="font-medium flex items-center gap-2 text-gray-800">
                    <FileText className="h-4 w-4 text-tax-blue" />
                    说明
                  </h3>
                  <p className="text-sm text-gray-600 pl-6 whitespace-pre-line">
                    {selectedItem.description}
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="font-medium flex items-center gap-2 text-gray-800">
                    <BarChart className="h-4 w-4 text-tax-green" />
                    政策分析
                  </h3>
                  <p className="text-sm text-gray-600 pl-6 whitespace-pre-line">
                    {selectedItem.analysis}
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="font-medium flex items-center gap-2 text-gray-800">
                    <AlertTriangle className="h-4 w-4 text-tax-red" />
                    风险提示
                  </h3>
                  <p className="text-sm text-gray-600 pl-6 whitespace-pre-line pb-4">
                    {selectedItem.risk}
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Info className="h-12 w-12 mx-auto mb-4 opacity-30" />
                <p>点击数据项旁边的信息图标，查看详细分析和风险提示</p>
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaxInfoPanel;
