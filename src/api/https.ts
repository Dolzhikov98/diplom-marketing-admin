import axios from "axios";
import { API_URL } from "../constants/config";

const http = axios.create({
  baseURL: API_URL,
});

http.interceptors.request.use(
  (config) => {
    const key = localStorage.getItem("token");
    if (key) {
      config.headers = {
        "access-token": `${key}`,
      };
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// const refreshAccessToken = () => {
//   const refreshToken = localStorage.getItem("refresh_token");
//   if (!refreshToken) return;
//   return http.post("auth/token/refresh/", { refresh: refreshToken });
// };

http.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (
      ((error.response && error.response.status === 403) ||
        (error.response && error.response.status === 401)) &&
      !originalRequest._retry
    ) {
      // localStorage.removeItem("token");
      // originalRequest._retry = true;
      //   const access_token = await refreshAccessToken();
      // axios.defaults.headers.common["Authorization"] = "Bearer " + access_token.data.access;
      //   localStorage.setItem("access_token", access_token.data.access);
      // return http(originalRequest);
    }
    return Promise.reject(error);
  }
);

const get = (url: string, headers = {}, params = {}) => {
  return http.get(url, {
    ...params,
    headers: {
      ...headers,
    },
  });
};

const post = (url: string, data: any, headers = {}, params = {}) => {
  return http.post(url, data, {
    ...params,
    headers: {
      ...headers,
    },
  });
};

const put = (url: string, data: any, headers = {}) => {
  return http.put(url, data, {
    headers: {
      ...headers,
    },
  });
};

const remove = (url: string, data?: any, headers = {}) => {
  return http.delete(url, {
    headers: {
      ...headers,
    },
    data,
  });
};
const patch = (url: string, data: any, headers = {}) => {
  return http.patch(url, data, {
    headers: {
      ...headers,
    },
  });
};

export default {
  http,
  get,
  post,
  put,
  remove,
  patch,
};
