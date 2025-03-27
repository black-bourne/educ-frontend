import axios from "axios";
import { store } from "@/redux/store/store";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
});

export const setupAxiosInterceptors = () => {
  const updateToken = () => {
    const token = store.getState().auth.token
    api.defaults.headers.common["Authorization"] = token ? `Bearer ${token}` : "";
  };

  // Initial setup
  updateToken();
  // Subscribe to store changes
  const unsubscribe = store.subscribe(updateToken);

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem("authToken");
        store.dispatch({ type: "auth/clearToken" }); 
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }
  );

  return unsubscribe; // Cleanup function
};

export default api;