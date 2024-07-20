import Icon from '../ui/icon';
import { cn } from '@/lib/utils';
import { useDeviceResponsive } from '@/hooks/useDeviceResponsive';

interface HeaderProps {
  hidden?: boolean;
  currentStep: number;
  totalStep: number;
  hiddenProgressBar?: boolean;
  className?: string;
}

export const Header = ({
  hidden = false,
  currentStep,
  totalStep,
  hiddenProgressBar = false,
  className
}: HeaderProps) => {
  const { isMD } = useDeviceResponsive();

  return (
    <div
      className={cn(
        'transition-opacity duration-500 ease-in-out z-max fixed w-full h-16 bg-[#F9F5F2]',
        {
          'opacity-0': hidden,
          'opacity-100': !hidden
        },
        className
      )}
    >
      <Icon
        className={cn('absolute z-max', {
          'top-[22.72px]  left-[33px]': isMD,
          'top-3 left-1/2 -translate-x-1/2': !isMD
        })}
        name="paramount"
        width={134}
        height={17}
      />
      {!hiddenProgressBar && (
        <div
          className={cn(
            'z-max overflow-hidden absolute rounded-full bg-[#EBE7E4] w-full max-w-96 h-[6px] mx-auto left-0 right-0',
            { 'top-12 w-[90%]': !isMD, 'top-[30px]': isMD }
          )}
        >
          <div
            className="absolute bg-[#2A4A39] w-3 h-full"
            style={{ width: `${(currentStep / totalStep) * 100}%` }}
          ></div>
        </div>
      )}
    </div>
  );
};
