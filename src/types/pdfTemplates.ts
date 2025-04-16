
// These are placeholder types for components that still reference PDF functionality
// This file exists to prevent type errors after PDF export functionality was removed

export interface PdfTemplate {
  id: string;
  name: string;
  config: any;
}

export interface PdfField {
  id: string;
  name: string;
  type: string;
}

export interface PdfTemplateConfig {
  fields: PdfField[];
  styles: any;
}

export interface PageFormat {
  width: number;
  height: number;
  orientation: 'portrait' | 'landscape';
  marginTop: number;
  marginRight: number;
  marginBottom: number;
  marginLeft: number;
}

export interface TemplateStyle {
  id: string;
  name: string;
  fontFamily: string;
  fontSize: number;
  color: string;
  backgroundColor?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  alignment?: 'left' | 'center' | 'right';
}
