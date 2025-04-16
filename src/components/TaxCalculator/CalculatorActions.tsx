
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RotateCcw, Download, Phone, FileText } from 'lucide-react';
import SaveDataButton from './SaveDataButton';
import { useCalculator } from '@/hooks/useCalculator';
import { useToast } from '@/hooks/use-toast';
import { PdfTemplateDialog } from './PdfTemplateDialog';
import { PdfTemplate } from '@/types/pdfTemplates';
import { DEFAULT_TEMPLATES } from '@/constants/pdfTemplates';

interface CalculatorActionsProps {
  riskPercentage: number;
  onReset: () => void;
  onExport: () => void;
}

const CalculatorActions: React.FC<CalculatorActionsProps> = ({
  riskPercentage,
  onReset,
  onExport,
}) => {
  const [exporting, setExporting] = useState(false);
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<PdfTemplate>(DEFAULT_TEMPLATES[0]);
  const calculator = useCalculator();
  const { toast } = useToast();
  
  const handleContactAdvisor = () => {
    window.open('https://work.weixin.qq.com/ca/cawcde03d69f2d37e9', '_blank');
  };

  const handleExportWithTemplate = async (template: PdfTemplate) => {
    // 存储选中的模板
    setSelectedTemplate(template);
    
    // 关闭对话框
    setIsTemplateDialogOpen(false);
    
    // 开始导出过程
    try {
      setExporting(true);
      
      toast({
        title: "PDF生成中",
        description: "正在处理所有页面，请稍候...",
      });
      
      // 给同步操作时间
      setTimeout(async () => {
        try {
          // 找到计算器内容
          const calculatorContent = document.getElementById('calculator-content');
          
          // 导出前添加PDF导出类
          if (calculatorContent) {
            calculatorContent.classList.add('for-pdf-export', 'pdf-export-container');
            // 存储当前模板信息用于PDF导出
            (window as any).currentPdfTemplate = template;
          }
          
          // 等待导出完成
          await calculator.handleExport(template);
          
          // 成功通知
          toast({
            title: "导出成功",
            description: "PDF文件已生成并下载",
            variant: "default",
          });
        } catch (error) {
          console.error("Export error:", error);
          
          // 错误通知
          toast({
            title: "导出失败",
            description: "PDF生成过程中发生错误",
            variant: "destructive",
          });
        } finally {
          // 清理类
          const calculatorContent = document.getElementById('calculator-content');
          if (calculatorContent) {
            calculatorContent.classList.remove('for-pdf-export', 'pdf-export-container');
          }
          
          // 重置导出状态
          setTimeout(() => {
            setExporting(false);
            // 清理模板信息
            delete (window as any).currentPdfTemplate;
          }, 1000);
        }
      }, 1000);
    } catch (error) {
      console.error("Export initialization error:", error);
      
      toast({
        title: "导出失败",
        description: "无法初始化PDF导出",
        variant: "destructive",
      });
      
      setExporting(false);
    }
  };
  
  return (
    <>
      <div className="w-full px-4 py-4 bg-white border-t border-gray-200 shadow-sm flex flex-col md:flex-row gap-2 justify-end">
        <Button
          variant="outline"
          onClick={onReset}
          className="w-full md:w-auto"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          重置
        </Button>
        
        <Button
          variant="outline"
          onClick={() => setIsTemplateDialogOpen(true)}
          disabled={exporting}
          className="w-full md:w-auto"
        >
          <FileText className="w-4 h-4 mr-2" />
          {exporting ? '导出中...' : '选择PDF模板'}
        </Button>

        <Button 
          onClick={handleContactAdvisor} 
          className="w-full md:w-auto bg-vivid-purple hover:bg-secondary-purple text-white"
        >
          <Phone className="w-4 h-4 mr-2" />
          立即联系税务顾问
        </Button>
        
        <SaveDataButton calculatorData={calculator} />
      </div>
      
      <PdfTemplateDialog 
        open={isTemplateDialogOpen}
        onClose={() => setIsTemplateDialogOpen(false)}
        onExport={handleExportWithTemplate}
      />
    </>
  );
};

export default CalculatorActions;
