import React from 'react';

interface LoadingSpinnerProps {
  id?: string;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

export default function LoadingSpinner({
  id,
  size = 'md',
  label = 'Loading clinic data...',
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-6 h-6 border-2',
    md: 'w-12 h-12 border-3',
    lg: 'w-16 h-16 border-4',
  };

  return (
    <div id={id} className="flex flex-col items-center justify-center py-12 px-4">
      <div className="relative">
        {/* Outer glowing ripple */}
        <div
          className={`absolute inset-0 rounded-full bg-blue-100/40 animate-ping ${
            size === 'sm' ? 'scale-150' : size === 'md' ? 'scale-125' : 'scale-110'
          }`}
        ></div>

        {/* Spinning circle */}
        <div
          className={`${sizeClasses[size]} rounded-full border-slate-200 border-t-blue-600 animate-spin relative z-10`}
        ></div>
      </div>

      {label && (
        <p className="mt-4 text-sm font-medium text-slate-500 font-sans tracking-wide">
          {label}
        </p>
      )}
    </div>
  );
}
