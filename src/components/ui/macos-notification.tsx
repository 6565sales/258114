
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

interface MacOSNotificationProps {
  type?: 'success' | 'error' | 'info';
  title: string;
  message?: string;
  duration?: number;
  onClose?: () => void;
  className?: string;
}

export const MacOSNotification = ({
  type = 'info',
  title,
  message,
  duration = 5000,
  onClose,
  className
}: MacOSNotificationProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose?.();
    }, 300);
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  if (!isVisible) return null;

  return (
    <div className={cn(
      'macos-notification fixed top-4 right-4 z-50 p-4 min-w-80 max-w-96',
      !isVisible && 'opacity-0 translate-x-full',
      className
    )}>
      <div className="flex items-start gap-3">
        {getIcon()}
        <div className="flex-1">
          <h4 className="font-semibold macos-text-primary">{title}</h4>
          {message && (
            <p className="text-sm macos-text-secondary mt-1">{message}</p>
          )}
        </div>
        <button
          onClick={handleClose}
          className="macos-glass-button p-1 hover:bg-red-100"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
