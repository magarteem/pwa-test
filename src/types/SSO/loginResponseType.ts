// ======== Запрос к серверу ======== //
export interface LoginRequestType {
 email: string;
 password: string;
}

// ======== Ответ от сервера ======== //
export interface LoginResponseType {
 accountId: string;
 email: string;
 token: {
  value: string;
  expiresAt: number;
 };
 hasPassword: boolean;
 oAuthTypes: string[];
}

// ======== error от сервера ======== //
export interface LoginResponseErrorType {
 Type: string;
 Message: string;
 Code: number;
 StackTrace: string;
}
