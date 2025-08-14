// Auth types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface VerifyOtpRequest {
  email: string;
  otp: string;
}

export interface AuthResponse {
  message: string;
  token?: string;
  role?: string;
  user?: {
    id: string;
    email: string;
    name?: string;
  };
}

// Food types
export interface Food {
  id: string;
  name: string;
  description?: string;
  price: number;
  category?: string;
  image?: string;
  available: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface FoodsResponse {
  success: boolean;
  data: Food[];
  message?: string;
}

// Generic API response
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
