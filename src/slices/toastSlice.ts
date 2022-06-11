import { createSlice } from "@reduxjs/toolkit";
import { ToastState } from "../typings";

const initialState: ToastState = {
  severity: "",
  summary: "",
  detail: "",
};

const toastSlice = createSlice({
  name: "toasts",
  initialState,
  reducers: {
    addSuccessMessage: (state: ToastState, action) => {
      const message = action.payload;
      state.severity = "success";
      state.summary = "Успешно";
      state.detail = message;
    },
    addErrorMessage: (state: ToastState, action) => {
      const message = action.payload;
      state.severity = "error";
      state.summary = "Ошибка";
      state.detail = message;
    },
    clearMessage: () => initialState,
  },
});
export const { addSuccessMessage, addErrorMessage, clearMessage } = toastSlice.actions;
export default toastSlice;
