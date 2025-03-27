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
    success: boolean;      // Add the success property
    message: string;       // Add the message property
    token: string;
    refresh_token: string;
    username: string;
    role: string;
    user: any;             // Or some specific type for the user

}

export interface AuthState {
    username: string | null;
    role: string | null;
    token: string | null;
    loading: boolean;
    error: string | null;
}

export interface PoliceOfficerRegisterRequest extends RegisterRequest {
    badgeID: string;
    fullName: string;
    address: string;
    telephone: string;
    patrolLocations: string; // Must be string[]
}
