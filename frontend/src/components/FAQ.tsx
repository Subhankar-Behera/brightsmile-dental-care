import React, { useState } from 'react';
import { FAQ_DATA } from '../data/dummyData';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {FAQ_DATA.map((faq) => {
        const isOpen = openId === faq.id;
        return (
          <div
            key={faq.id}
            className="bg-white border border-slate-100 rounded-xl overflow-hidden transition-all duration-300"
          >
            <button
              onClick={() => toggleFAQ(faq.id)}
              className="w-full flex items-start justify-between gap-4 p-5 md:p-6 text-left hover:bg-slate-50/50 transition-colors cursor-pointer"
            >
              <div className="flex gap-3">
                <HelpCircle className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
                <span className="font-semibold text-slate-900 font-display text-sm md:text-base leading-tight">
                  {faq.question}
                </span>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 mt-0.5 ${
                  isOpen ? 'rotate-180 text-blue-600' : ''
                }`}
              />
            </button>

            {/* Answer Panel */}
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                isOpen ? 'max-h-52 border-t border-slate-50' : 'max-h-0'
              }`}
            >
              <p className="p-5 md:p-6 text-sm text-slate-600 font-sans leading-relaxed bg-slate-50/30">
                {faq.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
