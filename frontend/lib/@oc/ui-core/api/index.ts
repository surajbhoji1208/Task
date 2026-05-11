import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// #region API Client Configuration
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// #region Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);
// #endregion

// #region Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);
// #endregion

// #region API Client Methods
export const apiClient = {
  get: <T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    axiosInstance.get<T>(url, config),

  getList: <T>(url: string, params?: Record<string, unknown>): Promise<AxiosResponse<T>> =>
    axiosInstance.get<T>(url, { params }),

  post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    axiosInstance.post<T>(url, data, config),

  create: <T>(url: string, data: unknown): Promise<AxiosResponse<T>> =>
    axiosInstance.post<T>(url, data),

  put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    axiosInstance.put<T>(url, data, config),

  update: <T>(url: string, id: string, data: unknown): Promise<AxiosResponse<T>> =>
    axiosInstance.put<T>(`${url}/${id}`, data),

  patch: <T>(url: string, data?: unknown): Promise<AxiosResponse<T>> =>
    axiosInstance.patch<T>(url, data),

  delete: <T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    axiosInstance.delete<T>(url, config),

  remove: <T>(url: string, id: string): Promise<AxiosResponse<T>> =>
    axiosInstance.delete<T>(`${url}/${id}`),

  upload: <T>(url: string, formData: FormData): Promise<AxiosResponse<T>> =>
    axiosInstance.post<T>(url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
};
// #endregion

export default axiosInstance;
