import { AuthResponse, AuthState } from "@/types/auth-types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { login, logout, refreshUserToken, register } from "@/stores/slices/auth/auth-actions";

const initialState: AuthState = {
  username: null,
  role: null,
  token: localStorage.getItem("token") ?? null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(refreshUserToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.token = action.payload.token;
        state.username = action.payload.username;
        state.role = action.payload.role;
        state.loading = false;
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(refreshUserToken.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.token = action.payload.token;
        state.username = action.payload.username;
        state.role = action.payload.role;
        state.loading = false;
        state.error = null;
      })
      .addCase(refreshUserToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.token = null;
        state.username = null;
        state.role = null;
        state.loading = false;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default authSlice.reducer;
