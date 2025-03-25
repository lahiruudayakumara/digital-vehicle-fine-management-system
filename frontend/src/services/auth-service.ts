import API from "@/api/api-instance";
import { AuthResponse } from "@/types/auth-types";

export const refreshToken = async (): Promise<AuthResponse> => {
  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) {
    throw new Error("Refresh token not found");
  }

  try {
    const response = await API.post<AuthResponse>("/auth/refresh-token", {}, {
      headers: { Authorization: `Bearer ${refreshToken}` },
    });

    return response.data;
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw new Error("Failed to refresh token");
  }
};
