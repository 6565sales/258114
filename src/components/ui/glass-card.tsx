
import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
  blur?: 'sm' | 'md' | 'lg';
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, interactive = false, blur = 'md', children, ...props }, ref) => {
    const baseClasses = 'macos-card';
    const interactiveClasses = interactive ? 'macos-card-interactive' : '';
    
    const blurClasses = {
      sm: 'backdrop-blur-sm',
      md: 'backdrop-blur-md',
      lg: 'backdrop-blur-lg'
    };

    return (
      <div
        className={cn(
          baseClasses,
          interactiveClasses,
          blurClasses[blur],
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassCard.displayName = 'GlassCard';
