
import React from 'react';
import { PdfTemplate } from "@/types/pdfTemplates";
import { PreviewHeader } from "./PdfTemplateComponents/Preview/PreviewHeader";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PdfTemplatePreviewProps {
  template: PdfTemplate;
  onBack: () => void;
}

export const PdfTemplatePreview: React.FC<PdfTemplatePreviewProps> = ({
  template,
  onBack
}) => {
  return (
    <div className="space-y-4 w-full h-full flex flex-col">
      <PreviewHeader templateName={template.name} onBack={onBack} />
      
      <ScrollArea className="flex-1 w-full rounded-lg border">
        <div className="p-6 bg-white w-full min-h-[1100px]">
          {/* 公司标题部分 */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-normal mb-2">示例公司名称</h1>
            <p className="text-base">2023年度税务报告</p>
          </div>
          
          {/* 基本信息部分 */}
          <div className="mb-8">
            <h2 className="text-lg font-normal mb-4 pb-2">基本信息</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex justify-between items-center">
                <span>公司名称：</span>
                <div className="border border-black px-3 py-1 min-w-[200px] text-center">
                  示例公司名称
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span>员工数量：</span>
                <div className="border border-black px-3 py-1 min-w-[100px] text-center">
                  50
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span>是否高新企业：</span>
                <div className="flex items-center">
                  <div className="inline-block border border-black w-4 h-4 mr-1 relative">
                    <span className="absolute top-[-3px] left-[1px]">✓</span>
                  </div>
                  <span>是</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span>总资产：</span>
                <div className="border border-black px-3 py-1 min-w-[200px] text-right">
                  ¥ 10,000,000.00
                </div>
              </div>
            </div>
          </div>
          
          {/* 收入与支出部分 */}
          <div className="mb-8">
            <h2 className="text-lg font-normal mb-4 pb-2">收入与支出</h2>
            
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border border-black p-2 text-left font-normal bg-white">
                    项目
                  </th>
                  <th className="border border-black p-2 text-right font-normal bg-white">
                    金额（元）
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-black p-2 text-left">
                    总收入
                  </td>
                  <td className="border border-black p-2 text-right">
                    5,000,000.00
                  </td>
                </tr>
                <tr>
                  <td className="border border-black p-2 text-left">
                    总支出
                  </td>
                  <td className="border border-black p-2 text-right">
                    3,500,000.00
                  </td>
                </tr>
                <tr>
                  <td className="border border-black p-2 text-left font-bold">
                    应纳税所得额
                  </td>
                  <td className="border border-black p-2 text-right font-bold">
                    1,500,000.00
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          {/* 税务总结部分 */}
          <div className="mb-8">
            <h2 className="text-lg font-normal mb-4 pb-2">税务总结</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex justify-between items-center">
                <span>适用税率：</span>
                <div className="border border-black px-3 py-1 min-w-[100px] text-center">
                  25%
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span>理论应缴税额：</span>
                <div className="border border-black px-3 py-1 min-w-[200px] text-right">
                  ¥ 375,000.00
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span>实际缴纳税额：</span>
                <div className="border border-black px-3 py-1 min-w-[200px] text-right">
                  ¥ 300,000.00
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span>风险评估：</span>
                <div className="border border-black px-3 py-1 min-w-[200px] text-right">
                  中等风险 (30%)
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};
