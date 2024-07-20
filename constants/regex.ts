export const REGEX_EMAIL = /\S+@\S+\.\S+/;
export const REGEX_PASSWORD_SIGN_UP =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
export const REGEX_PASSWORD_MIN_LENGTH = /.{8,}/;
export const REGEX_PASSWORD_LOWERCASE = /(?=.*[a-z])/;
export const REGEX_PASSWORD_UPPERCASE = /(?=.*[A-Z])/;
export const REGEX_PASSWORD_ONE_SPECIAL = /(?=.*[@$!%*?&])/;
export const REGEX_PASSWORD_ONE_NUMBER = /(?=.*\d)/;
export const REGEX_NAME = /^[^\p{P}\p{S}]*$/u;
export const FORM_REGEX = /^[0-9]{9}/;
