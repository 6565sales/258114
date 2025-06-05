
import React from 'react';
import { Card } from '@/components/ui/card';
import { MacOSSpring } from './macos-animations';
import { cn } from '@/lib/utils';

interface MacOSCardAnimatedProps extends React.HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
  glassEffect?: boolean;
}

export const MacOSCardAnimated = React.forwardRef<HTMLDivElement, MacOSCardAnimatedProps>(
  ({ className, interactive = true, glassEffect = false, children, ...props }, ref) => {
    const cardContent = (
      <Card
        className={cn(
          'transition-all duration-200 bg-white/90 dark:bg-gray-800/90',
          'backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50',
          'shadow-lg rounded-xl',
          glassEffect && 'backdrop-blur-xl bg-white/70 dark:bg-gray-800/70',
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </Card>
    );

    if (interactive) {
      return (
        <MacOSSpring scale lift>
          {cardContent}
        </MacOSSpring>
      );
    }

    return cardContent;
  }
);

MacOSCardAnimated.displayName = 'MacOSCardAnimated';
