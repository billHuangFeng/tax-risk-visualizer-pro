
export interface TaxInfoPanelItem {
  title: string;
  description: string;
  analysis: string;
  risk: string;
}

export interface TaxInfoData {
  [key: string]: TaxInfoPanelItem;
}
