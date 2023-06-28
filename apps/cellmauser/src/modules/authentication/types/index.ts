export interface ILogin {
  username: string;
  password: string;
}

export interface IForgotPassword {
  username: string;
  emailAddress: string;
  uniqueKey: string;
}

export interface IResetPassword {
  newPassword: string;
  confirmPassword: string;
}
