import axios from "axios";
import { config } from ".";
import { useAuthStore } from "@/stores/useAuthStore";

export const apiClient = axios.create({
  baseURL: config.baseUrl + "/api",
  headers: {
    "Content-type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().authData?.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      useAuthStore.getState().unauthenticate();
    }
    return Promise.reject(error);
  }
);
