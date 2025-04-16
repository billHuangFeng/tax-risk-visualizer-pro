import { Template } from '@pdfme/common';

export interface PdfTemplate {
  id: string;
  name: string;
  description?: string;
  previewImage?: string;
  styles: PdfTemplateStyles;
  layout: PdfTemplateLayout;
  // Base PDF template file as binary data
  baseTemplate?: ArrayBuffer | Uint8Array;
  // PDFME schema definition
  schemas?: any[][];  // Using any[][] type to match PDFME expected schema format
}

export interface PdfTemplateStyles {
  fontFamily: string;
  headingStyle: {
    fontSize: string;
    fontWeight: string;
    color: string;
    borderBottom?: string;
    marginBottom?: string;
  };
  tableStyle: {
    borderColor: string;
    headerBgColor: string;
    cellPadding: string;
  };
  formFieldStyle: {
    borderColor: string;
    padding: string;
    labelColor: string;
  };
  layout: {
    pageMargin: string;
    sectionSpacing: string;
  };
}

export interface PdfTemplateLayout {
  sections: PdfSection[];
}

export interface PdfSection {
  id: string;
  type: 'basic-info' | 'revenue-expenses' | 'tax-summary' | 'tax-adjustments' | 'custom';
  title: string;
  visible: boolean;
  order: number;
  fields?: PdfField[];
}

export interface PdfField {
  id: string;
  type: 'text' | 'number' | 'checkbox' | 'table';
  label: string;
  visible: boolean;
  sourceField?: string;
  format?: string;
  prefix?: string;
  suffix?: string;
  style?: {
    fontWeight?: string;
    color?: string;
    alignment?: 'left' | 'center' | 'right';
  };
}

export interface PdfTemplateEditorState {
  selectedTemplate: PdfTemplate;
  isEditing: boolean;
}
