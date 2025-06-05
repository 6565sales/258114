
import React from 'react';
import { cn } from '@/lib/utils';

interface InteractiveTabProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean;
  children: React.ReactNode;
}

export const InteractiveTab = React.forwardRef<HTMLDivElement, InteractiveTabProps>(
  ({ className, active = false, children, ...props }, ref) => {
    return (
      <div
        className={cn(
          'macos-tab',
          active && 'active',
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

InteractiveTab.displayName = 'InteractiveTab';
