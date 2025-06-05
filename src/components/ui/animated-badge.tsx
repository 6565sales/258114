
import React from 'react';
import { Badge, BadgeProps } from './badge';
import { cn } from '@/lib/utils';

interface AnimatedBadgeProps extends BadgeProps {
  pulse?: boolean;
  hover?: boolean;
}

export const AnimatedBadge = ({ className, pulse = false, hover = true, children, ...props }: AnimatedBadgeProps) => {
  const animationClasses = cn(
    'macos-badge',
    {
      'macos-pulse': pulse,
      'macos-spring-hover': hover,
    }
  );

  return (
    <Badge
      className={cn(animationClasses, className)}
      {...props}
    >
      {children}
    </Badge>
  );
};
