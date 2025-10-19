// src/store/features/auth/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: any | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<{ user: any; token?: string }>) {
      state.user = action.payload.user;
      console.log("usser set", action.payload.user);
      if (action.payload.user) {
        state.isAuthenticated = true;
        console.log("authnetication set", action.payload.user);
      } else {
        state.isAuthenticated = false;
      }
      if (action.payload.token) {
        state.token = action.payload.token;
      }
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false; 
      console.log("logout emmited from slice", state)
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const { setUser, logout, setLoading } = authSlice.actions;
export default authSlice.reducer;
