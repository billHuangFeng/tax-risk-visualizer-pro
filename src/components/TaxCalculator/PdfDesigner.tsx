
import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { PdfTemplate, PdfSection, PdfField } from "@/types/pdfTemplates";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { 
  GripVertical, 
  Plus, 
  Trash2, 
  Settings, 
  Move, 
  Edit, 
  Eye, 
  EyeOff, 
  Save,
  PanelRight
} from "lucide-react";

// 定义可用于PDF模板的所有字段类型
const AVAILABLE_FIELDS = [
  { id: "companyName", label: "公司名称", type: "text" as const, category: "基本信息" },
  { id: "employeeCount", label: "员工数量", type: "number" as const, category: "基本信息" },
  { id: "isHighTech", label: "高新技术企业", type: "checkbox" as const, category: "基本信息" },
  { id: "totalRevenue", label: "总收入", type: "number" as const, category: "收入支出" },
  { id: "totalExpenses", label: "总支出", type: "number" as const, category: "收入支出" },
  { id: "revenueItems", label: "收入明细", type: "table" as const, category: "收入支出" },
  { id: "expenseItems", label: "支出明细", type: "table" as const, category: "收入支出" },
  { id: "taxRate", label: "适用税率", type: "number" as const, category: "税务" },
  { id: "taxAmount", label: "应纳税额", type: "number" as const, category: "税务" },
  { id: "afterTaxProfit", label: "税后利润", type: "number" as const, category: "税务" },
];

// 按类别分组的字段
const FIELD_CATEGORIES = [...new Set(AVAILABLE_FIELDS.map(field => field.category))];

interface PdfDesignerProps {
  template: PdfTemplate;
  onUpdate: (template: PdfTemplate) => void;
}

export const PdfDesigner: React.FC<PdfDesignerProps> = ({ 
  template, 
  onUpdate 
}) => {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [editingField, setEditingField] = useState<PdfField | null>(null);
  const [isAddingSectionOpen, setIsAddingSectionOpen] = useState(false);
  const [newSectionTitle, setNewSectionTitle] = useState("");
  
  // 处理拖放结束事件
  const handleDragEnd = (result: any) => {
    const { source, destination, type } = result;
    
    // 如果没有目标或拖拽到相同位置，不执行任何操作
    if (!destination || 
        (source.droppableId === destination.droppableId && 
         source.index === destination.index)) {
      return;
    }
    
    const updatedTemplate = { ...template };
    
    // 处理节区拖拽
    if (type === 'section') {
      const sections = [...updatedTemplate.layout.sections];
      const [movedSection] = sections.splice(source.index, 1);
      sections.splice(destination.index, 0, movedSection);
      
      // 更新顺序
      const reorderedSections = sections.map((section, index) => ({
        ...section,
        order: index + 1
      }));
      
      updatedTemplate.layout.sections = reorderedSections;
      onUpdate(updatedTemplate);
      return;
    }
    
    // 处理从可用字段到节区的拖拽
    if (source.droppableId === 'available-fields' && destination.droppableId.startsWith('section-')) {
      const sectionId = destination.droppableId.replace('section-', '');
      const fieldData = AVAILABLE_FIELDS[source.index];
      
      // 检查字段是否已存在
      const sectionIndex = updatedTemplate.layout.sections.findIndex(s => s.id === sectionId);
      const fieldExists = updatedTemplate.layout.sections[sectionIndex].fields?.some(
        f => f.sourceField === fieldData.id
      );
      
      if (!fieldExists) {
        const newField: PdfField = {
          id: `${fieldData.id}-${Date.now()}`,
          type: fieldData.type,
          label: fieldData.label,
          visible: true,
          sourceField: fieldData.id
        };
        
        const updatedSections = updatedTemplate.layout.sections.map(section => {
          if (section.id === sectionId) {
            return {
              ...section,
              fields: [...(section.fields || []), newField]
            };
          }
          return section;
        });
        
        updatedTemplate.layout.sections = updatedSections;
        onUpdate(updatedTemplate);
      }
      return;
    }
    
    // 处理字段在同一节区内的重排序
    if (source.droppableId.startsWith('section-') && 
        destination.droppableId === source.droppableId) {
      const sectionId = source.droppableId.replace('section-', '');
      const sectionIndex = updatedTemplate.layout.sections.findIndex(s => s.id === sectionId);
      
      if (sectionIndex >= 0 && updatedTemplate.layout.sections[sectionIndex].fields) {
        const fields = [...(updatedTemplate.layout.sections[sectionIndex].fields || [])];
        const [movedField] = fields.splice(source.index, 1);
        fields.splice(destination.index, 0, movedField);
        
        updatedTemplate.layout.sections[sectionIndex].fields = fields;
        onUpdate(updatedTemplate);
      }
    }
  };
  
  // 添加新节区
  const handleAddSection = () => {
    if (!newSectionTitle.trim()) return;
    
    const newSection: PdfSection = {
      id: `section-${Date.now()}`,
      type: 'custom',
      title: newSectionTitle,
      visible: true,
      order: template.layout.sections.length + 1,
      fields: []
    };
    
    const updatedTemplate = {
      ...template,
      layout: {
        ...template.layout,
        sections: [...template.layout.sections, newSection]
      }
    };
    
    onUpdate(updatedTemplate);
    setNewSectionTitle("");
    setIsAddingSectionOpen(false);
  };
  
  // 删除节区
  const handleDeleteSection = (sectionId: string) => {
    const updatedTemplate = {
      ...template,
      layout: {
        ...template.layout,
        sections: template.layout.sections.filter(section => section.id !== sectionId)
      }
    };
    
    onUpdate(updatedTemplate);
  };
  
  // 删除字段
  const handleDeleteField = (sectionId: string, fieldId: string) => {
    const updatedTemplate = {
      ...template,
      layout: {
        ...template.layout,
        sections: template.layout.sections.map(section => {
          if (section.id === sectionId) {
            return {
              ...section,
              fields: section.fields?.filter(field => field.id !== fieldId)
            };
          }
          return section;
        })
      }
    };
    
    onUpdate(updatedTemplate);
  };
  
  // 切换节区可见性
  const handleToggleSectionVisibility = (sectionId: string, visible: boolean) => {
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
  
  // 切换字段可见性
  const handleToggleFieldVisibility = (sectionId: string, fieldId: string, visible: boolean) => {
    const updatedTemplate = {
      ...template,
      layout: {
        ...template.layout,
        sections: template.layout.sections.map(section => {
          if (section.id === sectionId) {
            return {
              ...section,
              fields: section.fields?.map(field => 
                field.id === fieldId ? { ...field, visible } : field
              )
            };
          }
          return section;
        })
      }
    };
    
    onUpdate(updatedTemplate);
  };
  
  return (
    <div className="flex h-[70vh] overflow-hidden">
      {/* 左侧：字段列表 */}
      <div className="w-1/4 border-r p-4 overflow-y-auto">
        <h3 className="font-medium mb-3">可用字段</h3>
        
        <Tabs defaultValue={FIELD_CATEGORIES[0]}>
          <TabsList className="mb-4">
            {FIELD_CATEGORIES.map(category => (
              <TabsTrigger key={category} value={category}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {FIELD_CATEGORIES.map(category => (
            <TabsContent key={category} value={category}>
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="available-fields" isDropDisabled={false}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="space-y-2"
                    >
                      {AVAILABLE_FIELDS
                        .filter(field => field.category === category)
                        .map((field, index) => (
                          <Draggable
                            key={field.id}
                            draggableId={`available-${field.id}`}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="flex items-center p-2 rounded border bg-white"
                              >
                                <div className="flex-1">
                                  <div className="font-medium">{field.label}</div>
                                  <div className="text-xs text-gray-500">{field.type}</div>
                                </div>
                                <Move className="h-4 w-4 text-gray-400" />
                              </div>
                            )}
                          </Draggable>
                        ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </TabsContent>
          ))}
        </Tabs>
      </div>
      
      {/* 中间：设计画布 */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">模板设计器</h3>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setIsAddingSectionOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            添加部分
          </Button>
        </div>
        
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="sections" type="section">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="space-y-4"
              >
                {template.layout.sections
                  .sort((a, b) => a.order - b.order)
                  .map((section, index) => (
                    <Draggable
                      key={section.id}
                      draggableId={section.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className={`border rounded-lg bg-white ${
                            selectedSection === section.id ? 'ring-2 ring-primary' : ''
                          }`}
                        >
                          <div className="p-3 border-b flex items-center justify-between">
                            <div 
                              {...provided.dragHandleProps}
                              className="flex items-center gap-2"
                            >
                              <GripVertical className="h-5 w-5 text-gray-400" />
                              <h4 className="font-medium">
                                {section.title}
                                {!section.visible && (
                                  <span className="ml-2 text-gray-400 text-sm">(隐藏)</span>
                                )}
                              </h4>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleToggleSectionVisibility(section.id, !section.visible)}
                              >
                                {section.visible ? (
                                  <Eye className="h-4 w-4" />
                                ) : (
                                  <EyeOff className="h-4 w-4" />
                                )}
                              </Button>
                              
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteSection(section.id)}
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          </div>
                          
                          <Droppable droppableId={`section-${section.id}`}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className="p-4 min-h-[100px]"
                                onClick={() => setSelectedSection(section.id)}
                              >
                                {section.fields && section.fields.length > 0 ? (
                                  <div className="space-y-2">
                                    {section.fields.map((field, fieldIndex) => (
                                      <Draggable
                                        key={field.id}
                                        draggableId={field.id}
                                        index={fieldIndex}
                                      >
                                        {(provided) => (
                                          <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            className="flex items-center justify-between p-2 rounded border bg-gray-50"
                                          >
                                            <div 
                                              {...provided.dragHandleProps}
                                              className="flex items-center gap-2"
                                            >
                                              <GripVertical className="h-4 w-4 text-gray-400" />
                                              <div>
                                                <div className="font-medium">{field.label}</div>
                                                <div className="text-xs text-gray-500">
                                                  {field.type}
                                                  {!field.visible && " (隐藏)"}
                                                </div>
                                              </div>
                                            </div>
                                            
                                            <div className="flex items-center gap-1">
                                              <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleToggleFieldVisibility(section.id, field.id, !field.visible)}
                                              >
                                                {field.visible ? (
                                                  <Eye className="h-3 w-3" />
                                                ) : (
                                                  <EyeOff className="h-3 w-3" />
                                                )}
                                              </Button>
                                              
                                              <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => setEditingField(field)}
                                              >
                                                <Settings className="h-3 w-3" />
                                              </Button>
                                              
                                              <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleDeleteField(section.id, field.id)}
                                              >
                                                <Trash2 className="h-3 w-3 text-destructive" />
                                              </Button>
                                            </div>
                                          </div>
                                        )}
                                      </Draggable>
                                    ))}
                                  </div>
                                ) : (
                                  <div className="flex flex-col items-center justify-center h-[100px] text-gray-400 text-sm">
                                    <p>将字段拖动到此处</p>
                                  </div>
                                )}
                                {provided.placeholder}
                              </div>
                            )}
                          </Droppable>
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
      
      {/* 右侧：属性面板 */}
      <Sheet open={!!editingField} onOpenChange={() => setEditingField(null)}>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>字段属性</SheetTitle>
          </SheetHeader>
          
          {editingField && (
            <div className="mt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="field-label">显示名称</Label>
                <Input 
                  id="field-label" 
                  value={editingField.label}
                  onChange={(e) => {
                    const updatedField = { ...editingField, label: e.target.value };
                    setEditingField(updatedField);
                    
                    // 更新模板
                    const sectionId = selectedSection;
                    if (sectionId) {
                      const updatedTemplate = {
                        ...template,
                        layout: {
                          ...template.layout,
                          sections: template.layout.sections.map(section => {
                            if (section.id === sectionId) {
                              return {
                                ...section,
                                fields: section.fields?.map(field => 
                                  field.id === updatedField.id ? updatedField : field
                                )
                              };
                            }
                            return section;
                          })
                        }
                      };
                      
                      onUpdate(updatedTemplate);
                    }
                  }}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="field-visible"
                  checked={editingField.visible}
                  onCheckedChange={(checked) => {
                    const updatedField = { ...editingField, visible: checked };
                    setEditingField(updatedField);
                    
                    // 更新模板
                    const sectionId = selectedSection;
                    if (sectionId) {
                      const updatedTemplate = {
                        ...template,
                        layout: {
                          ...template.layout,
                          sections: template.layout.sections.map(section => {
                            if (section.id === sectionId) {
                              return {
                                ...section,
                                fields: section.fields?.map(field => 
                                  field.id === updatedField.id ? updatedField : field
                                )
                              };
                            }
                            return section;
                          })
                        }
                      };
                      
                      onUpdate(updatedTemplate);
                    }
                  }}
                />
                <Label htmlFor="field-visible">字段可见</Label>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
      
      {/* 添加节区对话框 */}
      <AlertDialog open={isAddingSectionOpen} onOpenChange={setIsAddingSectionOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>添加新部分</AlertDialogTitle>
            <AlertDialogDescription>
              请输入新部分的标题
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <div className="py-4">
            <Label htmlFor="section-title">部分标题</Label>
            <Input
              id="section-title"
              value={newSectionTitle}
              onChange={(e) => setNewSectionTitle(e.target.value)}
              className="mt-2"
            />
          </div>
          
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction onClick={handleAddSection}>添加</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
