export interface MealTypeGet {
  mealTypeId: string;
  mealName: string;
  mealPrice: number;
  mealPriceId: string;
}

export interface MealTypePost {
  mealName: string;
  mealPrice: number;
  mealPriceId: string;
}

export interface MealTypePut {
  mealTypeId: string;
  mealName: string;
  mealPrice: number;
  mealPriceId: string;
}
