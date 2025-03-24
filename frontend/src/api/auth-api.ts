import { AuthResponse, LoginRequest, RegisterRequest } from "@/types/auth-types";

import API from "./api-instance";

export const loginUser = async (credentials: LoginRequest): Promise<AuthResponse> => {
  const response = await API.post<AuthResponse>("/auth/login", credentials);
  return response.data;
};

export const registerUser = async (userData: RegisterRequest): Promise<AuthResponse> => {
  const response = await API.post<AuthResponse>("/auth/register", userData);
  return response.data;
};

export const refreshToken = async (): Promise<AuthResponse> => {
  const refreshToken = localStorage.getItem("refreshToken");
  const response = await API.post<AuthResponse>("/auth/refresh-token", {}, {
    headers: { Authorization: `Bearer ${refreshToken}` }
  });
  return response.data;
};

export const logoutUser = (): void => {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
};
