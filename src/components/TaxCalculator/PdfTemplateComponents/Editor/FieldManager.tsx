
import React from 'react';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { PdfSection, PdfField } from "@/types/pdfTemplates";

interface FieldManagerProps {
  sections: PdfSection[];
  onUpdateSection: (sectionId: string, updates: Partial<PdfSection>) => void;
  onUpdateField: (sectionId: string, fieldId: string, updates: Partial<PdfField>) => void;
}

export const FieldManager: React.FC<FieldManagerProps> = ({
  sections,
  onUpdateSection,
  onUpdateField,
}) => {
  return (
    <div className="space-y-6">
      {sections.map((section) => (
        <div key={section.id} className="space-y-4 pb-4 border-b border-gray-200 last:border-0">
          <div className="flex items-center justify-between">
            <Label className="text-base font-semibold">{section.title}</Label>
            <Switch
              checked={section.visible}
              onCheckedChange={(checked) => 
                onUpdateSection(section.id, { visible: checked })
              }
            />
          </div>
          
          {section.fields && section.visible && (
            <div className="pl-4 space-y-2 border-l">
              {section.fields.map((field) => (
                <div key={field.id} className="flex items-center justify-between py-1">
                  <Label className="text-sm">{field.label}</Label>
                  <Switch
                    checked={field.visible}
                    onCheckedChange={(checked) => 
                      onUpdateField(section.id, field.id, { visible: checked })
                    }
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
