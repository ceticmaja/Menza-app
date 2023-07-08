export interface PurchaseHistoryGet {
  purchaseHistoryId: string;
  purchaseDate: Date;
  createdBy: string;
  status: string;
}

export interface PurchaseHistoryPost {
  purchaseDate: Date;
  createdBy: string;
  status: string;
}

export interface PurchaseHistoryPut {
  purchaseHistoryId: string;
  purchaseDate: Date;
  createdBy: string;
  status: string;
}
