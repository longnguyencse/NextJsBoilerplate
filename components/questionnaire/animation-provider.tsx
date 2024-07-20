import { cn } from '@/lib/utils';

interface AnimationProps {
  active: boolean;
  children: React.ReactNode;
}

export const AnimationProvider = ({ active, children }: AnimationProps) => {
  return (
    <div
      className={cn('fixed inset-0 transition-opacity duration-500 ease-in-out overflow-auto', {
        'opacity-100': active,
        'opacity-0': !active,
        'z-99997': active
      })}
    >
      <>{children}</>
    </div>
  );
};
