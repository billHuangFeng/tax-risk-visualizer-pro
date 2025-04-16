
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PdfTemplate } from "@/types/pdfTemplates";
import { StyleConfigs } from './PdfTemplateComponents/Editor/StyleConfigs';
import { ColorPicker } from './PdfTemplateComponents/Editor/ColorPicker';
import { ActionButtons } from './PdfTemplateComponents/Editor/ActionButtons';

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

  return (
    <div className="space-y-4">
      <Tabs defaultValue="general">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="general">基本设置</TabsTrigger>
          <TabsTrigger value="headings">标题样式</TabsTrigger>
          <TabsTrigger value="tables">表格样式</TabsTrigger>
          <TabsTrigger value="forms">表单样式</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <StyleConfigs 
            template={editedTemplate} 
            onStyleChange={handleChange} 
          />
        </TabsContent>
        
        <TabsContent value="headings">
          <div className="grid grid-cols-2 gap-4">
            <ColorPicker
              id="heading-color"
              label="标题颜色"
              value={editedTemplate.styles.headingStyle.color}
              onChange={(value) => handleChange('styles.headingStyle.color', value)}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="tables">
          <div className="grid grid-cols-2 gap-4">
            <ColorPicker
              id="table-border"
              label="边框颜色"
              value={editedTemplate.styles.tableStyle.borderColor}
              onChange={(value) => handleChange('styles.tableStyle.borderColor', value)}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="forms">
          <div className="grid grid-cols-2 gap-4">
            <ColorPicker
              id="form-border"
              label="边框颜色"
              value={editedTemplate.styles.formFieldStyle.borderColor}
              onChange={(value) => handleChange('styles.formFieldStyle.borderColor', value)}
            />
          </div>
        </TabsContent>
      </Tabs>
      
      <ActionButtons
        onCancel={onCancel}
        onSave={onSave}
        template={editedTemplate}
      />
    </div>
  );
};
