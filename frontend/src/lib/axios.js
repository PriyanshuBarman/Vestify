import axios from "axios";

import {
  VITE_BACKEND_BASE_URL,
  VITE_MF_API_BASE_URL,
  VITE_MF_CHART_API_BASE_URL,
  VITE_STOCK_SEARCH_API_BASE_URL,
} from "@/lib/config/env";

const api = axios.create({
  baseURL: `${VITE_BACKEND_BASE_URL}/api/v1`,
  withCredentials: true,
});

const mfHelperApi = axios.create({
  baseURL: VITE_MF_API_BASE_URL,
});

const mfChartApi = axios.create({
  baseURL: VITE_MF_CHART_API_BASE_URL,
});

const stockSearchApi = axios.create({
  baseURL: VITE_STOCK_SEARCH_API_BASE_URL,
});

// --------------------------------------
// Queue management for refresh handling
// --------------------------------------
let isRefreshing = false;
let failedQueue = [];

function processQueue(error) {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve();
  });
  failedQueue = [];
}

// --------------------------------------
// Axios interceptor
// --------------------------------------
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // only handle 401 (unauthorized) errors (token expired)
    if (
      error.response?.status === 401 &&
      !originalRequest.url?.includes("/auth/refresh-token") &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      if (isRefreshing) {
        // Wait for the current refresh to finish
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => api(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;

      try {
        await api.post("/auth/refresh-token");
        processQueue(null);
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed -> logout
        const currentPath = window.location.pathname;
        if (!currentPath.startsWith("/auth") && currentPath !== "/") {
          localStorage.clear();
          window.location.href = "/";
        }
        processQueue(refreshError);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export { api, mfChartApi, mfHelperApi, stockSearchApi };
