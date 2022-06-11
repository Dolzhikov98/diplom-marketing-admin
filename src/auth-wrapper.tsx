import { useAppDispatch } from "hooks/hooks";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { getUserByToken } from "slices/authSlice";

const AuthWrapper = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getMe = async () => {
      await dispatch(getUserByToken());
    };
    getMe();
  }, []);

  return <Outlet />;
};

export default AuthWrapper;
