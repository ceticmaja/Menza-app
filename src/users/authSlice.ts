import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiAddress } from "../app/apiModel";
import { UserPost, UserRole, UserSignIn } from "./userModel";
import { RolePost } from "../roles/roleModel";

export const SignUp = createAsyncThunk("post/signUp", async (obj: UserPost) => {
  console.log(obj);
  fetch(apiAddress + "Auth/SignUp", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((t) => console.log(t));
});

export const SignIn = createAsyncThunk(
  "post/signIn",
  async (obj: UserSignIn) => {
    const signInResponse = await fetch(apiAddress + "Auth/SignIn", {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((response) => response.json());
    localStorage.setItem("token", signInResponse.token);
    localStorage.setItem("userId", signInResponse.userId);
    localStorage.setItem("role", signInResponse.roles[0]);
    localStorage.setItem("userFullName", signInResponse.userFullName);
  }
);

export const CreateRole = createAsyncThunk(
  "post/createRole",
  async (obj: RolePost) => {
    fetch(apiAddress + "Auth/Roles", {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.status)
      .then((t) => console.log(t));
  }
);

export const CreateUserRole = createAsyncThunk(
  "post/userRole",
  async (obj: UserRole) => {
    fetch(apiAddress + "Auth/UserRole", {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.status)
      .then((t) => console.log(t));
  }
);

interface AuthState {
  loading: boolean;
  token: string;
  userId: string;
  roles: string[];
  userFullName: string;
}

const initialState: AuthState = {
  loading: false,
  token: "",
  userId: "",
  roles: [],
  userFullName: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //SignUp
      .addCase(SignUp.pending, (state) => {
        state.loading = true;
      })
      .addCase(SignUp.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(SignUp.rejected, (state) => {
        state.loading = false;
      })
      //SignIn
      .addCase(SignIn.pending, (state) => {
        state.loading = true;
      })
      .addCase(SignIn.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(SignIn.rejected, (state) => {
        state.loading = false;
      })
      //CreateRole
      .addCase(CreateRole.pending, (state) => {
        state.loading = true;
      })
      .addCase(CreateRole.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(CreateRole.rejected, (state) => {
        state.loading = false;
      })
      //CreateUserRole
      .addCase(CreateUserRole.pending, (state) => {
        state.loading = true;
      })
      .addCase(CreateUserRole.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(CreateUserRole.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default authSlice.reducer;
