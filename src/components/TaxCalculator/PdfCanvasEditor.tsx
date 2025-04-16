
import React, { useCallback } from 'react';
import { 
  DragDropContext, 
  Droppable, 
  Draggable 
} from '@hello-pangea/dnd';
import { GripVertical, ArrowUpDown } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { PdfTemplate, PdfSection } from "@/types/pdfTemplates";

interface PdfCanvasEditorProps {
  template: PdfTemplate;
  onUpdate: (template: PdfTemplate) => void;
}

export const PdfCanvasEditor: React.FC<PdfCanvasEditorProps> = ({ 
  template, 
  onUpdate 
}) => {
  const onDragEnd = useCallback((result: any) => {
    if (!result.destination) return;

    const sections = [...template.layout.sections];
    const [reorderedItem] = sections.splice(result.source.index, 1);
    sections.splice(result.destination.index, 0, reorderedItem);

    const updatedTemplate = {
      ...template,
      layout: {
        ...template.layout,
        sections: sections.map((section, index) => ({
          ...section,
          order: index + 1
        }))
      }
    };

    onUpdate(updatedTemplate);
  }, [template, onUpdate]);

  return (
    <div className="space-y-4">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="sections">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-2"
            >
              {template.layout.sections.map((section, index) => (
                <Draggable 
                  key={section.id} 
                  draggableId={section.id} 
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="border rounded-lg p-4 bg-white shadow-sm"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div {...provided.dragHandleProps}>
                            <GripVertical className="h-5 w-5 text-gray-400" />
                          </div>
                          <div className="flex items-center gap-2">
                            <Switch
                              id={`section-${section.id}`}
                              checked={section.visible}
                              onCheckedChange={(checked) => {
                                const updatedTemplate = {
                                  ...template,
                                  layout: {
                                    ...template.layout,
                                    sections: template.layout.sections.map(s =>
                                      s.id === section.id ? { ...s, visible: checked } : s
                                    )
                                  }
                                };
                                onUpdate(updatedTemplate);
                              }}
                            />
                            <Label htmlFor={`section-${section.id}`}>{section.title}</Label>
                          </div>
                        </div>
                        <ArrowUpDown className="h-4 w-4 text-gray-400" />
                      </div>

                      {section.fields && section.fields.length > 0 && (
                        <div className="pl-8 mt-2 space-y-2">
                          {section.fields.map((field) => (
                            <div key={field.id} className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Switch
                                  id={`field-${field.id}`}
                                  checked={field.visible}
                                  onCheckedChange={(checked) => {
                                    const updatedTemplate = {
                                      ...template,
                                      layout: {
                                        ...template.layout,
                                        sections: template.layout.sections.map(s =>
                                          s.id === section.id
                                            ? {
                                                ...s,
                                                fields: s.fields?.map(f =>
                                                  f.id === field.id
                                                    ? { ...f, visible: checked }
                                                    : f
                                                )
                                              }
                                            : s
                                        )
                                      }
                                    };
                                    onUpdate(updatedTemplate);
                                  }}
                                />
                                <Label htmlFor={`field-${field.id}`}>{field.label}</Label>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
