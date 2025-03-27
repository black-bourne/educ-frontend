import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  role: string;
}

const loadInitialState = (): AuthState => {
  if (typeof window === "undefined") {
    return { token: null, role: "" };
  }
  const token = localStorage.getItem("authToken");
  if (!token) {
    return { token: null, role: "" };
  }
  try {
    const decoded = JSON.parse(atob(token.split(".")[1]));
    return { token, role: decoded.role || "" };
  } catch (error) {
    console.error("Invalid token in storage:", error);
    return { token: null, role: "" };
  }
};

const initialState: AuthState = loadInitialState();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
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
      localStorage.removeItem("authToken");
    },
  },
});

export const { setToken, logout } = authSlice.actions;
export default authSlice.reducer;