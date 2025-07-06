import axios from 'axios';
import Cookies from 'js-cookie';
import { config } from './config';

const BASE_SERVER_URL = config.apiUrl;

const axiosInstance = axios.create({
  baseURL: BASE_SERVER_URL,
});

// Set up an axios interceptor to automatically add the token to the headers
axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers['Accept'] = 'application/json';
  if (config.headers['Content-Type'] === undefined) {
    config.headers['Content-Type'] = 'application/json';
  }
  return config;
});

// Set up an axios interceptor to handle responses
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is due to an expired token
    if (error?.response?.status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = Cookies.get('refreshToken');

        if (!refreshToken) {
          // No refresh token available, redirect to login
          window.location.href = '/admin';
          return Promise.reject(error);
        }

        const response = await axios.post(`${BASE_SERVER_URL}auth/token/refresh/`, {
          refresh: refreshToken,
        });

        const { access } = response.data;

        // Update token in cookies and headers
        Cookies.set('token', access);
        originalRequest.headers.Authorization = `Bearer ${access}`;

        // Retry the original request
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        // Clear tokens and redirect to login
        Cookies.remove('token');
        Cookies.remove('refreshToken');
        window.location.href = '/admin';
      }
    }
    return Promise.reject(error);
  },
);

export const api = {
  get: <T>(url: string, params?: object,
    config?: object
  ) => axiosInstance.get<T>(url, { params, ...config }),
  post: <T, D = unknown>(url: string, data: D, config?: object) => axiosInstance.post<T>(url, data, config),
  put: <T, D = unknown>(url: string, data: D) => axiosInstance.put<T>(url, data),
  patch: <T, D = unknown>(url: string, data: D) => axiosInstance.patch<T>(url, data),
  delete: <T>(url: string) => axiosInstance.delete<T>(url),
};

export default axiosInstance;
