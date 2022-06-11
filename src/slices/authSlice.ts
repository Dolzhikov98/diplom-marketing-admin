import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  axiosForgetPassword,
  axiosChangePassword,
  axiosLogin,
  axiosSetPassword,
  getUser,
} from "../api/auth";
import { ChangePasswordInterface } from "../typings";

const initialState = {
  email: "",
  name: "",
};

export const login = createAsyncThunk(
  "login",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosLogin(email, password);
      localStorage.setItem("token", response.data);
    } catch (err) {
      //@ts-ignore
      return rejectWithValue(err.response.data);
    }
  }
);

export const changePassword = createAsyncThunk(
  "changePassword",
  async (body: ChangePasswordInterface, { rejectWithValue }) => {
    try {
      const { data } = await axiosChangePassword(
        body.oldPassword,
        body.password
      );
      return data;
    } catch (err) {
      //@ts-ignore
      return rejectWithValue(err.response.data);
    }
  }
);
export const resetPassword = createAsyncThunk(
  "resetPassword",
  async (email: string, { rejectWithValue }) => {
    try {
      const { data } = await axiosForgetPassword(email);
      return data;
    } catch (err) {
      //@ts-ignore
      return rejectWithValue(err.response.data);
    }
  }
);

export const setPassword = createAsyncThunk(
  "setPassword",
  async (
    { password, confirmToken }: { password: string; confirmToken: string },
    { rejectWithValue }
  ) => {
    try {
      await axiosSetPassword(password, confirmToken);
    } catch (err) {
      //@ts-ignore
      return rejectWithValue(err.response.data);
    }
  }
);

export const getUserByToken = createAsyncThunk(
  "getUserByToken",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await getUser();
      return data;
    } catch (err) {
      //@ts-ignore
      return rejectWithValue(err.response.data);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state = initialState;
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetPassword.fulfilled, (state, action) => {});
    builder.addCase(getUserByToken.fulfilled, (state, action) => {
      const { name, email } = action.payload;
      state = { name, email };
      return state;
    });
    builder.addCase(getUserByToken.rejected, (state, action) => {
      localStorage.clear();
    });
  },
});

export const { logout } = authSlice.actions;
