import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  role: string;
}

const loadTokenFromStorage = (): string | null => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token");
    }
    return null;
  };
  
const initialState: AuthState = {
    token: loadTokenFromStorage(),
    role: "",
};
  
const authSlice = createSlice({
name: "auth",
initialState,
reducers: {
    setToken: (state, action: PayloadAction<string>) => {
    state.token = action.payload;
    localStorage.setItem("token", action.payload);
    try {
        const decoded = JSON.parse(atob(action.payload.split(".")[1]));
        state.role = decoded.role || "";
    } catch (error) {
        console.error("Invalid token:", error);
        state.token = null;
        state.role = "";
    }
    },
    logout: (state) => {
    state.token = null;
    state.role = "";
    localStorage.removeItem("token"); // Clear from localStorage
    },
},
});

export const { setToken, logout } = authSlice.actions;
export default authSlice.reducer;