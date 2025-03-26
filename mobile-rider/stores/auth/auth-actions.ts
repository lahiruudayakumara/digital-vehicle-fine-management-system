import * as SecureStore from "expo-secure-store";

import { LoginRequest, RegisterRequest } from "@/types/auth-types";
import { loginUser, refreshToken, registerUser } from "@/api/auth-api";

import { createAsyncThunk } from "@reduxjs/toolkit";

export const login = createAsyncThunk(
  "auth/login",
  async (credentials: LoginRequest, { rejectWithValue }) => {
    try {
      const response = await loginUser(credentials);
      await SecureStore.setItemAsync("token", response.token);
      await SecureStore.setItemAsync("refreshToken", response.refresh_token);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (userData: RegisterRequest, { rejectWithValue }) => {
    try {
      return await registerUser(userData);
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Registration failed");
    }
  }
);

export const refreshUserToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const response = await refreshToken();
      await SecureStore.setItemAsync("token", response.token);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to refresh token");
    }
  }
);

export const loadTokenFromSecureStore = createAsyncThunk(
  "auth/loadToken",
  async (_, { rejectWithValue }) => {
    try {
      const token = await SecureStore.getItemAsync("token");
      return token;
    } catch (error) {
      return rejectWithValue("Failed to load token");
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async () => {
  await SecureStore.deleteItemAsync("token");
  await SecureStore.deleteItemAsync("refreshToken");
});