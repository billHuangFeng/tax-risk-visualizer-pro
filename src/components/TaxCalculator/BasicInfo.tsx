
import React, { useRef, useEffect } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CircleAlertIcon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface BasicInfoProps {
  companyName: string;
  setCompanyName: (value: string) => void;
  isExcludedIndustry: boolean;
  setIsExcludedIndustry: (value: boolean) => void;
  isHighTechEnterprise: boolean;
  setIsHighTechEnterprise: (value: boolean) => void;
  totalAssets: string;
  setTotalAssets: (value: string) => void;
  employeeCount: string;
  setEmployeeCount: (value: string) => void;
  onInfoClick: (infoKey: string) => void;
}

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
  const companyNameRef = useRef<HTMLInputElement>(null);
  const totalAssetsRef = useRef<HTMLInputElement>(null);
  const employeeCountRef = useRef<HTMLInputElement>(null);
  
  // Update data attributes for PDF export
  useEffect(() => {
    if (companyNameRef.current) {
      companyNameRef.current.setAttribute('data-value', companyName);
    }
    if (totalAssetsRef.current) {
      totalAssetsRef.current.setAttribute('data-value', totalAssets);
    }
    if (employeeCountRef.current) {
      employeeCountRef.current.setAttribute('data-value', employeeCount);
    }
  }, [companyName, totalAssets, employeeCount]);
  
  return (
    <div className="space-y-6 border rounded-lg p-6 bg-white">
      <h2 className="text-xl font-bold border-l-4 border-tax-blue pl-3">基本信息</h2>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 items-center">
          <Label htmlFor="companyName" className="md:col-span-1 font-medium">企业名称：</Label>
          <div className="md:col-span-2 pdf-text-visible">
            <Input
              id="companyName"
              ref={companyNameRef}
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full text-left overflow-visible"
              data-value={companyName}
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
                  <CircleAlertIcon size={16} />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs max-w-xs">点击查看小微企业资产总额标准详情</p>
              </TooltipContent>
            </Tooltip>
          </Label>
          <div className="flex items-center pdf-text-visible">
            <div className="min-w-[220px] w-full max-w-[300px]">
              <Input
                id="totalAssets"
                ref={totalAssetsRef}
                type="number"
                value={totalAssets}
                onChange={(e) => setTotalAssets(e.target.value)}
                className="text-right w-full pr-8 overflow-visible"
                data-value={totalAssets}
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
                  <CircleAlertIcon size={16} />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs max-w-xs">点击查看小微企业员工人数标准详情</p>
              </TooltipContent>
            </Tooltip>
          </Label>
          <div className="flex items-center pdf-text-visible">
            <div className="min-w-[220px] w-full max-w-[300px]">
              <Input
                id="employeeCount"
                ref={employeeCountRef}
                type="number"
                value={employeeCount}
                onChange={(e) => setEmployeeCount(e.target.value)}
                className="text-right w-full pr-8 overflow-visible"
                data-value={employeeCount}
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
