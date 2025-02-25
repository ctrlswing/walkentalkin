import * as React from 'react';
import * as ToastPrimitive from '@radix-ui/react-toast';
import { Cross2Icon } from '@radix-ui/react-icons';

type ToastProps = {
  title: string;
  description?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type?: 'default' | 'success' | 'error';
};

export function Toast({
  title,
  description,
  open,
  onOpenChange,
  type = 'default',
}: ToastProps) {
  // Determine background color based on type
  const bgColors = {
    default: 'bg-gray-800 border-gray-700',
    success: 'bg-green-900/90 border-green-700',
    error: 'bg-red-900/90 border-red-700',
  }[type];
  
  const iconColors = {
    default: 'text-gray-400',
    success: 'text-green-400',
    error: 'text-red-400',
  }[type];

  return (
    <ToastPrimitive.Provider>
      <ToastPrimitive.Root
        className={`${bgColors} text-white rounded-xl shadow-xl p-5 fixed bottom-6 right-6 z-50 w-auto max-w-sm border backdrop-blur-sm`}
        open={open}
        onOpenChange={onOpenChange}
      >
        <div className="flex items-start gap-3">
          <div className={`${iconColors} mt-0.5`}>
            {type === 'success' && (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            )}
            {type === 'error' && (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            )}
            {type === 'default' && (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            )}
          </div>
          <div className="flex-1">
            <ToastPrimitive.Title className="font-medium text-sm">
              {title}
            </ToastPrimitive.Title>
            {description && (
              <ToastPrimitive.Description className="text-xs mt-1 opacity-90">
                {description}
              </ToastPrimitive.Description>
            )}
          </div>
          <ToastPrimitive.Close className="rounded-full p-1 hover:bg-white/10 transition-colors">
            <Cross2Icon className="h-4 w-4" />
          </ToastPrimitive.Close>
        </div>
      </ToastPrimitive.Root>
      <ToastPrimitive.Viewport />
    </ToastPrimitive.Provider>
  );
} 