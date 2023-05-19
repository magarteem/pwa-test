export interface ErrorsCodeType {
 [key: number]: {
  Type: string;
  Message: string;
  Code: number;
  title: string;
 };
}

export const errorsCode: ErrorsCodeType = {
 2004: {
  Code: 2004,
  title: "Емаил занят",
  Type: "AccountException",
  Message: "Exception of type 'Triton.SSO.Domain.Exceptions.AccountException' was thrown.",
 },
};
