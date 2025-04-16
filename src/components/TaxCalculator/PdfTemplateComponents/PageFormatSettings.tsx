
import React from 'react';
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { PdfTemplate } from "@/types/pdfTemplates";

interface PageFormatSettingsProps {
  template: PdfTemplate;
  onUpdate: (template: PdfTemplate) => void;
}

export const PageFormatSettings: React.FC<PageFormatSettingsProps> = ({
  template,
  onUpdate
}) => {
  return (
    <Card className="p-6 space-y-6">
      <div className="space-y-4">
        <div>
          <Label>纸张大小</Label>
          <Select defaultValue="a4">
            <SelectTrigger>
              <SelectValue placeholder="选择纸张大小" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="a4">A4 (210 × 297 mm)</SelectItem>
              <SelectItem value="a5">A5 (148 × 210 mm)</SelectItem>
              <SelectItem value="letter">Letter (216 × 279 mm)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>页面方向</Label>
          <RadioGroup defaultValue="portrait" className="flex gap-4 mt-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="portrait" id="portrait" />
              <Label htmlFor="portrait">纵向</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="landscape" id="landscape" />
              <Label htmlFor="landscape">横向</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-4">
          <Label>文档选项</Label>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="show-grid">显示网格线</Label>
              <Switch id="show-grid" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="show-header">显示页眉</Label>
              <Switch id="show-header" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="show-footer">显示页脚</Label>
              <Switch id="show-footer" />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
