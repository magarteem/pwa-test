// ======== Запрос к серверу ======== //
// POST: /api/v1/auth/registration
export interface RegistrationReqestType {
 email: string;
 password: string;
}

// ======== Ответ от сервера ======== //
export interface RegistrationResponseType {
 accountId: string;
 email: string;
 token: {
  value: string;
  expiresAt: number;
 };
 hasPassword: boolean;
 oAuthTypes: [];
}
