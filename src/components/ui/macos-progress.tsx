
import React from 'react';
import { cn } from '@/lib/utils';

interface MacOSProgressProps {
  value: number;
  max?: number;
  className?: string;
}

export const MacOSProgress = ({ value, max = 100, className }: MacOSProgressProps) => {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className={cn('macos-progress', className)}>
      <div 
        className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-sm transition-all duration-300"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};
