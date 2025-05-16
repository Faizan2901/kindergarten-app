export interface ForgotPassword {
  playCenterId: string;
  email: string;
}

export interface ResetPassword {
  password: string;
  token: string;
}