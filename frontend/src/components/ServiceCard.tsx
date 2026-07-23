import React from 'react';
import { Service } from '../types';
import { 
  ClipboardCheck, 
  Activity, 
  Sparkles, 
  Layers, 
  ShieldCheck, 
  Smile, 
  Heart, 
  Clock, 
  ArrowRight,
  Sparkle
} from 'lucide-react';

interface ServiceCardProps {
  key?: React.Key;
  id?: string;
  service: Service;
  onBookNow: (serviceId: string) => void;
  onViewDetails?: (service: Service) => void;
}

// Map icon strings to Lucide icon components
const iconMap: Record<string, React.ComponentType<any>> = {
  ClipboardCheck,
  Activity,
  Sparkles,
  Layers,
  ShieldAlert: ShieldCheck, // fall back gracefully
  Smile,
  Heart
};

export default function ServiceCard({
  id,
  service,
  onBookNow,
  onViewDetails
}: ServiceCardProps) {
  const IconComponent = iconMap[service.iconName] || ClipboardCheck;

  return (
    <div
      id={id}
      className="group bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col h-full"
    >
      {/* Service Image Section */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-100">
        <img
          src={service.image}
          alt={service.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Floating Icon */}
        <div className="absolute bottom-4 left-4 p-2.5 rounded-xl bg-white/95 backdrop-blur-xs text-blue-600 shadow-md border border-slate-100 flex items-center justify-center">
          <IconComponent className="w-5 h-5" />
        </div>
      </div>

      {/* Service Contents */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold font-display text-slate-900 group-hover:text-blue-600 transition-colors duration-200">
          {service.name}
        </h3>
        
        {/* Duration badge */}
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mt-2 mb-3">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span>Avg. Duration: {service.duration}</span>
        </div>

        <p className="text-sm text-slate-600 font-sans line-clamp-3 mb-4 leading-relaxed flex-grow">
          {service.description}
        </p>

        {/* Action buttons */}
        <div className="pt-4 border-t border-slate-100/80 flex items-center justify-between gap-3 mt-auto">
          {onViewDetails && (
            <button
              onClick={() => onViewDetails(service)}
              className="text-xs font-semibold text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-1 cursor-pointer"
            >
              Learn More
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          )}

          <button
            onClick={() => onBookNow(service.id)}
            className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer ml-auto"
          >
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
}
