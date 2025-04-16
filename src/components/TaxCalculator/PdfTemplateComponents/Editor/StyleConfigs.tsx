
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PdfTemplate } from '@/types/pdfTemplates';

interface StyleConfigsProps {
  template: PdfTemplate;
  onStyleChange: (path: string, value: string) => void;
}

export const StyleConfigs: React.FC<StyleConfigsProps> = ({
  template,
  onStyleChange
}) => {
  const fontFamilyOptions = [
    { value: "SimSun, serif", label: "宋体" },
    { value: "Microsoft YaHei, sans-serif", label: "微软雅黑" },
    { value: "SimHei, sans-serif", label: "黑体" },
    { value: "KaiTi, serif", label: "楷体" },
    { value: "FangSong, serif", label: "仿宋" }
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="template-name">模板名称</Label>
          <Input 
            id="template-name" 
            value={template.name}
            onChange={(e) => onStyleChange('name', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="template-font">字体</Label>
          <Select 
            value={template.styles.fontFamily}
            onValueChange={(value) => onStyleChange('styles.fontFamily', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="选择字体" />
            </SelectTrigger>
            <SelectContent>
              {fontFamilyOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
