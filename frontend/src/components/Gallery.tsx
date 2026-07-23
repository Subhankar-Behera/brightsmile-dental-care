import React, { useState } from 'react';
import { GALLERY_DATA } from '../data/dummyData';
import { Image as ImageIcon, Sparkles } from 'lucide-react';

export default function Gallery() {
  const [filter, setFilter] = useState<string>('All');

  const categories = ['All', 'Interior', 'Equipment', 'Team'];

  const filteredItems = filter === 'All'
    ? GALLERY_DATA
    : GALLERY_DATA.filter(item => item.category === filter);

  return (
    <div className="space-y-8">
      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center items-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all cursor-pointer ${
              filter === cat
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid of gallery pictures */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="group relative bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-xs hover:shadow-md transition-all duration-300"
          >
            {/* Image viewport */}
            <div className="relative h-64 overflow-hidden bg-slate-100">
              <img
                src={item.image}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-300 bg-blue-900/50 backdrop-blur-xs px-2 py-0.5 rounded-md uppercase tracking-wider mb-2 w-fit">
                  <Sparkles className="w-2.5 h-2.5" />
                  {item.category}
                </span>
                <h4 className="text-white font-bold font-display text-base leading-tight">
                  {item.title}
                </h4>
              </div>
            </div>

            {/* Static Card Label for accessibility & mobile views where hover states are absent */}
            <div className="p-4 sm:hidden block">
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                {item.category}
              </span>
              <h4 className="text-slate-900 font-bold font-display text-sm mt-0.5">
                {item.title}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
