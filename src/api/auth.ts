import axios from "axios";
import { API_URL } from "../constants/config";
import http from "./https";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

export const axiosLogin = async (email: string, password: string) =>
  await axiosInstance.get(`/auth/login?email=${email}&password=${password}`);

export const axiosChangePassword = async (oldPassword: string, password: string) => {
  const token = localStorage.getItem("token");
  return await axiosInstance.post(
    "/users/changePassword",
    { oldPassword, password },
    { headers: { Authorization: `Bearer: ${token}` } }
  );
};

export const axiosForgetPassword = async (email: string) => {
  return await axiosInstance.post("/users/forgotPassword", { email });
};

export const axiosSetPassword = async (password: string, confirmToken: string) => {
  return await axiosInstance.post("/users/setPassword", { password, confirmToken });
};

export const getUser = () => http.get("/user/me");
