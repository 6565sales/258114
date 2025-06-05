
import React from 'react';
import { Button, ButtonProps } from './button';
import { cn } from '@/lib/utils';

type BaseVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
type ExtendedVariant = BaseVariant | 'macos' | 'glass';

interface InteractiveButtonProps extends Omit<ButtonProps, 'variant'> {
  variant?: ExtendedVariant;
  withRipple?: boolean;
  withSpring?: boolean;
}

export const InteractiveButton = React.forwardRef<HTMLButtonElement, InteractiveButtonProps>(
  ({ 
    className, 
    variant = 'default', 
    withRipple = false, 
    withSpring = true,
    children, 
    ...props 
  }, ref) => {
    const baseClasses = cn(
      withSpring && 'transition-all duration-200 ease-out transform-gpu hover:scale-[1.02] active:scale-[0.98]',
      withRipple && 'relative overflow-hidden'
    );

    if (variant === 'macos') {
      return (
        <button
          className={cn(
            'px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium',
            'border-none cursor-pointer transition-all duration-200',
            'hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0',
            baseClasses, 
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </button>
      );
    }

    if (variant === 'glass') {
      return (
        <button
          className={cn(
            'px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20',
            'text-gray-900 dark:text-white rounded-lg cursor-pointer',
            'transition-all duration-200 hover:bg-white/20 hover:shadow-lg',
            baseClasses, 
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </button>
      );
    }

    return (
      <Button
        className={cn(
          baseClasses,
          className
        )}
        variant={variant as BaseVariant}
        ref={ref}
        {...props}
      >
        {children}
      </Button>
    );
  }
);

InteractiveButton.displayName = 'InteractiveButton';
