
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RotateCcw, Download, Phone } from 'lucide-react';
import SaveDataButton from './SaveDataButton';
import { useCalculator } from '@/hooks/useCalculator';
import { useToast } from '@/hooks/use-toast';

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
  const calculator = useCalculator();
  const { toast } = useToast();
  
  const handleContactAdvisor = () => {
    window.open('https://work.weixin.qq.com/ca/cawcde03d69f2d37e9', '_blank');
  };

  const handleExport = async () => {
    // Prevent multiple export attempts
    if (exporting) return;
    
    try {
      setExporting(true);
      
      toast({
        title: "PDF生成中",
        description: "正在处理所有页面，请稍候...",
      });
      
      // Allow the toast to render and give time for synchronous operations
      setTimeout(async () => {
        try {
          // Find calculator content
          const calculatorContent = document.getElementById('calculator-content');
          
          // Add PDF export classes before export
          if (calculatorContent) {
            calculatorContent.classList.add('for-pdf-export', 'pdf-export-container');
          }
          
          // Wait for the export to complete
          await onExport();
          
          // Success notification
          toast({
            title: "导出成功",
            description: "PDF文件已生成并下载",
            variant: "default",
          });
        } catch (error) {
          console.error("Export error:", error);
          
          // Error notification
          toast({
            title: "导出失败",
            description: "PDF生成过程中发生错误",
            variant: "destructive",
          });
        } finally {
          // Clean up classes
          const calculatorContent = document.getElementById('calculator-content');
          if (calculatorContent) {
            calculatorContent.classList.remove('for-pdf-export', 'pdf-export-container');
          }
          
          // Reset export state
          setTimeout(() => {
            setExporting(false);
          }, 1000);
        }
      }, 500); // Increased timeout for better stability
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
        onClick={handleExport}
        disabled={exporting}
        className="w-full md:w-auto"
      >
        <Download className="w-4 h-4 mr-2" />
        {exporting ? '导出中...' : '导出PDF'}
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
  );
};

export default CalculatorActions;
