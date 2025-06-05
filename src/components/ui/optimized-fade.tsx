
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedFadeProps {
  children: React.ReactNode;
  direction?: 'in' | 'out' | 'in-out';
  duration?: number;
  delay?: number;
  trigger?: boolean;
  className?: string;
  onAnimationComplete?: () => void;
}

export const OptimizedFade = ({
  children,
  direction = 'in',
  duration = 250,
  delay = 0,
  trigger = true,
  className,
  onAnimationComplete
}: OptimizedFadeProps) => {
  const [isVisible, setIsVisible] = useState(direction === 'in' || direction === 'in-out');
  const [shouldRender, setShouldRender] = useState(true);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trigger && direction === 'out') {
      setIsVisible(false);
      const timer = setTimeout(() => {
        setShouldRender(false);
        onAnimationComplete?.();
      }, duration + delay);
      return () => clearTimeout(timer);
    } else if (trigger && direction === 'in') {
      setShouldRender(true);
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [trigger, direction, duration, delay, onAnimationComplete]);

  if (!shouldRender) return null;

  return (
    <div
      ref={elementRef}
      className={cn(
        'transition-all ease-out',
        isVisible 
          ? 'opacity-100 translate-y-0 scale-100' 
          : 'opacity-0 translate-y-2 scale-98',
        className
      )}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  );
};

interface StaggeredFadeProps {
  children: React.ReactNode[];
  staggerDelay?: number;
  className?: string;
}

export const StaggeredFade = ({
  children,
  staggerDelay = 50,
  className
}: StaggeredFadeProps) => {
  return (
    <div className={cn('macos-stagger-children', className)}>
      {children.map((child, index) => (
        <OptimizedFade
          key={index}
          delay={index * staggerDelay}
          className="macos-gpu-accelerated"
        >
          {child}
        </OptimizedFade>
      ))}
    </div>
  );
};
