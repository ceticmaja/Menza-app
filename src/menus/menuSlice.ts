import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MenuGet, MenuPost, MenuPut } from "./menuModel";
import { apiAddress } from "../app/apiModel";

const token = localStorage.getItem("token");
const bearerToken = "Bearer " + token;

export const GetAllMenus = createAsyncThunk(
  "get/menus",
  async (): Promise<[MenuGet]> => {
    const response = await fetch(apiAddress + "Menu", {
      method: "GET",
      headers: {
        Authorization: bearerToken,
      },
    }).then((response) => response.json());
    return await response;
  }
);

export const GetMenuById = createAsyncThunk(
  "get/menu",
  async (id: string): Promise<MenuGet> => {
    const response = await fetch(apiAddress + "Menu/" + id, {
      method: "GET",
      headers: {
        Authorization: bearerToken,
      },
    }).then((response) => response.json());
    return await response;
  }
);

export const PostMenu = createAsyncThunk("post/menu", async (obj: MenuPost) => {
  fetch(apiAddress + "Menu", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: bearerToken,
    },
  })
    .then((response) => response.status)
    .then((t) => console.log(t));
});

export const PutMenu = createAsyncThunk("put/menu", async (obj: MenuPut) => {
  fetch(apiAddress + "Menu", {
    method: "PUT",
    body: JSON.stringify(obj),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: bearerToken,
    },
  })
    .then((response) => response.status)
    .then((t) => console.log(t));
});

export const DeleteMenu = createAsyncThunk(
  "delete/menu",
  async (id: string) => {
    fetch(apiAddress + "Menu/" + id, {
      method: "DELETE",
      headers: {
        Authorization: bearerToken,
      },
    })
      .then((response) => response.status)
      .then((t) => console.log(t));
  }
);

interface MenuState {
  loading: boolean;
  allMenus: MenuGet[];
  menu: MenuGet;
}

const initialMenu: MenuGet = {
  menuId: "",
  publishDate: new Date(0),
  editDate: new Date(0),
  description: "",
  user: {
    id: "",
  },
};

const initialState: MenuState = {
  loading: false,
  allMenus: [],
  menu: initialMenu,
};

export const menuSlice = createSlice({
  name: "menus",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //GetAllMenus
      .addCase(GetAllMenus.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetAllMenus.fulfilled, (state, action) => {
        state.allMenus = action.payload;
        state.loading = false;
      })
      .addCase(GetAllMenus.rejected, (state) => {
        state.loading = false;
      })
      //GetMenuById
      .addCase(GetMenuById.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetMenuById.fulfilled, (state, action) => {
        state.menu = action.payload;
        state.loading = false;
      })
      .addCase(GetMenuById.rejected, (state) => {
        state.loading = false;
      })
      //PostMenu
      .addCase(PostMenu.pending, (state) => {
        state.loading = true;
      })
      .addCase(PostMenu.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(PostMenu.rejected, (state) => {
        state.loading = false;
      })
      //PutMenu
      .addCase(PutMenu.pending, (state) => {
        state.loading = true;
      })
      .addCase(PutMenu.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(PutMenu.rejected, (state) => {
        state.loading = false;
      })
      //DeleteMenu
      .addCase(DeleteMenu.pending, (state) => {
        state.loading = true;
      })
      .addCase(DeleteMenu.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(DeleteMenu.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default menuSlice.reducer;
