import { createContext } from 'react';
import { useMediaQuery } from 'react-responsive';

export interface IDeviceContext {
  is2XL?: boolean;
  isXL?: boolean;
  isLG?: boolean;
  isMD?: boolean;
  isSM?: boolean;
  isXS?: boolean;
  isTablet?: boolean;
  isMobile?: boolean;
}
export const DeviceContext = createContext<IDeviceContext | null>(null);

interface DeviceProviderProps {
  children?: React.ReactNode;
}
export const DeviceProvider: React.FC<DeviceProviderProps> = ({ children }) => {
  const is2XL = useMediaQuery({
    query: '(min-width: 1536px)'
  });
  const isXL = useMediaQuery({
    query: '(min-width: 1200px)'
  });
  const isLG = useMediaQuery({ query: '(min-width: 992px)' });
  const isMD = useMediaQuery({ query: '(min-width: 768px)' });
  const isSM = useMediaQuery({ query: '(min-width: 576px)' });
  const isXS = useMediaQuery({ query: '(max-width: 576px)' });
  const isMobile = isXS || (isSM && !isMD);

  return (
    <DeviceContext.Provider
      value={{
        is2XL,
        isXL,
        isLG,
        isMD,
        isSM,
        isXS,
        isTablet: isMD && !isLG,
        isMobile
      }}
    >
      {children}
    </DeviceContext.Provider>
  );
};

export default DeviceProvider;
