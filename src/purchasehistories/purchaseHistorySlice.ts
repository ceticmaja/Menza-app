import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  PurchaseHistoryGet,
  PurchaseHistoryPost,
  PurchaseHistoryPut,
} from "./purchaseHistoryModel";
import { apiAddress } from "../app/apiModel";

const token = localStorage.getItem("token");
const bearerToken = "Bearer " + token;

export const GetAllPurchaseHistories = createAsyncThunk(
  "get/purchaseHistories",
  async (): Promise<[PurchaseHistoryGet]> => {
    const response = await fetch(apiAddress + "PurchaseHistory", {
      method: "GET",
      headers: {
        Authorization: bearerToken,
      },
    }).then((response) => response.json());
    return await response;
  }
);

export const GetAllPurchaseHistoriesByCreatedBy = createAsyncThunk(
  "get/purchaseHistoriesCreatedBy",
  async (id: string): Promise<[PurchaseHistoryGet]> => {
    const response = await fetch(apiAddress + "PurchaseHistory", {
      method: "GET",
      headers: {
        Authorization: bearerToken,
      },
    }).then((response) => response.json());
    return await response;
  }
);

export const GetPurchaseHistoryById = createAsyncThunk(
  "get/purchaseHistory",
  async (id: string): Promise<PurchaseHistoryGet> => {
    const response = await fetch(apiAddress + "PurchaseHistory/" + id, {
      method: "GET",
      headers: {
        Authorization: bearerToken,
      },
    }).then((response) => response.json());
    return await response;
  }
);

export const PostPurchaseHistory = createAsyncThunk(
  "post/purchaseHistory",
  async (obj: PurchaseHistoryPost) => {
    fetch(apiAddress + "PurchaseHistory", {
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

export const PutPurchaseHistory = createAsyncThunk(
  "put/purchaseHistory",
  async (obj: PurchaseHistoryPut) => {
    fetch(apiAddress + "PurchaseHistory", {
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

export const DeletePurchaseHistory = createAsyncThunk(
  "delete/purchaseHistory",
  async (id: string) => {
    fetch(apiAddress + "PurchaseHistory/" + id, {
      method: "DELETE",
      headers: {
        Authorization: bearerToken,
      },
    })
      .then((response) => response.status)
      .then((t) => console.log(t));
  }
);

interface PurchaseHistoryState {
  loading: boolean;
  allPurchaseHistories: PurchaseHistoryGet[];
  purchaseHistory: PurchaseHistoryGet;
}

const initialPurchaseHistory: PurchaseHistoryGet = {
  purchaseHistoryId: "",
  purchaseDate: new Date(0),
  createdBy: "",
  status: "",
};

const initialState: PurchaseHistoryState = {
  loading: false,
  allPurchaseHistories: [],
  purchaseHistory: initialPurchaseHistory,
};

export const purchaseHistorySlice = createSlice({
  name: "purchaseHistories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //GetAllPurchaseHistories
      .addCase(GetAllPurchaseHistories.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetAllPurchaseHistories.fulfilled, (state, action) => {
        state.allPurchaseHistories = action.payload;
        state.loading = false;
      })
      .addCase(GetAllPurchaseHistories.rejected, (state) => {
        state.loading = false;
      })
      //GetPurchaseHistoryById
      .addCase(GetPurchaseHistoryById.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetPurchaseHistoryById.fulfilled, (state, action) => {
        state.purchaseHistory = action.payload;
        state.loading = false;
      })
      .addCase(GetPurchaseHistoryById.rejected, (state) => {
        state.loading = false;
      })
      //PostPurchaseHistory
      .addCase(PostPurchaseHistory.pending, (state) => {
        state.loading = true;
      })
      .addCase(PostPurchaseHistory.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(PostPurchaseHistory.rejected, (state) => {
        state.loading = false;
      })
      //PutPurchaseHistory
      .addCase(PutPurchaseHistory.pending, (state) => {
        state.loading = true;
      })
      .addCase(PutPurchaseHistory.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(PutPurchaseHistory.rejected, (state) => {
        state.loading = false;
      })
      //DeletePurchaseHistory
      .addCase(DeletePurchaseHistory.pending, (state) => {
        state.loading = true;
      })
      .addCase(DeletePurchaseHistory.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(DeletePurchaseHistory.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default purchaseHistorySlice.reducer;
