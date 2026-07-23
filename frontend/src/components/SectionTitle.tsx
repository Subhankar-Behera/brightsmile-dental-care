import React from 'react';

interface SectionTitleProps {
  id?: string;
  badge: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export default function SectionTitle({
  id,
  badge,
  title,
  subtitle,
  centered = true,
}: SectionTitleProps) {
  return (
    <div
      id={id}
      className={`mb-12 max-w-3xl ${
        centered ? 'mx-auto text-center' : 'text-left'
      }`}
    >
      {/* Category Pill */}
      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider text-blue-600 bg-blue-50 border border-blue-100/50 uppercase mb-4 shadow-xs">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
        {badge}
      </span>

      {/* Title */}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display tracking-tight text-slate-950 mt-1 mb-4 leading-tight">
        {title}
      </h2>

      {/* Description / Subtitle */}
      {subtitle && (
        <p className="text-base md:text-lg text-slate-600 font-sans leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
