
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PdfTemplate } from "@/types/pdfTemplates";
import { StyleConfigs } from './PdfTemplateComponents/Editor/StyleConfigs';
import { ColorPicker } from './PdfTemplateComponents/Editor/ColorPicker';
import { ActionButtons } from './PdfTemplateComponents/Editor/ActionButtons';
import { FieldManager } from './PdfTemplateComponents/Editor/FieldManager';

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
  const [editedTemplate, setEditedTemplate] = useState<PdfTemplate>(template);

  const handleStyleChange = (path: string, value: string) => {
    const pathParts = path.split('.');
    const newTemplate = { ...editedTemplate };
    let current: any = newTemplate;
    
    for (let i = 0; i < pathParts.length - 1; i++) {
      current = current[pathParts[i]];
    }
    
    current[pathParts[pathParts.length - 1]] = value;
    setEditedTemplate(newTemplate);
  };

  const handleSectionUpdate = (sectionId: string, updates: any) => {
    const newTemplate = { ...editedTemplate };
    const sectionIndex = newTemplate.layout.sections.findIndex(s => s.id === sectionId);
    
    if (sectionIndex !== -1) {
      newTemplate.layout.sections[sectionIndex] = {
        ...newTemplate.layout.sections[sectionIndex],
        ...updates
      };
      setEditedTemplate(newTemplate);
    }
  };

  const handleFieldUpdate = (sectionId: string, fieldId: string, updates: any) => {
    const newTemplate = { ...editedTemplate };
    const section = newTemplate.layout.sections.find(s => s.id === sectionId);
    
    if (section && section.fields) {
      const fieldIndex = section.fields.findIndex(f => f.id === fieldId);
      if (fieldIndex !== -1) {
        section.fields[fieldIndex] = {
          ...section.fields[fieldIndex],
          ...updates
        };
        setEditedTemplate(newTemplate);
      }
    }
  };

  return (
    <div className="space-y-4">
      <Tabs defaultValue="fields">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="fields">字段管理</TabsTrigger>
          <TabsTrigger value="styles">样式设置</TabsTrigger>
          <TabsTrigger value="layout">布局设置</TabsTrigger>
        </TabsList>
        
        <TabsContent value="fields" className="space-y-4">
          <FieldManager
            sections={editedTemplate.layout.sections}
            onUpdateSection={handleSectionUpdate}
            onUpdateField={handleFieldUpdate}
          />
        </TabsContent>
        
        <TabsContent value="styles">
          <StyleConfigs 
            template={editedTemplate} 
            onStyleChange={handleStyleChange} 
          />
        </TabsContent>
        
        <TabsContent value="layout" className="space-y-4">
          <ColorPicker
            id="table-border"
            label="表格边框颜色"
            value={editedTemplate.styles.tableStyle.borderColor}
            onChange={(value) => handleStyleChange('styles.tableStyle.borderColor', value)}
          />
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
