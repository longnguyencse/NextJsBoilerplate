import { ReactNode, FC, ComponentClass } from 'react';

type ProviderList = Array<FC | ComponentClass<{ children: ReactNode }>>;

export const combineProviders = (list: ProviderList, children: ReactNode) =>
  list.reduceRight((acc, Provider: any) => <Provider>{acc}</Provider>, <>{children}</>);
