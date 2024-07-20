'use client';
import { ReactNode } from 'react';
import { combineProviders } from '@utils/combine-providers';
import DeviceProvider from './device-provider';

interface AppProviderProps {
  children: ReactNode;
}

const Provider = ({ children }: { children: ReactNode }) =>
  combineProviders(
    [
      // order matters here, be careful!
      // if Provider A is using another Provider B, then A needs to appear below B.
      DeviceProvider
    ],
    children
  );

// eslint-disable-next-line react/display-name
export const AppProvider = ({ children }: AppProviderProps) => {
  return <Provider>{children}</Provider>;
};
