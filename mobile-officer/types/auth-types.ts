export interface LoginRequest {
    username: string;
    password: string;
}

export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    role: string;
    refresh_token: string;
    username: string;
}

export interface AuthState {
    username: string | null;
    role: string | null;
    token: string | null;
    loading: boolean;
    error: string | null;
  }