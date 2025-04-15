
export interface TaxInfoItem {
  title: string;
  description: string;
  analysis: string;
  risk: string;
}

export interface InfoData {
  [key: string]: TaxInfoItem;
}
