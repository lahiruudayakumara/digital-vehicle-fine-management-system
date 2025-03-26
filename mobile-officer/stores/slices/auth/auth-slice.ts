import { AuthResponse, AuthState } from "@/types/auth-types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { loadTokenFromSecureStore, login, logout, refreshUserToken, register } from "@/stores/slices/auth/auth-actions";

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadTokenFromSecureStore.fulfilled, (state, action) => {
      state.token = action.payload;
    });

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
        state.user = action.payload.user;
        state.loading = false;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
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
        state.user = action.payload.user;
        state.loading = false;
        state.error = null;
      })
      .addCase(refreshUserToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logout.fulfilled, (state) => {
        state.token = null;
        state.user = null;
      });
  },
});

export default authSlice.reducer;
