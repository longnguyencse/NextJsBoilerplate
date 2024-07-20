import * as React from 'react';

import { cn } from '@/lib/utils';
import { useFormContext } from 'react-hook-form';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ id, className, type, ...props }, ref) => {
    const {
      formState: { errors }
    } = useFormContext();

    const error = errors[id!];

    return (
      <div>
        <input
          type={type}
          className={cn(
            'flex h-full w-full rounded-md border bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300',
            error ? 'border-red-500' : 'border-slate-200',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <span className="text-[12px] text-red-500">{error.message as string}</span>}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
