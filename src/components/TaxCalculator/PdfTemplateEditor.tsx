
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PdfTemplate } from "@/types/pdfTemplates";
import { ArrowLeft, Save } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PdfTemplateEditorProps {
  template: PdfTemplate;
  onSave: (template: PdfTemplate) => void;
  onCancel: () => void;
}

export const PdfTemplateEditor: React.FC<PdfTemplateEditorProps> = ({
  template,
  onSave,
  onCancel
}) => {
  const [editedTemplate, setEditedTemplate] = useState<PdfTemplate>({
    ...template,
    id: `${template.id}-custom`,
    name: `${template.name} (自定义)`
  });

  const handleChange = (path: string, value: string) => {
    const pathParts = path.split('.');
    const newTemplate = { ...editedTemplate };
    
    let current: any = newTemplate;
    for (let i = 0; i < pathParts.length - 1; i++) {
      current = current[pathParts[i]];
    }
    
    current[pathParts[pathParts.length - 1]] = value;
    setEditedTemplate(newTemplate);
  };
  
  const fontFamilyOptions = [
    { value: "SimSun, serif", label: "宋体" },
    { value: "Microsoft YaHei, sans-serif", label: "微软雅黑" },
    { value: "SimHei, sans-serif", label: "黑体" },
    { value: "KaiTi, serif", label: "楷体" },
    { value: "FangSong, serif", label: "仿宋" }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={onCancel}>
          <ArrowLeft className="h-4 w-4 mr-1" />
          返回
        </Button>
        <h3 className="text-lg font-medium">模板设计</h3>
      </div>
      
      <Tabs defaultValue="general">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="general">基本设置</TabsTrigger>
          <TabsTrigger value="headings">标题样式</TabsTrigger>
          <TabsTrigger value="tables">表格样式</TabsTrigger>
          <TabsTrigger value="forms">表单样式</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="template-name">模板名称</Label>
              <Input 
                id="template-name" 
                value={editedTemplate.name}
                onChange={(e) => handleChange('name', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="template-font">字体</Label>
              <Select 
                value={editedTemplate.styles.fontFamily}
                onValueChange={(value) => handleChange('styles.fontFamily', value)}
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
            
            <div className="space-y-2">
              <Label htmlFor="template-margin">页面边距</Label>
              <Input 
                id="template-margin" 
                value={editedTemplate.styles.layout.pageMargin}
                onChange={(e) => handleChange('styles.layout.pageMargin', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="template-spacing">段落间距</Label>
              <Input 
                id="template-spacing" 
                value={editedTemplate.styles.layout.sectionSpacing}
                onChange={(e) => handleChange('styles.layout.sectionSpacing', e.target.value)}
              />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="headings" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="heading-size">标题大小</Label>
              <Input 
                id="heading-size" 
                value={editedTemplate.styles.headingStyle.fontSize}
                onChange={(e) => handleChange('styles.headingStyle.fontSize', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="heading-weight">字体粗细</Label>
              <Select 
                value={editedTemplate.styles.headingStyle.fontWeight}
                onValueChange={(value) => handleChange('styles.headingStyle.fontWeight', value)}
              >
                <SelectTrigger id="heading-weight">
                  <SelectValue placeholder="选择粗细" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">普通</SelectItem>
                  <SelectItem value="bold">粗体</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="heading-color">标题颜色</Label>
              <div className="flex">
                <Input 
                  id="heading-color" 
                  type="color"
                  className="w-12 p-1 mr-2"
                  value={editedTemplate.styles.headingStyle.color}
                  onChange={(e) => handleChange('styles.headingStyle.color', e.target.value)}
                />
                <Input 
                  value={editedTemplate.styles.headingStyle.color}
                  onChange={(e) => handleChange('styles.headingStyle.color', e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="heading-border">底部边框</Label>
              <Input 
                id="heading-border" 
                value={editedTemplate.styles.headingStyle.borderBottom || ""}
                onChange={(e) => handleChange('styles.headingStyle.borderBottom', e.target.value)}
                placeholder="1px solid #000"
              />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="tables" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="table-border">边框颜色</Label>
              <div className="flex">
                <Input 
                  id="table-border" 
                  type="color"
                  className="w-12 p-1 mr-2"
                  value={editedTemplate.styles.tableStyle.borderColor}
                  onChange={(e) => handleChange('styles.tableStyle.borderColor', e.target.value)}
                />
                <Input 
                  value={editedTemplate.styles.tableStyle.borderColor}
                  onChange={(e) => handleChange('styles.tableStyle.borderColor', e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="table-header">表头背景色</Label>
              <div className="flex">
                <Input 
                  id="table-header" 
                  type="color"
                  className="w-12 p-1 mr-2"
                  value={editedTemplate.styles.tableStyle.headerBgColor}
                  onChange={(e) => handleChange('styles.tableStyle.headerBgColor', e.target.value)}
                />
                <Input 
                  value={editedTemplate.styles.tableStyle.headerBgColor}
                  onChange={(e) => handleChange('styles.tableStyle.headerBgColor', e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="table-padding">单元格内边距</Label>
              <Input 
                id="table-padding" 
                value={editedTemplate.styles.tableStyle.cellPadding}
                onChange={(e) => handleChange('styles.tableStyle.cellPadding', e.target.value)}
              />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="forms" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="form-border">边框颜色</Label>
              <div className="flex">
                <Input 
                  id="form-border" 
                  type="color"
                  className="w-12 p-1 mr-2"
                  value={editedTemplate.styles.formFieldStyle.borderColor}
                  onChange={(e) => handleChange('styles.formFieldStyle.borderColor', e.target.value)}
                />
                <Input 
                  value={editedTemplate.styles.formFieldStyle.borderColor}
                  onChange={(e) => handleChange('styles.formFieldStyle.borderColor', e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="form-padding">内边距</Label>
              <Input 
                id="form-padding" 
                value={editedTemplate.styles.formFieldStyle.padding}
                onChange={(e) => handleChange('styles.formFieldStyle.padding', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="form-label">标签颜色</Label>
              <div className="flex">
                <Input 
                  id="form-label" 
                  type="color"
                  className="w-12 p-1 mr-2"
                  value={editedTemplate.styles.formFieldStyle.labelColor}
                  onChange={(e) => handleChange('styles.formFieldStyle.labelColor', e.target.value)}
                />
                <Input 
                  value={editedTemplate.styles.formFieldStyle.labelColor}
                  onChange={(e) => handleChange('styles.formFieldStyle.labelColor', e.target.value)}
                />
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="pt-4 flex justify-end">
        <Button variant="outline" onClick={onCancel} className="mr-2">
          取消
        </Button>
        <Button onClick={() => onSave(editedTemplate)}>
          <Save className="h-4 w-4 mr-2" />
          保存模板
        </Button>
      </div>
    </div>
  );
};
