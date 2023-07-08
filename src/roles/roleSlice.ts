import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RoleGet, RolePost, RolePut } from "./roleModel";
import { apiAddress } from "../app/apiModel";

const token = localStorage.getItem("token");
const bearerToken = "Bearer " + token;

export const GetAllRoles = createAsyncThunk(
  "get/roles",
  async (): Promise<[RoleGet]> => {
    const response = await fetch(apiAddress + "Role", {
      method: "GET",
      headers: {
        Authorization: bearerToken,
      },
    }).then((response) => response.json());
    return await response;
  }
);

export const GetRoleById = createAsyncThunk(
  "get/role",
  async (id: string): Promise<RoleGet> => {
    const response = await fetch(apiAddress + "Role/" + id, {
      method: "GET",
      headers: {
        Authorization: bearerToken,
      },
    }).then((response) => response.json());
    return await response;
  }
);

export const PostRole = createAsyncThunk("post/role", async (obj: RolePost) => {
  fetch(apiAddress + "Role", {
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

export const PutRole = createAsyncThunk("put/role", async (obj: RolePut) => {
  fetch(apiAddress + "Role", {
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

export const DeleteRole = createAsyncThunk(
  "delete/role",
  async (id: string) => {
    fetch(apiAddress + "Role/" + id, {
      method: "DELETE",
      headers: {
        Authorization: bearerToken,
      },
    })
      .then((response) => response.status)
      .then((t) => console.log(t));
  }
);

interface RoleState {
  loading: boolean;
  allRoles: RoleGet[];
  role: RoleGet;
}

const initialRole: RoleGet = {
  id: "",
  name: "",
};

const initialState: RoleState = {
  loading: false,
  allRoles: [],
  role: initialRole,
};

export const roleSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //GetAllRoles
      .addCase(GetAllRoles.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetAllRoles.fulfilled, (state, action) => {
        state.allRoles = action.payload;
        state.loading = false;
      })
      .addCase(GetAllRoles.rejected, (state) => {
        state.loading = false;
      })
      //GetRoleById
      .addCase(GetRoleById.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetRoleById.fulfilled, (state, action) => {
        state.role = action.payload;
        state.loading = false;
      })
      .addCase(GetRoleById.rejected, (state) => {
        state.loading = false;
      })
      //PostRole
      .addCase(PostRole.pending, (state) => {
        state.loading = true;
      })
      .addCase(PostRole.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(PostRole.rejected, (state) => {
        state.loading = false;
      })
      //PutRole
      .addCase(PutRole.pending, (state) => {
        state.loading = true;
      })
      .addCase(PutRole.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(PutRole.rejected, (state) => {
        state.loading = false;
      })
      //DeleteRole
      .addCase(DeleteRole.pending, (state) => {
        state.loading = true;
      })
      .addCase(DeleteRole.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(DeleteRole.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default roleSlice.reducer;
