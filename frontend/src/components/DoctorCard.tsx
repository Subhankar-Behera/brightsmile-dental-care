import React from 'react';
import { Doctor } from '../types';
import { Star, Award, Calendar, ChevronRight } from 'lucide-react';

interface DoctorCardProps {
  key?: React.Key;
  id?: string;
  doctor: Doctor;
  onBookWithDoctor: (doctorId: string) => void;
  selected?: boolean;
}

export default function DoctorCard({
  id,
  doctor,
  onBookWithDoctor,
  selected = false,
}: DoctorCardProps) {
  return (
    <div
      id={id}
      className={`group bg-white rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col h-full ${
        selected
          ? 'border-blue-500 shadow-md ring-2 ring-blue-500/10'
          : 'border-slate-100 shadow-xs hover:shadow-lg'
      }`}
    >
      {/* Photo Frame */}
      <div className="relative h-64 w-full bg-slate-50 overflow-hidden">
        <img
          src={doctor.image}
          alt={doctor.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
        />
        {/* Rating overlay badge */}
        <div className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/95 backdrop-blur-xs text-xs font-bold text-amber-500 shadow-sm border border-amber-100/50">
          <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
          <span>{doctor.rating.toFixed(1)}</span>
          <span className="text-slate-400 font-normal">({doctor.reviewsCount})</span>
        </div>

        {/* Experience Label */}
        <div className="absolute bottom-4 left-4 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900/80 backdrop-blur-xs text-xs font-semibold text-white shadow-xs">
          <Award className="w-3.5 h-3.5 text-blue-300" />
          <span>{doctor.experience} Exp</span>
        </div>
      </div>

      {/* Info details */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-3">
          <h3 className="text-xl font-bold font-display text-slate-900 group-hover:text-blue-600 transition-colors">
            {doctor.name}
          </h3>
          <p className="text-sm font-semibold text-blue-600 font-sans tracking-wide">
            {doctor.specialty}
          </p>
        </div>

        {/* Qualification */}
        <p className="text-xs font-medium text-slate-500 bg-slate-50 border border-slate-100/80 p-2.5 rounded-lg mb-4 italic leading-snug">
          {doctor.qualification}
        </p>

        {/* Bio summary */}
        <p className="text-sm text-slate-600 font-sans leading-relaxed mb-6 line-clamp-3">
          {doctor.bio}
        </p>

        {/* Action button */}
        <div className="mt-auto pt-4 border-t border-slate-100/80">
          <button
            onClick={() => onBookWithDoctor(doctor.id)}
            className={`w-full py-2.5 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              selected
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-blue-50 text-blue-600 hover:bg-blue-100 active:scale-98'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>{selected ? 'Doctor Selected' : 'Book Appointment'}</span>
            {!selected && <ChevronRight className="w-4 h-4 ml-0.5" />}
          </button>
        </div>
      </div>
    </div>
  );
}
