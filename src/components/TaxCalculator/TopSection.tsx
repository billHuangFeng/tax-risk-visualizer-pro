
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { CircleAlert, ListMinus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface TopSectionProps {
  companyName: string;
  setCompanyName: (value: string) => void;
}

const TopSection: React.FC<TopSectionProps> = ({
  companyName,
  setCompanyName,
}) => {
  const handleContactAdvisor = () => {
    window.open('https://work.weixin.qq.com/ca/cawcde03d69f2d37e9', '_blank');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-8">
      <div className="flex flex-col gap-2">
        <div className="flex items-center">
          <Label htmlFor="companyName" className="font-medium whitespace-nowrap">企业名称：</Label>
        </div>
        <Input
          id="companyName"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          className="w-full"
        />
      </div>
      <div className="md:col-span-2 flex justify-end">
        <Card className="w-full md:w-[66%]">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-[#1677FF]">
              <CircleAlert className="h-5 w-5" />
              <span className="text-base">使用说明</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="py-2">
            <div className="text-gray-600 space-y-1 text-sm">
              <div className="flex items-start gap-2">
                <ListMinus className="h-4 w-4 mt-1 flex-shrink-0 text-[#1677FF]" />
                <span>填写基本信息和财务数据</span>
              </div>
              <div className="flex items-start gap-2">
                <ListMinus className="h-4 w-4 mt-1 flex-shrink-0 text-[#1677FF]" />
                <span>系统将自动计算税务调整及风险值</span>
              </div>
              <div className="flex items-start gap-2">
                <ListMinus className="h-4 w-4 mt-1 flex-shrink-0 text-[#1677FF]" />
                <span>风险指数越高，表示理论应纳税额差异越大</span>
              </div>
              <div className="flex items-start gap-2">
                <ListMinus className="h-4 w-4 mt-1 flex-shrink-0 text-[#1677FF]" />
                <span>点击数据后方的信息图标查看详细分析</span>
              </div>
            </div>
            <Button 
              onClick={handleContactAdvisor}
              className="w-full mt-4 bg-vivid-purple hover:bg-secondary-purple text-white"
            >
              立即联系税务顾问
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TopSection;
