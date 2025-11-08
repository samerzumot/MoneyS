import axios, { AxiosHeaders, type InternalAxiosRequestConfig } from "axios";
import { appEnv } from "./env";

type AuthProvider = {
  getToken: () => Promise<string | null>;
  getDevHeaders?: () => Record<string, string>;
};

let authProvider: AuthProvider | null = null;

export const registerAuthProvider = (provider: AuthProvider) => {
  authProvider = provider;
};

export const apiClient = axios.create({
  baseURL: appEnv.apiBaseUrl,
  withCredentials: true,
});

const ensureHeaders = (config: InternalAxiosRequestConfig) => {
  if (!config.headers) {
    config.headers = new AxiosHeaders();
  } else if (!(config.headers instanceof AxiosHeaders)) {
    config.headers = AxiosHeaders.from(config.headers);
  }
  return config.headers;
};

apiClient.interceptors.request.use(async (config) => {
  const headers = ensureHeaders(config);

  if (authProvider) {
    const token = await authProvider.getToken();
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    } else if (authProvider.getDevHeaders) {
      const devHeaders = authProvider.getDevHeaders();
      Object.entries(devHeaders).forEach(([key, value]) => {
        headers.set(key, value);
      });
    }
  }

  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.error("API error", error);
    }
    return Promise.reject(error);
  },
);
