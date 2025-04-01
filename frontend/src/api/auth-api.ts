import { AuthResponse, LoginRequest, RegisterRequest, PoliceOfficerRegisterRequest } from "@/types/auth-types";
import API from "./api-instance";

// Regular User Registration
export const registerUser = async (userData: RegisterRequest): Promise<AuthResponse> => {
  const response = await API.post<AuthResponse>("/auth/register", userData);
  return response.data;
};

// Police Officer Registration
export const registerPoliceOfficerAction = async (officerData: PoliceOfficerRegisterRequest): Promise<AuthResponse> => {
  const response = await API.post<AuthResponse>("/auth/register-police-officer", officerData);
  return response.data;
};

// Login User
export const loginUser = async (credentials: LoginRequest): Promise<AuthResponse> => {
  const response = await API.post<AuthResponse>("/auth/login", credentials);
  return response.data;
};

// Refresh Token
export const refreshToken = async (): Promise<AuthResponse> => {
  const refreshToken = localStorage.getItem("refreshToken");
  const response = await API.post<AuthResponse>("/auth/refresh-token", {
    refreshToken: `${refreshToken}`,
  });
  return response.data;
};

// Logout User
export const logoutUser = (): void => {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
};
