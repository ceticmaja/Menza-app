import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserGet, UserPost, UserPut } from "./userModel";
import { apiAddress } from "../app/apiModel";

const token = localStorage.getItem("token");
const bearerToken = "Bearer " + token;

export const GetAllUsers = createAsyncThunk(
  "get/users",
  async (): Promise<[UserGet]> => {
    const response = await fetch(apiAddress + "User", {
      method: "GET",
      headers: {
        Authorization: bearerToken,
      },
    }).then((response) => response.json());
    return await response;
  }
);

export const GetUserById = createAsyncThunk(
  "get/user",
  async (id: string): Promise<UserGet> => {
    const response = await fetch(apiAddress + "User/" + id, {
      method: "GET",
      headers: {
        Authorization: bearerToken,
      },
    }).then((response) => response.json());
    return await response;
  }
);

export const PostUser = createAsyncThunk("post/user", async (obj: UserPost) => {
  fetch(apiAddress + "User", {
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

export const PutUser = createAsyncThunk("put/user", async (obj: UserPut) => {
  fetch(apiAddress + "User", {
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

export const DeleteUser = createAsyncThunk(
  "delete/user",
  async (id: string) => {
    fetch(apiAddress + "User/" + id, {
      method: "DELETE",
      headers: {
        Authorization: bearerToken,
      },
    })
      .then((response) => response.status)
      .then((t) => console.log(t));
  }
);

interface UserState {
  loading: boolean;
  allUsers: UserGet[];
  user: UserGet;
}

const initialUser: UserGet = {
  id: "",
  name: "",
  surname: "",
  dateOfBirth: new Date(0),
  address: "",
  city: "",
  country: {
    countryId: "",
    countryName: "",
  },
  faculty: {
    facultyId: "",
    facultyName: "",
    facultyCity: "",
  },
  email: "",
  userName: "",
};

const initialState: UserState = {
  loading: false,
  allUsers: [],
  user: initialUser,
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //GetAllUsers
      .addCase(GetAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetAllUsers.fulfilled, (state, action) => {
        state.allUsers = action.payload;
        state.loading = false;
      })
      .addCase(GetAllUsers.rejected, (state) => {
        state.loading = false;
      })
      //GetUserById
      .addCase(GetUserById.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetUserById.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(GetUserById.rejected, (state) => {
        state.loading = false;
      })
      //PostUser
      .addCase(PostUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(PostUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(PostUser.rejected, (state) => {
        state.loading = false;
      })
      //PutUser
      .addCase(PutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(PutUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(PutUser.rejected, (state) => {
        state.loading = false;
      })
      //DeleteUser
      .addCase(DeleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(DeleteUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(DeleteUser.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default userSlice.reducer;
