import { AnimationProvider } from './animation-provider';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { useDeviceResponsive } from '@/hooks/useDeviceResponsive';
import { useTranslation } from 'react-i18next';

interface StockPhotoSelectiveProps {
  active: boolean;
  title?: string;
  titleTx?: string;
  content?: string;
  contentTx?: string;
  titleClassName?: string;
  contentClassName?: string;
  backgroundUrl?: string;
  onNextClick: () => void;
}

export const StockPhotoSelective = ({
  active,
  title = '',
  titleTx = '',
  content = '',
  contentTx = '',
  titleClassName = '',
  contentClassName = '',
  backgroundUrl = '',
  onNextClick
}: StockPhotoSelectiveProps) => {
  const { t } = useTranslation();
  const { isMD, isLG } = useDeviceResponsive();

  const renderContent = () => {
    return (
      <div
        className={cn('flex flex-col items-start gap-4 px-4', { absolute: isLG })}
        style={{ left: 'calc(50% + 120px)' }}
      >
        <h1
          className={cn(
            'text-[40px] leading-[48px] text-[#2A4A39] font-fraunces max-w-[266px]',
            titleClassName
          )}
        >
          {title || (titleTx && t(titleTx)) || ''}
        </h1>
        <p
          className={cn(
            'max-w-[384px] text-left text-[#151515] font-inter leading-6',
            contentClassName
          )}
        >
          {content || (contentTx && t(contentTx)) || ''}
        </p>
        <Button className="mt-4 text-[16px]" onClick={onNextClick}>
          {t('common:next')}
        </Button>
      </div>
    );
  };

  return (
    <AnimationProvider active={active}>
      <div className="flex h-full min-h-screen">
        <div
          className="flex flex-col items-center justify-center flex-1"
          style={{
            background: `url(${backgroundUrl}) lightgray 50% / cover no-repeat`
          }}
        >
          {!isMD && (
            <div className={cn({ 'rounded-[20px] bg-white mx-4 p-8': !isLG })}>
              {renderContent()}
            </div>
          )}
        </div>
        {isMD && (
          <div className="flex flex-col items-center justify-center flex-1 w-1/2">
            {renderContent()}
          </div>
        )}
      </div>
    </AnimationProvider>
  );
};
