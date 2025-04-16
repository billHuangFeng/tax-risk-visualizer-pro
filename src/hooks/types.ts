
export interface VatSalesItem {
  id: string;
  productName: string;
  salesAmount: number;
  vatRate: number;
  outputTax: number;
}

export interface VatPurchaseItem {
  id: string;
  productName: string;
  purchaseAmount: number;
  vatRate: number;
  inputTax: number;
}

export interface DifferenceFactor {
  id: string;
  description: string;
  amount: number;
}

export interface DifferenceExplanation {
  id: string;
  reason: string;
  amount: number;
}
