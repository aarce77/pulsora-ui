import { AxiosError, create } from "axios";

import { useAuthStore } from "@/store/auth-store";
import { ApiError } from "@/utils/api-error";
import { getApiBaseUrl } from "@/utils/env";

export const apiClient = create({
  baseURL: getApiBaseUrl(),
  timeout: 15_000,
});

apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().session?.accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const statusCode = error.response?.status;
    const message =
      typeof error.response?.data === "object" &&
      error.response?.data &&
      "detail" in error.response.data
        ? String(error.response.data.detail)
        : error.message;

    if (statusCode === 401) {
      useAuthStore.getState().clearSession();
    }

    throw new ApiError(message || "Request failed", statusCode, error.response?.data);
  },
);
