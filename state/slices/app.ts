import type { StateSlice, Store } from '@state/tyles';

export type AppSlice = {
  appLoading?: boolean;
  updateAppLoading(payload: AppSlice['appLoading']): void;
  clearAppState(): void;
};

export const createAppSlice: StateSlice<Store, AppSlice> = (set) => ({
  appLoading: true,
  updateAppLoading(payload: AppSlice['appLoading']) {
    return set(() => ({ appLoading: payload }));
  },
  clearAppState() {
    return set(() => ({
      appLoading: true
    }));
  }
});
