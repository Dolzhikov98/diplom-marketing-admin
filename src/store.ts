import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { authSlice } from "./slices/authSlice";
import toastSlice from "./slices/toastSlice";
import loaderSlice from "slices/loaserSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    toast: toastSlice.reducer,
    loader: loaderSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
