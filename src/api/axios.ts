import Axios from 'axios';
import { store } from '@/redux/store/store';

const api = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setupAxiosInterceptors = () => {
  // Request interceptor: Add token to headers
  api.interceptors.request.use(
    (config) => {
      const token = store.getState().auth.token; // Access token from Redux
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor: Handle errors like 401
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );
};

export default api;