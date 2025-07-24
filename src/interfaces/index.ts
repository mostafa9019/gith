export interface TypedServerResponse<T> {
  data: T;
  sucess: boolean;
  message: string;
}
export interface ServerResponse {
  sucess: boolean;
  message: string;
  statusCode: number;
}

export interface ErrorResponse {
  success: false;
  data: null;
  message: string | null;
  error: string;
  errorDescription: string;
}
export interface Authentication {
  roles: string;
  fullName: string;
  email: string;
  username: string;
  accessToken: string;
  expiresOn: string;
  imageMarkerUrl: string;
  imageUrl: string;
  hubId: number;
  entityId: number;
  sellerId: string;
  userId: string;
  isExpired: boolean;
  codeOTP: string;
}

export interface AuthResponse {
  success: boolean;
  msg: string;
  authResult: Authentication;
}

export interface ListOption {
  id: number;
  name: string;
}
