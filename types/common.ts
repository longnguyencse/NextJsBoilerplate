export type LoginPayload = {
  email: string;
  password: string;
  rememberMe?: boolean;
};

export type SignUpPayload = Omit<LoginPayload, 'rememberMe'>;

export type ForgotPasswordPayload = Pick<LoginPayload, 'email'>;

export type RevealMyMatch = {
  email: string;
  name: string;
};
