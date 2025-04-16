
import React from 'react';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { PlusCircle, Trash2, MoveUp, MoveDown, GripVertical } from "lucide-react";
import { PdfSection, PdfField, PdfTemplate } from "@/types/pdfTemplates";

interface PdfLayoutEditorProps {
  template: PdfTemplate;
  onUpdate: (template: PdfTemplate) => void;
}

export const PdfLayoutEditor: React.FC<PdfLayoutEditorProps> = ({
  template,
  onUpdate
}) => {
  const handleSectionVisibilityChange = (sectionId: string, visible: boolean) => {
    const updatedTemplate = {
      ...template,
      layout: {
        ...template.layout,
        sections: template.layout.sections.map(section => 
          section.id === sectionId ? { ...section, visible } : section
        )
      }
    };
    onUpdate(updatedTemplate);
  };

  const handleSectionOrderChange = (sectionId: string, direction: 'up' | 'down') => {
    const sections = [...template.layout.sections];
    const index = sections.findIndex(s => s.id === sectionId);
    if (direction === 'up' && index > 0) {
      [sections[index], sections[index - 1]] = [sections[index - 1], sections[index]];
    } else if (direction === 'down' && index < sections.length - 1) {
      [sections[index], sections[index + 1]] = [sections[index + 1], sections[index]];
    }
    
    const updatedTemplate = {
      ...template,
      layout: {
        ...template.layout,
        sections: sections.map((s, idx) => ({ ...s, order: idx + 1 }))
      }
    };
    onUpdate(updatedTemplate);
  };

  const handleFieldVisibilityChange = (sectionId: string, fieldId: string, visible: boolean) => {
    const updatedTemplate = {
      ...template,
      layout: {
        ...template.layout,
        sections: template.layout.sections.map(section => 
          section.id === sectionId 
            ? {
                ...section,
                fields: section.fields?.map(field =>
                  field.id === fieldId ? { ...field, visible } : field
                )
              }
            : section
        )
      }
    };
    onUpdate(updatedTemplate);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">页面布局设计</h3>
        <Button variant="outline" size="sm">
          <PlusCircle className="h-4 w-4 mr-2" />
          添加自定义部分
        </Button>
      </div>

      <div className="space-y-4">
        {template.layout.sections.map((section) => (
          <div
            key={section.id}
            className="border rounded-lg p-4 space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <GripVertical className="h-5 w-5 text-gray-400" />
                <div className="flex items-center gap-2">
                  <Switch
                    id={`section-${section.id}`}
                    checked={section.visible}
                    onCheckedChange={(checked) => handleSectionVisibilityChange(section.id, checked)}
                  />
                  <Label htmlFor={`section-${section.id}`}>{section.title}</Label>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSectionOrderChange(section.id, 'up')}
                >
                  <MoveUp className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSectionOrderChange(section.id, 'down')}
                >
                  <MoveDown className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {section.fields && section.fields.length > 0 && (
              <div className="pl-8 space-y-2">
                {section.fields.map((field) => (
                  <div key={field.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Switch
                        id={`field-${field.id}`}
                        checked={field.visible}
                        onCheckedChange={(checked) => 
                          handleFieldVisibilityChange(section.id, field.id, checked)
                        }
                      />
                      <Label htmlFor={`field-${field.id}`}>{field.label}</Label>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
