import React, { useState, useEffect } from 'react';
import { Sparkles, Menu, X, Calendar, Phone } from 'lucide-react';

interface NavbarProps {
  id?: string;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Navbar({
  id,
  activeTab,
  setActiveTab
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Monitor scroll for visual glassmorphism transitions
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', value: 'home' },
    { name: 'Services', value: 'services' },
    { name: 'About', value: 'about' },
    { name: 'Book Appointment', value: 'book' },
    { name: 'Contact', value: 'contact' }
  ];

  const handleNavClick = (val: string) => {
    setActiveTab(val);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav
      id={id}
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-xs border-b border-slate-100/80 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 text-left cursor-pointer group"
          >
            <div className="p-2 bg-blue-600 rounded-xl text-white shadow-md shadow-blue-500/10 group-hover:bg-blue-700 transition-colors">
              <Sparkles className="w-5 h-5 fill-current text-white" />
            </div>
            <div>
              <span className="block text-lg font-bold font-display tracking-tight text-slate-950 leading-none">
                BrightSmile
              </span>
              <span className="text-[10px] font-bold text-blue-600 tracking-wider uppercase font-sans">
                Dental Care
              </span>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = activeTab === link.value;
              return (
                <button
                  key={link.value}
                  onClick={() => handleNavClick(link.value)}
                  className={`relative text-sm font-semibold tracking-wide font-sans cursor-pointer transition-colors py-1.5 ${
                    isActive
                      ? 'text-blue-600'
                      : 'text-slate-600 hover:text-blue-600'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 inset-x-0 h-0.5 bg-blue-600 rounded-full"></span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Desktop Call Actions */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:5551234567"
              className="flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-blue-600 transition-colors px-3 py-1.5 rounded-lg border border-slate-100 bg-slate-50/50"
            >
              <Phone className="w-3.5 h-3.5 text-blue-500 animate-bounce" />
              <span>(555) 123-4567</span>
            </a>

            <button
              onClick={() => handleNavClick('book')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-xs font-bold text-white rounded-xl shadow-xs hover:shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* Hamburger Mobile Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-950 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-x-0 top-16 bg-white border-b border-slate-100 shadow-xl p-5 space-y-4 animate-fade-in z-30 max-h-[85vh] overflow-y-auto">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const isActive = activeTab === link.value;
              return (
                <button
                  key={link.value}
                  onClick={() => handleNavClick(link.value)}
                  className={`w-full py-3 px-4 rounded-xl text-left text-sm font-bold font-sans transition-all cursor-pointer ${
                    isActive
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-blue-600'
                  }`}
                >
                  {link.name}
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-100 space-y-3">
            <a
              href="tel:5551234567"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-slate-200 text-slate-700 font-bold text-sm bg-slate-50"
            >
              <Phone className="w-4 h-4 text-blue-500" />
              <span>(555) 123-4567</span>
            </a>

            <button
              onClick={() => handleNavClick('book')}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
