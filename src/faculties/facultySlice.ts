import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FacultyGet, FacultyPost, FacultyPut } from "./facultyModel";
import { apiAddress } from "../app/apiModel";

const token = localStorage.getItem("token");
const bearerToken = "Bearer " + token;

export const GetAllFaculties = createAsyncThunk(
  "get/faculties",
  async (): Promise<[FacultyGet]> => {
    const response = await fetch(apiAddress + "Faculty", {
      method: "GET",
      headers: {
        Authorization: bearerToken,
      },
    }).then((response) => response.json());
    return await response;
  }
);

export const GetFacultyById = createAsyncThunk(
  "get/faculty",
  async (id: string): Promise<FacultyGet> => {
    const response = await fetch(apiAddress + "Faculty/" + id, {
      method: "GET",
      headers: {
        Authorization: bearerToken,
      },
    }).then((response) => response.json());
    return await response;
  }
);

export const PostFaculty = createAsyncThunk(
  "post/faculty",
  async (obj: FacultyPost) => {
    fetch(apiAddress + "Faculty", {
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

export const PutFaculty = createAsyncThunk(
  "put/faculty",
  async (obj: FacultyPut) => {
    fetch(apiAddress + "Faculty", {
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

export const DeleteFaculty = createAsyncThunk(
  "delete/faculty",
  async (id: string) => {
    fetch(apiAddress + "Faculty/" + id, {
      method: "DELETE",
      headers: {
        Authorization: bearerToken,
      },
    })
      .then((response) => response.status)
      .then((t) => console.log(t));
  }
);

interface FacultyState {
  loading: boolean;
  allFaculties: FacultyGet[];
  faculty: FacultyGet;
}

const initialFaculty: FacultyGet = {
  facultyId: "",
  facultyName: "",
  facultyCity: "",
  facultyAddress: "",
};

const initialState: FacultyState = {
  loading: false,
  allFaculties: [],
  faculty: initialFaculty,
};

export const facultySlice = createSlice({
  name: "faculties",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //GetAllFaculties
      .addCase(GetAllFaculties.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetAllFaculties.fulfilled, (state, action) => {
        state.allFaculties = action.payload;
        state.loading = false;
      })
      .addCase(GetAllFaculties.rejected, (state) => {
        state.loading = false;
      })
      //GetFacultyById
      .addCase(GetFacultyById.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetFacultyById.fulfilled, (state, action) => {
        state.faculty = action.payload;
        state.loading = false;
      })
      .addCase(GetFacultyById.rejected, (state) => {
        state.loading = false;
      })
      //PostFaculty
      .addCase(PostFaculty.pending, (state) => {
        state.loading = true;
      })
      .addCase(PostFaculty.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(PostFaculty.rejected, (state) => {
        state.loading = false;
      })
      //PutFaculty
      .addCase(PutFaculty.pending, (state) => {
        state.loading = true;
      })
      .addCase(PutFaculty.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(PutFaculty.rejected, (state) => {
        state.loading = false;
      })
      //DeleteFaculty
      .addCase(DeleteFaculty.pending, (state) => {
        state.loading = true;
      })
      .addCase(DeleteFaculty.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(DeleteFaculty.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default facultySlice.reducer;
