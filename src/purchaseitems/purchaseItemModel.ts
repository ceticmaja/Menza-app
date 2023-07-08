export interface PurchaseItemGet {
  purchaseItemId: string;
  purchaseQuantity: string;
  purchaseHistory: { purchaseHistoryId: string; purchaseDate: Date };
  mealType: { mealTypeId: string; mealName: string };
}

export interface PurchaseItemPost {
  purchaseQuantity: string;
  purchaseHistoryId: string;
  mealTypeId: string;
}

export interface PurchaseItemPut {
  purchaseItemId: string;
  purchaseQuantity: string;
  purchaseHistoryId: string;
  mealTypeId: string;
}
