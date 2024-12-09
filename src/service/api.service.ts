import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import type { ApiEndpoints } from "../types/api.types";

const API_URL = "https://backend-av2-4seg.onrender.com";

// Criar instância do axios
const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Variáveis para controle do refresh
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

// Processa a fila de requisições que falharam
const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token!);
    }
  });
  failedQueue = [];
};

// Estender o tipo para incluir _retry
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        // Se já está renovando, adiciona à fila
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const response = await axiosInstance.get("/api/token/refresh", {
          headers: { Authorization: `Bearer ${refreshToken}` },
        });

        const { accessToken } = response.data;
        localStorage.setItem("accessToken", accessToken);

        processQueue(null, accessToken);
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login/signin";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

// API methods usando a instância configurada
export const api = {
  auth: {
    async login(data: ApiEndpoints["auth"]["login"]["body"]) {
      const response = await axiosInstance.post("/api/login", data);
      console.log("[API] Login response:", response.data);
      return response.data;
    },
    async logout() {
      const response = await axiosInstance.post("/api/logout");
      console.log("[API] Logout response:", response.data);
      return response.data;
    },
  },
  token: {
    async refresh(refreshToken: string) {
      const response = await axiosInstance.get("/api/token/refresh", {
        headers: { Authorization: `Bearer ${refreshToken}` },
      });
      console.log("[API] Token refresh response:", response.data);
      return response.data;
    },
    async validate(token: string) {
      const response = await axiosInstance.post("/api/token/validate", null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("[API] Token validation response:", response.data);
      return response.data;
    },
  },
  user: {
    async register(data: ApiEndpoints["user"]["register"]["body"]) {
      const response = await axiosInstance.post("/api/user/register", data);
      console.log("[API] User registration response:", response.data);
      return response.data;
    },
    async verifyEmail(code: string, email: string) {
      const response = await axiosInstance.post("/api/user/verify-email", {
        code,
        email,
      });
      console.log("[API] Email verification response:", response.data);
      return response.data;
    },
    async enable2FA() {
      const response = await axiosInstance.post("/api/user/2fa/enable");
      console.log("[API] Enable 2FA response:", response.data);
      return response.data;
    },
    async confirm2FA(code: string, secret: string) {
      const response = await axiosInstance.post("/api/user/2fa/confirm", {
        code,
        tempToken: secret,
      });
      console.log("[API] Confirm 2FA response:", response.data);
      return response.data;
    },
    async verify2FA(code: string, tempToken: string) {
      const response = await axiosInstance.post("/api/user/2fa/verify", {
        code,
        tempToken,
      });
      console.log("[API] Verify 2FA response:", response.data);
      return response.data;
    },
    async forgotPassword(email: string) {
      const response = await axiosInstance.post("/api/user/password/forgot", {
        email,
      });
      console.log("[API] Forgot password response:", response.data);
      return response.data;
    },
    async resetPassword(token: string, newPassword: string) {
      const response = await axiosInstance.post("/api/user/password/reset", {
        token,
        newPassword,
      });
      console.log("[API] Reset password response:", response.data);
      return response.data;
    },
    async me() {
      const response = await axiosInstance.get("/api/user/me");
      console.log("[API] Get current user response:", response.data);
      return response.data;
    },
  },
};
