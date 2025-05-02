import { 
  LoginRequest, 
  RegisterRequest, 
  PoliceOfficerRegisterRequest 
} from "@/types/auth-types";

import { 
  loginUser, 
  refreshToken, 
  registerUser, 
  registerPoliceOfficerAction
} from "@/api/auth-api";

import { createAsyncThunk } from "@reduxjs/toolkit";

// Login action
export const login = createAsyncThunk(
  "auth/login",
  async (credentials: LoginRequest, { rejectWithValue }) => {
    try {
      const response = await loginUser(credentials);
      localStorage.setItem("token", response.token);
      localStorage.setItem("refreshToken", response.refresh_token);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

// Register action for regular user
export const register = createAsyncThunk(
  "auth/register",
  async (userData: RegisterRequest, { rejectWithValue }) => {
    try {
      const response = await registerUser(userData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Registration failed");
    }
  }
);

// Register action for police officer
export const registerPoliceOfficer = createAsyncThunk(
  "auth/registerPoliceOfficer",
  async (officerData: PoliceOfficerRegisterRequest, { rejectWithValue }) => {
    try {
      const response = await registerPoliceOfficerAction(officerData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Police officer registration failed");
    }
  }
);

// Token refresh action
export const refreshUserToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const response = await refreshToken();
      localStorage.setItem("token", response.token);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to refresh token");
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
    } catch (error: any) {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      return rejectWithValue(error.response?.data || "Logout failed");
    }
  }
);