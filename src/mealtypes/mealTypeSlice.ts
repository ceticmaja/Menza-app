import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MealTypeGet, MealTypePost, MealTypePut } from "./mealTypeModel";
import { apiAddress } from "../app/apiModel";

const token = localStorage.getItem("token");
const bearerToken = "Bearer " + token;

export const GetAllMealTypes = createAsyncThunk(
  "get/mealTypes",
  async (): Promise<[MealTypeGet]> => {
    const response = await fetch(apiAddress + "MealType", {
      method: "GET",
      headers: {
        Authorization: bearerToken,
      },
    }).then((response) => response.json());
    return await response;
  }
);

export const GetMealTypeById = createAsyncThunk(
  "get/mealType",
  async (id: string): Promise<MealTypeGet> => {
    const response = await fetch(apiAddress + "MealType/" + id, {
      method: "GET",
      headers: {
        Authorization: bearerToken,
      },
    }).then((response) => response.json());
    return await response;
  }
);

export const PostMealType = createAsyncThunk(
  "post/mealType",
  async (obj: MealTypePost) => {
    fetch(apiAddress + "MealType", {
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

export const PutMealType = createAsyncThunk(
  "put/mealType",
  async (obj: MealTypePut) => {
    fetch(apiAddress + "MealType", {
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

export const DeleteMealType = createAsyncThunk(
  "delete/mealType",
  async (id: string) => {
    fetch(apiAddress + "MealType/" + id, {
      method: "DELETE",
      headers: {
        Authorization: bearerToken,
      },
    })
      .then((response) => response.status)
      .then((t) => console.log(t));
  }
);

interface MealTypeState {
  loading: boolean;
  allMealTypes: MealTypeGet[];
  mealType: MealTypeGet;
}

const initialMealType: MealTypeGet = {
  mealTypeId: "",
  mealName: "",
  mealPrice: 0,
  mealPriceId: "",
};

const initialState: MealTypeState = {
  loading: false,
  allMealTypes: [],
  mealType: initialMealType,
};

export const mealTypeSlice = createSlice({
  name: "mealTypes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //GetAllMealTypes
      .addCase(GetAllMealTypes.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetAllMealTypes.fulfilled, (state, action) => {
        state.allMealTypes = action.payload;
        state.loading = false;
      })
      .addCase(GetAllMealTypes.rejected, (state) => {
        state.loading = false;
      })
      //GetMealTypeById
      .addCase(GetMealTypeById.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetMealTypeById.fulfilled, (state, action) => {
        state.mealType = action.payload;
        state.loading = false;
      })
      .addCase(GetMealTypeById.rejected, (state) => {
        state.loading = false;
      })
      //PostMealType
      .addCase(PostMealType.pending, (state) => {
        state.loading = true;
      })
      .addCase(PostMealType.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(PostMealType.rejected, (state) => {
        state.loading = false;
      })
      //PutMealType
      .addCase(PutMealType.pending, (state) => {
        state.loading = true;
      })
      .addCase(PutMealType.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(PutMealType.rejected, (state) => {
        state.loading = false;
      })
      //DeleteMealType
      .addCase(DeleteMealType.pending, (state) => {
        state.loading = true;
      })
      .addCase(DeleteMealType.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(DeleteMealType.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default mealTypeSlice.reducer;
