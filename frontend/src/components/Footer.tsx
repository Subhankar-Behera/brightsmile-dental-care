import React from 'react';
import { Sparkles, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, Clock } from 'lucide-react';

interface FooterProps {
  id?: string;
  setActiveTab: (tab: string) => void;
}

export default function Footer({
  id,
  setActiveTab
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id={id} className="bg-slate-900 text-slate-400 border-t border-slate-800">
      
      {/* Upper Footer: Multi-Column Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Brand Introduction */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-600 rounded-xl text-white">
                <Sparkles className="w-5 h-5 fill-current text-white" />
              </div>
              <div>
                <span className="block text-lg font-bold font-display tracking-tight text-white leading-none">
                  BrightSmile
                </span>
                <span className="text-[10px] font-bold text-blue-400 tracking-wider uppercase font-sans">
                  Dental Care
                </span>
              </div>
            </div>
            
            <p className="text-xs md:text-sm text-slate-400 leading-relaxed font-sans">
              Providing premium, anxiety-free oral healthcare utilizing cutting-edge dental technology. Experience comfort, precise diagnoses, and clinical excellence under one roof.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="p-2 bg-slate-800 hover:bg-blue-600 hover:text-white rounded-lg transition-colors cursor-pointer">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-slate-800 hover:bg-blue-400 hover:text-white rounded-lg transition-colors cursor-pointer">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-slate-800 hover:bg-pink-600 hover:text-white rounded-lg transition-colors cursor-pointer">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-slate-800 hover:bg-blue-700 hover:text-white rounded-lg transition-colors cursor-pointer">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 lg:pl-6">
            <h4 className="text-sm font-bold font-display tracking-wider text-white uppercase">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-sm font-sans">
              {['Home', 'Services', 'About', 'Book Appointment', 'Contact'].map((link) => {
                const tabVal = link === 'Book Appointment' ? 'book' : link.toLowerCase();
                return (
                  <li key={link}>
                    <button
                      onClick={() => handleNavClick(tabVal)}
                      className="hover:text-blue-400 transition-colors cursor-pointer text-left"
                    >
                      {link}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Opening Hours */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold font-display tracking-wider text-white uppercase flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-500" />
              <span>Opening Hours</span>
            </h4>
            
            <div className="space-y-2 text-xs md:text-sm font-sans">
              <div className="flex justify-between border-b border-slate-800 pb-1.5">
                <span>Monday - Thursday</span>
                <span className="font-semibold text-white">09:00 AM - 05:00 PM</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1.5">
                <span>Friday</span>
                <span className="font-semibold text-white">09:00 AM - 04:00 PM</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1.5">
                <span>Saturday</span>
                <span className="font-semibold text-white">09:00 AM - 01:00 PM</span>
              </div>
              <div className="flex justify-between text-rose-400">
                <span>Sunday</span>
                <span className="font-bold uppercase tracking-wider text-[10px] bg-rose-950/40 border border-rose-900/40 px-1.5 py-0.5 rounded">Closed</span>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold font-display tracking-wider text-white uppercase">
              Clinic Location
            </h4>
            
            <ul className="space-y-3 text-xs md:text-sm font-sans">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <span>120 Wellness Blvd, Suite 300, Medical Plaza, NY 10023</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-blue-500 shrink-0" />
                <a href="tel:5551234567" className="hover:text-blue-400 transition-colors">
                  (555) 123-4567
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-blue-500 shrink-0" />
                <a href="mailto:info@brightsmiledental.com" className="hover:text-blue-400 transition-colors break-all">
                  info@brightsmiledental.com
                </a>
              </li>
              <li className="pt-2 border-t border-slate-800">
                <div className="flex items-center gap-2 text-rose-400 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
                  <span>Emergency Line: (555) 999-0100</span>
                </div>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Lower Footer: Copyrights */}
      <div className="bg-slate-950 text-slate-500 text-xs py-6 border-t border-slate-900/60 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p>© {currentYear} BrightSmile Dental Care. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a>
            <span>•</span>
            <a href="#" className="hover:text-blue-400 transition-colors">Sitemap</a>
          </div>
        </div>
      </div>

    </footer>
  );
}
