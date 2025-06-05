
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface MacOSSpringProps {
  children: React.ReactNode;
  className?: string;
  scale?: boolean;
  lift?: boolean;
  disabled?: boolean;
}

export const MacOSSpring = ({ 
  children, 
  className, 
  scale = true, 
  lift = true,
  disabled = false 
}: MacOSSpringProps) => {
  return (
    <div
      className={cn(
        'transition-all duration-200 ease-out transform-gpu',
        !disabled && scale && 'hover:scale-[1.02] active:scale-[0.98]',
        !disabled && lift && 'hover:-translate-y-1 hover:shadow-lg',
        'cursor-pointer',
        className
      )}
    >
      {children}
    </div>
  );
};

interface MacOSFadeProps {
  children: React.ReactNode;
  show?: boolean;
  duration?: number;
  delay?: number;
  className?: string;
}

export const MacOSFade = ({ 
  children, 
  show = true, 
  duration = 300,
  delay = 0,
  className 
}: MacOSFadeProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(show), delay);
    return () => clearTimeout(timer);
  }, [show, delay]);

  return (
    <div
      className={cn(
        'transition-all ease-out transform-gpu',
        mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
        className
      )}
      style={{ transitionDuration: `${duration}ms` }}
    >
      {children}
    </div>
  );
};

interface MacOSStaggerProps {
  children: React.ReactNode[];
  delay?: number;
  className?: string;
}

export const MacOSStagger = ({ children, delay = 100, className }: MacOSStaggerProps) => {
  return (
    <div className={className}>
      {children.map((child, index) => (
        <MacOSFade key={index} delay={index * delay}>
          {child}
        </MacOSFade>
      ))}
    </div>
  );
};

interface MacOSSlideProps {
  children: React.ReactNode;
  direction?: 'left' | 'right' | 'up' | 'down';
  show?: boolean;
  className?: string;
}

export const MacOSSlide = ({ 
  children, 
  direction = 'right', 
  show = true, 
  className 
}: MacOSSlideProps) => {
  const getTransform = () => {
    if (show) return 'translate-x-0 translate-y-0';
    
    switch (direction) {
      case 'left': return '-translate-x-full';
      case 'right': return 'translate-x-full';
      case 'up': return '-translate-y-full';
      case 'down': return 'translate-y-full';
      default: return 'translate-x-full';
    }
  };

  return (
    <div
      className={cn(
        'transition-transform duration-300 ease-out transform-gpu',
        getTransform(),
        className
      )}
    >
      {children}
    </div>
  );
};

export const MacOSPulse = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={cn('animate-pulse', className)}>
      {children}
    </div>
  );
};
