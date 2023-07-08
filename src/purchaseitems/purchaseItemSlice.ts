import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  PurchaseItemGet,
  PurchaseItemPost,
  PurchaseItemPut,
} from "./purchaseItemModel";
import { apiAddress } from "../app/apiModel";

const token = localStorage.getItem("token");
const bearerToken = "Bearer " + token;

export const GetAllPurchaseItems = createAsyncThunk(
  "get/purchaseItems",
  async (): Promise<[PurchaseItemGet]> => {
    const response = await fetch(apiAddress + "PurchaseItem", {
      method: "GET",
      headers: {
        Authorization: bearerToken,
      },
    }).then((response) => response.json());
    return await response;
  }
);

export const GetPurchaseItemById = createAsyncThunk(
  "get/purchaseItem",
  async (id: string): Promise<PurchaseItemGet> => {
    const response = await fetch(apiAddress + "PurchaseItem/" + id, {
      method: "GET",
      headers: {
        Authorization: bearerToken,
      },
    }).then((response) => response.json());
    return await response;
  }
);

export const PostPurchaseItem = createAsyncThunk(
  "post/purchaseItem",
  async (obj: PurchaseItemPost) => {
    fetch(apiAddress + "PurchaseItem", {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: bearerToken,
      },
    })
      .then((response) => response.status)
      .then((t) => console.log(t));
  }
);

export const PutPurchaseItem = createAsyncThunk(
  "put/purchaseItem",
  async (obj: PurchaseItemPut) => {
    fetch(apiAddress + "PurchaseItem", {
      method: "PUT",
      body: JSON.stringify(obj),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: bearerToken,
      },
    })
      .then((response) => response.status)
      .then((t) => console.log(t));
  }
);

export const DeletePurchaseItem = createAsyncThunk(
  "delete/purchaseItem",
  async (id: string) => {
    fetch(apiAddress + "PurchaseItem/" + id, {
      method: "DELETE",
      headers: {
        Authorization: bearerToken,
      },
    })
      .then((response) => response.status)
      .then((t) => console.log(t));
  }
);

interface PurchaseItemState {
  loading: boolean;
  allPurchaseItems: PurchaseItemGet[];
  purchaseItem: PurchaseItemGet;
}

const initialPurchaseItem: PurchaseItemGet = {
  purchaseItemId: "",
  purchaseQuantity: "",
  purchaseHistory: {
    purchaseHistoryId: "",
    purchaseDate: new Date(0),
  },
  mealType: {
    mealTypeId: "",
    mealName: "",
  },
};

const initialState: PurchaseItemState = {
  loading: false,
  allPurchaseItems: [],
  purchaseItem: initialPurchaseItem,
};

export const purchaseItemSlice = createSlice({
  name: "purchaseItems",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //GetAllPurchaseItems
      .addCase(GetAllPurchaseItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetAllPurchaseItems.fulfilled, (state, action) => {
        state.allPurchaseItems = action.payload;
        state.loading = false;
      })
      .addCase(GetAllPurchaseItems.rejected, (state) => {
        state.loading = false;
      })
      //GetPurchaseItemById
      .addCase(GetPurchaseItemById.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetPurchaseItemById.fulfilled, (state, action) => {
        state.purchaseItem = action.payload;
        state.loading = false;
      })
      .addCase(GetPurchaseItemById.rejected, (state) => {
        state.loading = false;
      })
      //PostPurchaseItem
      .addCase(PostPurchaseItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(PostPurchaseItem.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(PostPurchaseItem.rejected, (state) => {
        state.loading = false;
      })
      //PutPurchaseItem
      .addCase(PutPurchaseItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(PutPurchaseItem.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(PutPurchaseItem.rejected, (state) => {
        state.loading = false;
      })
      //DeletePurchaseItem
      .addCase(DeletePurchaseItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(DeletePurchaseItem.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(DeletePurchaseItem.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default purchaseItemSlice.reducer;
