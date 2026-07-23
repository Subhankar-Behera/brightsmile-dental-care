import React from 'react';
import { TESTIMONIALS_DATA } from '../data/dummyData';
import { Star, Quote } from 'lucide-react';

export default function Testimonials() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {TESTIMONIALS_DATA.map((testimonial, idx) => (
        <div
          key={testimonial.id}
          className="relative bg-white p-8 rounded-2xl border border-slate-100 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
        >
          {/* Decorative quote icon */}
          <div className="absolute top-6 right-6 text-slate-100">
            <Quote className="w-12 h-12 fill-current" />
          </div>

          <div className="relative z-10">
            {/* Stars */}
            <div className="flex items-center gap-0.5 mb-5">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 fill-amber-400 text-amber-400"
                />
              ))}
            </div>

            {/* Content text */}
            <p className="text-slate-600 font-sans text-sm md:text-base leading-relaxed italic mb-6">
              "{testimonial.content}"
            </p>
          </div>

          {/* User profile */}
          <div className="flex items-center gap-4 pt-4 border-t border-slate-100/80">
            <img
              src={testimonial.avatar}
              alt={testimonial.name}
              referrerPolicy="no-referrer"
              className="w-11 h-11 rounded-full object-cover border border-slate-200"
            />
            <div>
              <h4 className="text-sm font-bold font-display text-slate-900">
                {testimonial.name}
              </h4>
              <p className="text-xs font-semibold text-blue-600 font-sans tracking-wide">
                {testimonial.role}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
