import * as React from 'react';

import { cn } from '@/utils/cn';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, ...props }, ref) => {
    return (
      <div className="flex h-12 items-center gap-6 border-0 border-b border-solid border-black placeholder:w-full dark:border-white">
        <input
          type={type}
          className={cn(
            'bg-transparent px-2 text-lg placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
          ref={ref}
          {...props}
        />
        {icon}
      </div>
    );
  },
);
Input.displayName = 'Input';

export { Input };
