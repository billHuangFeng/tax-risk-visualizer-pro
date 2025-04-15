
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CircleIcon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const BasicInfo: React.FC<BasicInfoProps> = ({
  companyName,
  setCompanyName,
  isExcludedIndustry,
  setIsExcludedIndustry,
  isHighTechEnterprise,
  setIsHighTechEnterprise,
  totalAssets,
  setTotalAssets,
  employeeCount,
  setEmployeeCount,
  onInfoClick,
}) => {
  return (
    <div className="space-y-6 border rounded-lg p-6 bg-white">
      <h2 className="text-xl font-bold border-l-4 border-tax-blue pl-3">基本信息</h2>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <Label htmlFor="companyName" className="md:col-span-1 font-medium">企业名称：</Label>
          <div className="md:col-span-2">
            <Input
              id="companyName"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-start space-x-2">
            <Checkbox 
              id="excludedIndustry" 
              checked={isExcludedIndustry}
              onCheckedChange={(checked) => setIsExcludedIndustry(checked as boolean)}
            />
            <div className="grid gap-1.5 leading-none">
              <Label 
                htmlFor="excludedIndustry" 
                className="font-medium text-sm"
              >
                是能享受研发加计扣除优惠政策的企业？
              </Label>
              <p className="text-sm text-muted-foreground">
                以下企业不能享受研发加计扣除政策：1.烟草制造业、2.住宿和餐饮业、3.批发和零售业、4.房地产业、5.租赁和商务服务业、6.娱乐业
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox 
              id="highTechEnterprise" 
              checked={isHighTechEnterprise}
              onCheckedChange={(checked) => setIsHighTechEnterprise(checked as boolean)}
            />
            <div className="grid gap-1.5 leading-none">
              <Label 
                htmlFor="highTechEnterprise" 
                className="font-medium text-sm"
              >
                是能享受15%企业所得税优惠的高新技术企业或其他企业？
              </Label>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <Label htmlFor="totalAssets" className="md:col-span-1 font-medium flex items-center">
            资产总额：
            <Tooltip>
              <TooltipTrigger asChild>
                <button 
                  className="ml-2 text-tax-blue hover:text-tax-light-blue"
                  title="小微企业资产总额标准"
                  onClick={() => onInfoClick('totalAssets')}
                >
                  <CircleIcon size={16} />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs max-w-xs">点击查看小微企业资产总额标准详情</p>
              </TooltipContent>
            </Tooltip>
          </Label>
          <div className="flex items-center">
            <div className="w-[20rem]">
              <Input
                id="totalAssets"
                type="number"
                value={totalAssets}
                onChange={(e) => setTotalAssets(e.target.value)}
                className="text-right w-full"
              />
            </div>
            <span className="ml-2 text-sm whitespace-nowrap">万元</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <Label htmlFor="employeeCount" className="md:col-span-1 font-medium flex items-center">
            发薪资、劳务费的员工人数：
            <Tooltip>
              <TooltipTrigger asChild>
                <button 
                  className="ml-2 text-tax-blue hover:text-tax-light-blue"
                  title="小微企业员工人数标准"
                  onClick={() => onInfoClick('employeeCount')}
                >
                  <CircleIcon size={16} />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs max-w-xs">点击查看小微企业员工人数标准详情</p>
              </TooltipContent>
            </Tooltip>
          </Label>
          <div className="flex items-center">
            <div className="w-input-text">
              <Input
                id="employeeCount"
                type="number"
                value={employeeCount}
                onChange={(e) => setEmployeeCount(e.target.value)}
                className="text-right w-full"
              />
            </div>
            <span className="ml-2 text-sm">人</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicInfo;
