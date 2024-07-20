import React from 'react';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
import Icon from '../ui/icon';

interface LayoutProps {
  hasIcon?: boolean;
  children: React.ReactNode;
  title?: string;
  titleTx?: string;
  titleClassName?: string;
}

export const Layout = ({
  hasIcon = false,
  title = '',
  titleTx = '',
  titleClassName = '',
  children
}: LayoutProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center pb-4 mx-2 h-min-screen">
      {hasIcon && <Icon name="paramount" width={134} height={17} className="mt-14" />}
      <h1
        className={cn(
          'mt-32 text-[#2A4A39] font-fraunces text-center text-[24px] font-semibold max-w-[287px] leading-8',
          titleClassName
        )}
      >
        {title || (titleTx && t(titleTx)) || ''}
      </h1>
      <>{children}</>
    </div>
  );
};
