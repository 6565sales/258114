
import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { MacOSSpring } from './macos-animations';
import { cn } from '@/lib/utils';

interface MacOSButtonAnimatedProps extends ButtonProps {
  macosStyle?: boolean;
  glassStyle?: boolean;
}

export const MacOSButtonAnimated = React.forwardRef<HTMLButtonElement, MacOSButtonAnimatedProps>(
  ({ className, macosStyle = false, glassStyle = false, children, ...props }, ref) => {
    const buttonContent = (
      <Button
        className={cn(
          'transition-all duration-200 transform-gpu',
          macosStyle && 'macos-button-interactive',
          glassStyle && 'macos-glass-button',
          !macosStyle && !glassStyle && 'hover:shadow-lg',
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </Button>
    );

    return (
      <MacOSSpring scale={false} lift={false}>
        {buttonContent}
      </MacOSSpring>
    );
  }
);

MacOSButtonAnimated.displayName = 'MacOSButtonAnimated';
