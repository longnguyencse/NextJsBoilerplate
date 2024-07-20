// import { DeviceContext } from '../contexts/device-provider/device-provider';
import { DeviceContext } from '@/providers/device-provider';
import { useContext } from 'react';

export const useDeviceResponsive = (): any => {
  const context = useContext(DeviceContext);
  if (!context) {
    throw new Error('useDeviceContext must be used within a OnboardingProvider');
  }

  return context;
};
