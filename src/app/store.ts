import { configureStore } from "@reduxjs/toolkit";
import roleReducer from "../roles/roleSlice";
import userReducer from "../users/userSlice";
import purchaseItemReducer from "../purchaseitems/purchaseItemSlice";
import purchaseHistoryReducer from "../purchasehistories/purchaseHistorySlice";
import menuReducer from "../menus/menuSlice";
import mealTypeReducer from "../mealtypes/mealTypeSlice";
import facultyReducer from "../faculties/facultySlice";
import countryReducer from "../countries/countrySlice";
import authReducer from "../users/authSlice";

export const store = configureStore({
  reducer: {
    roles: roleReducer,
    users: userReducer,
    purchaseitems: purchaseItemReducer,
    purchasehistories: purchaseHistoryReducer,
    menus: menuReducer,
    mealTypes: mealTypeReducer,
    faculties: facultyReducer,
    countries: countryReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
