
import React from 'react';
import { cn } from '@/lib/utils';

interface MacOSToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
  disabled?: boolean;
}

export const MacOSToggle = ({ checked, onChange, className, disabled = false }: MacOSToggleProps) => {
  return (
    <div
      className={cn(
        'macos-toggle',
        checked && 'active',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      onClick={() => !disabled && onChange(!checked)}
    />
  );
};
