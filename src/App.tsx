import { useEffect, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn";
import { Toast } from "primereact/toast";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { LoaderState, ToastState } from "./typings";
import { clearMessage } from "./slices/toastSlice";
import AuthWrapper from "auth-wrapper";
import PrivateRoute from "private-route";
import MainPage from "pages/MainPage/MainPage";
import ProfilePage from "pages/ProfilePage/ProfilePage";
import MyAdvertisingPage from "pages/MyAdvertising/MyAdvertisingPage";
import NewAdvertisingPage from "pages/NewAdvertising/NewAdvertisingPage";
import { Loader } from "components/Loader/Loader";
import GeoReportPage from "pages/GeoReport/GeoReportPage";

function App() {
  const toastRef = useRef(null);
  const dispatch = useAppDispatch();
  const toastState: ToastState = useAppSelector((state) => state.toast);
  const loaderState: LoaderState = useAppSelector((state) => state.loader);

  useEffect(() => {
    if (!toastRef) return;
    handleMessage(toastState);
  }, [toastState]);

  const handleMessage = (toastState: ToastState) => {
    if (toastState.summary.length > 1) {
      //@ts-ignore
      toastRef.current.show({
        severity: toastState.severity,
        summary: toastState.summary,
        detail: toastState.detail,
      });
    }
  };
  return (
    <>
      <Toast ref={toastRef} onHide={() => dispatch(clearMessage())} />
      <Loader loading={loaderState.loading} />
      <Routes>
        <Route path={"/login"} element={<SignIn />} />
        <Route element={<PrivateRoute />}>
          <Route element={<AuthWrapper />}>
            <Route path={"/"} element={<MainPage />} />
            <Route path={"/profile"} element={<ProfilePage />} />
            <Route path={"/my-advertising"} element={<MyAdvertisingPage />} />
            <Route path={"/new-advertising"} element={<NewAdvertisingPage />} />
            <Route path={"/georeport"} element={<GeoReportPage />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
