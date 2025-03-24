import { AuthResponse, AuthState } from "@/types/auth-types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { login, refreshUserToken, register } from "@/stores/slices/auth/auth-actions";

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("token") ?? null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(refreshUserToken.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.token = action.payload.token;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
