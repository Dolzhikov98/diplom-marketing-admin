import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
};

const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    openLoader(state) {
      state.loading = true;
    },
    closeLoader(state) {
      state.loading = false;
    },
  },
});

export const { openLoader, closeLoader } = loaderSlice.actions;

export default loaderSlice;
