
import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

interface GlassDropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const GlassDropdown = ({ trigger, children, className }: GlassDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="macos-glass-button cursor-pointer flex items-center gap-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        {trigger}
        <ChevronDown className={cn(
          "h-4 w-4 transition-transform duration-200",
          isOpen && "rotate-180"
        )} />
      </div>
      
      <div className={cn(
        "absolute top-full left-0 mt-2 min-w-full macos-glass-dropdown macos-dropdown",
        isOpen && "open",
        className
      )}>
        <div className="p-2 space-y-1">
          {children}
        </div>
      </div>
    </div>
  );
};

export const GlassDropdownItem = ({ children, onClick, className }: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) => {
  return (
    <div
      className={cn("macos-dropdown-item", className)}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
