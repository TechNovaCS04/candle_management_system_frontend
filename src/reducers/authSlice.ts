import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Admin, AuthState } from "../types";

const STORAGE_KEY = "sangeetha_auth";

function loadInitialState(): AuthState {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore corrupted storage
  }
  return { isAuthenticated: false, admin: null, token: null };
}

const initialState: AuthState = loadInitialState();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ admin: Admin; token: string }>) => {
      state.isAuthenticated = true;
      state.admin = action.payload.admin;
      state.token = action.payload.token;
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.admin = null;
      state.token = null;
      sessionStorage.removeItem(STORAGE_KEY);
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
