import type { StateSlice, Store } from '../tyles';
// import dayjs from 'dayjs';
// import timezone from 'dayjs/plugin/timezone';
// dayjs.extend(timezone);

export const initialState = {
  currentUser: undefined,
  password: ''
};
export type AuthSlice = {
  // state
  currentUser?: any;
  emailFromSignUp?: string;
  password?: string;
  // reducers
  setUser(payload: AuthSlice['currentUser']): void;
  setPassword(payload: AuthSlice['password']): void;
  setEmailFromSignUp(payload: AuthSlice['emailFromSignUp']): void;
  clearAuthState(): void;
};

export const createAuthSlice: StateSlice<Store, AuthSlice> = (set) => {
  const setUser = (payload: AuthSlice['currentUser']) => {
    return set(() => ({ currentUser: payload }));
  };

  const setPassword = (payload: AuthSlice['password']) => {
    return set(() => ({ password: payload }));
  };

  const setEmailFromSignUp = (payload: AuthSlice['emailFromSignUp']) => {
    return set(() => ({ emailFromSignUp: payload }));
  };

  const clearAuthState = () => {
    set(initialState);
  };

  return {
    ...initialState,
    setUser,
    clearAuthState,
    setEmailFromSignUp,
    setPassword
  };
};
