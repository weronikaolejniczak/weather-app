import * as React from 'react';

import { cn } from '@/utils/cn';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, ...props }, ref) => {
    return (
      <div className="flex items-center gap-6 placeholder:w-full h-12 border-0 border-b border-solid border-black">
        <input
          type={type}
          className={cn(
            'px-2 bg-transparent text-lg placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
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
