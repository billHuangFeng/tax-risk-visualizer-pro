
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { CircleAlert, ListMinus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface TopSectionProps {
  companyName: string;
  setCompanyName: (value: string) => void;
  creditCode: string;
  setCreditCode: (value: string) => void;
  contactPerson: string;
  setContactPerson: (value: string) => void;
  contactPhone: string;
  setContactPhone: (value: string) => void;
}

const TopSection: React.FC<TopSectionProps> = ({
  companyName,
  setCompanyName,
  creditCode,
  setCreditCode,
  contactPerson,
  setContactPerson,
  contactPhone,
  setContactPhone,
}) => {
  const handleContactAdvisor = () => {
    window.open('https://work.weixin.qq.com/ca/cawcde03d69f2d37e9', '_blank');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-8">
      <div className="flex flex-col gap-4 md:col-span-2">
        <div className="flex items-center gap-4">
          <Label htmlFor="companyName" className="font-medium text-base whitespace-nowrap min-w-[6rem]">企业名称：</Label>
          <div className="flex-1">
            <input
              id="companyName"
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base text-left ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Label htmlFor="creditCode" className="font-medium text-base whitespace-nowrap min-w-[6rem]">统一社会信用代码：</Label>
          <div className="flex-1">
            <input
              id="creditCode"
              type="text"
              value={creditCode}
              onChange={(e) => setCreditCode(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base text-left ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Label htmlFor="contactPerson" className="font-medium text-base whitespace-nowrap min-w-[6rem]">联系人：</Label>
          <div className="flex-1">
            <input
              id="contactPerson"
              type="text"
              value={contactPerson}
              onChange={(e) => setContactPerson(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base text-left ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Label htmlFor="contactPhone" className="font-medium text-base whitespace-nowrap min-w-[6rem]">联系电话：</Label>
          <div className="flex-1">
            <input
              id="contactPhone"
              type="text"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base text-left ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <Card className="w-full">
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
