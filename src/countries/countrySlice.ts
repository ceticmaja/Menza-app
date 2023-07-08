import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CountryGet, CountryPost, CountryPut } from "./countryModel";
import { apiAddress } from "../app/apiModel";

const token = localStorage.getItem("token");
const bearerToken = "Bearer " + token;

export const GetAllCountries = createAsyncThunk(
  "get/countries",
  async (): Promise<[CountryGet]> => {
    const response = await fetch(apiAddress + "Country", {
      method: "GET",
      headers: {
        Authorization: bearerToken,
      },
    }).then((response) => response.json());
    return await response;
  }
);

export const GetCountryById = createAsyncThunk(
  "get/country",
  async (id: string): Promise<CountryGet> => {
    const response = await fetch(apiAddress + "Country/" + id, {
      method: "GET",
      headers: {
        Authorization: bearerToken,
      },
    }).then((response) => response.json());
    return await response;
  }
);

export const PostCountry = createAsyncThunk(
  "post/country",
  async (obj: CountryPost) => {
    fetch(apiAddress + "Country", {
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

export const PutCountry = createAsyncThunk(
  "put/country",
  async (obj: CountryPut) => {
    fetch(apiAddress + "Country", {
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

export const DeleteCountry = createAsyncThunk(
  "delete/country",
  async (id: string) => {
    fetch(apiAddress + "Country/" + id, {
      method: "DELETE",
      headers: {
        Authorization: bearerToken,
      },
    })
      .then((response) => response.status)
      .then((t) => console.log(t));
  }
);

interface CountryState {
  loading: boolean;
  allCountries: CountryGet[];
  country: CountryGet;
}

const initialCountry: CountryGet = {
  countryId: "",
  countryName: "",
};

const initialState: CountryState = {
  loading: false,
  allCountries: [],
  country: initialCountry,
};

export const countrySlice = createSlice({
  name: "countries",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //GetAllCountries
      .addCase(GetAllCountries.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetAllCountries.fulfilled, (state, action) => {
        state.allCountries = action.payload;
        state.loading = false;
      })
      .addCase(GetAllCountries.rejected, (state) => {
        state.loading = false;
      })
      //GetCountryById
      .addCase(GetCountryById.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetCountryById.fulfilled, (state, action) => {
        state.country = action.payload;
        state.loading = false;
      })
      .addCase(GetCountryById.rejected, (state) => {
        state.loading = false;
      })
      //PostCountry
      .addCase(PostCountry.pending, (state) => {
        state.loading = true;
      })
      .addCase(PostCountry.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(PostCountry.rejected, (state) => {
        state.loading = false;
      })
      //PutCountry
      .addCase(PutCountry.pending, (state) => {
        state.loading = true;
      })
      .addCase(PutCountry.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(PutCountry.rejected, (state) => {
        state.loading = false;
      })
      //DeleteCountry
      .addCase(DeleteCountry.pending, (state) => {
        state.loading = true;
      })
      .addCase(DeleteCountry.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(DeleteCountry.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default countrySlice.reducer;
