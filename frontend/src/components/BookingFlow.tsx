import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  Calendar as CalendarIcon, 
  User, 
  Clock, 
  FileText, 
  CheckCircle, 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  ArrowLeft,
  AlertCircle,
  Sparkles,
  Heart,
  Phone,
  Mail,
  ArrowRight
} from 'lucide-react';
import { DOCTORS_DATA, SERVICES_DATA } from '../data/dummyData';
import { appointmentService } from '../services/appointmentService';
import { Appointment, Doctor, Service } from '../types';
import LoadingSpinner from './LoadingSpinner';

// Zod Schema for validation
const appointmentSchema = z.object({
  name: z.string().min(2, { message: 'Full Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().min(10, { message: 'Phone number must be at least 10 digits.' }),
  preferredDoctor: z.string().min(1, { message: 'Please select a doctor.' }),
  preferredDate: z.string().min(1, { message: 'Please select an appointment date.' }),
  preferredTime: z.string().min(1, { message: 'Please select a time slot.' }),
  reasonForVisit: z.string().min(5, { message: 'Reason must be at least 5 characters.' }),
});

type AppointmentFormValues = z.infer<typeof appointmentSchema>;

interface BookingFlowProps {
  initialServiceId?: string;
  initialDoctorId?: string;
  onBookingComplete?: (appointment: Appointment) => void;
}

export default function BookingFlow({
  initialServiceId = '',
  initialDoctorId = '',
  onBookingComplete
}: BookingFlowProps) {
  // Wizard state: 1 = Doctor/Service, 2 = Date & Time, 3 = Details Form, 4 = Review, 5 = Success
  const [step, setStep] = useState<number>(1);
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>(initialDoctorId || 'any');
  const [selectedServiceId, setSelectedServiceId] = useState<string>(initialServiceId || 'srv-1');
  const [selectedDate, setSelectedDate] = useState<string>(''); // YYYY-MM-DD
  const [selectedTime, setSelectedTime] = useState<string>('');
  
  // Simulated Calendar values
  const [currentYear, setCurrentYear] = useState<number>(2026);
  const [currentMonth, setCurrentMonth] = useState<number>(6); // 0-indexed (July 2026 is month 6)
  
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedAppointment, setSubmittedAppointment] = useState<Appointment | null>(null);

  // Setup React Hook Form
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      preferredDoctor: initialDoctorId || 'any',
      preferredDate: '',
      preferredTime: '',
      reasonForVisit: '',
    }
  });

  // Watch fields to display in real-time
  const formValues = watch();

  // Handle changing inputs in hook form when state changes
  useEffect(() => {
    setValue('preferredDoctor', selectedDoctorId);
  }, [selectedDoctorId, setValue]);

  useEffect(() => {
    setValue('preferredDate', selectedDate);
  }, [selectedDate, setValue]);

  useEffect(() => {
    setValue('preferredTime', selectedTime);
  }, [selectedTime, setValue]);

  // Pre-fill fields if initials change
  useEffect(() => {
    if (initialDoctorId) {
      setSelectedDoctorId(initialDoctorId);
    }
    if (initialServiceId) {
      setSelectedServiceId(initialServiceId);
    }
  }, [initialDoctorId, initialServiceId]);

  // Find corresponding records
  const selectedDoctor = DOCTORS_DATA.find(d => d.id === selectedDoctorId);
  const selectedService = SERVICES_DATA.find(s => s.id === selectedServiceId) || SERVICES_DATA[0];

  // Calendar logic
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const firstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const handlePrevMonth = () => {
    if (currentMonth === 6 && currentYear === 2026) return; // Prevent going to past months (before today July 2026)
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Generate calendar dates
  const daysGrid = [];
  const numDays = daysInMonth(currentMonth, currentYear);
  const startDay = firstDayOfMonth(currentMonth, currentYear);

  // Pad previous month's days
  for (let i = 0; i < startDay; i++) {
    daysGrid.push(null);
  }

  // Add current month days
  for (let day = 1; day <= numDays; day++) {
    daysGrid.push(day);
  }

  // Get weekday of a specific date (0 = Sunday, 1 = Monday...)
  const getDayOfWeek = (day: number) => {
    return new Date(currentYear, currentMonth, day).getDay();
  };

  // Format date helper
  const formatDateString = (day: number) => {
    const m = String(currentMonth + 1).padStart(2, '0');
    const d = String(day).padStart(2, '0');
    return `${currentYear}-${m}-${d}`;
  };

  // Check if date is in the past (Simulated context date: 2026-07-20)
  const isPastDate = (day: number) => {
    const dateStr = formatDateString(day);
    return dateStr < '2026-07-20';
  };

  // Check if date is a Sunday
  const isSunday = (day: number) => {
    return getDayOfWeek(day) === 0;
  };

  // Check if date is available for the selected doctor
  const isDoctorAvailableOnDay = (day: number) => {
    if (selectedDoctorId === 'any') return true;
    if (!selectedDoctor) return true;
    const dayOfWeek = getDayOfWeek(day);
    return selectedDoctor.availableDays.includes(dayOfWeek);
  };

  const handleDateSelect = (day: number) => {
    if (isPastDate(day) || isSunday(day) || !isDoctorAvailableOnDay(day)) return;
    const dateStr = formatDateString(day);
    setSelectedDate(dateStr);
    setSelectedTime(''); // Reset selected time when date changes
  };

  // Get available timeslots
  const getTimeSlots = (): string[] => {
    if (selectedDoctorId === 'any') {
      // Return a general set of working hours
      return ['09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'];
    }
    return selectedDoctor ? selectedDoctor.availableTimes : [];
  };

  // Step transitions & validational gates
  const goToStep2 = () => {
    if (selectedServiceId) {
      setStep(2);
    }
  };

  const goToStep3 = () => {
    if (selectedDate && selectedTime) {
      setStep(3);
    }
  };

  const goToStep4 = async () => {
    // Validate form fields for step 3
    const isValid = await trigger(['name', 'email', 'phone', 'reasonForVisit']);
    if (isValid) {
      setStep(4);
    }
  };

  const handleFormSubmit = async (data: AppointmentFormValues) => {
    setIsSubmitting(true);
    try {
      const response = await appointmentService.bookAppointment({
        name: data.name,
        email: data.email,
        phone: data.phone,
        preferredDoctor: data.preferredDoctor,
        preferredDate: data.preferredDate,
        preferredTime: data.preferredTime,
        reasonForVisit: data.reasonForVisit
      });
      setSubmittedAppointment(response);
      setStep(5);
      if (onBookingComplete) {
        onBookingComplete(response);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getDoctorName = (id: string) => {
    if (id === 'any') return 'Any Doctor (No Preference)';
    const doc = DOCTORS_DATA.find(d => d.id === id);
    return doc ? doc.name : 'Unknown Doctor';
  };

  return (
    <div id="booking-workflow-wizard" className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden max-w-4xl mx-auto">
      
      {/* Wizard Header Progress Bar */}
      <div className="bg-slate-50 border-b border-slate-100 px-6 py-4 md:px-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-widest">
            Step {step} of 5
          </span>
          <span className="text-xs font-bold text-slate-500 font-display">
            {step === 1 && 'Select Treatment & Dentist'}
            {step === 2 && 'Choose Date & Time'}
            {step === 3 && 'Patient Information'}
            {step === 4 && 'Review & Confirm'}
            {step === 5 && 'Appointment Submitted'}
          </span>
        </div>
        {/* Progress bar container */}
        <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 transition-all duration-300"
            style={{ width: `${(step / 5) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="p-6 md:p-8">
        {/* STEP 1: Select Treatment & Doctor */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Select Service */}
              <div>
                <label className="block text-sm font-bold text-slate-800 font-display mb-3">
                  1. Select Dental Service
                </label>
                <div className="grid grid-cols-1 gap-2.5 max-h-72 overflow-y-auto pr-1">
                  {SERVICES_DATA.map((srv) => (
                    <button
                      key={srv.id}
                      onClick={() => setSelectedServiceId(srv.id)}
                      className={`w-full p-4 rounded-xl border text-left transition-all duration-200 flex items-center justify-between cursor-pointer ${
                        selectedServiceId === srv.id
                          ? 'border-blue-500 bg-blue-50/50 text-slate-900 ring-2 ring-blue-500/10'
                          : 'border-slate-100 hover:border-slate-300 bg-white text-slate-700'
                      }`}
                    >
                      <div>
                        <p className="font-bold font-display text-sm leading-tight text-slate-900">
                          {srv.name}
                        </p>
                        <p className="text-xs text-slate-500 font-sans mt-1">
                          Estimated Price: {srv.estimatedPrice} | {srv.duration}
                        </p>
                      </div>
                      {selectedServiceId === srv.id && (
                        <Check className="w-4 h-4 text-blue-600 shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Select Doctor */}
              <div>
                <label className="block text-sm font-bold text-slate-800 font-display mb-3">
                  2. Choose Preferred Dentist
                </label>
                <div className="grid grid-cols-1 gap-2.5 max-h-72 overflow-y-auto pr-1">
                  {/* Any Doctor / No preference option */}
                  <button
                    onClick={() => setSelectedDoctorId('any')}
                    className={`w-full p-4 rounded-xl border text-left transition-all duration-200 flex items-center justify-between cursor-pointer ${
                      selectedDoctorId === 'any'
                        ? 'border-blue-500 bg-blue-50/50 text-slate-900 ring-2 ring-blue-500/10'
                        : 'border-slate-100 hover:border-slate-300 bg-white text-slate-700'
                    }`}
                  >
                    <div>
                      <p className="font-bold font-display text-sm text-slate-900">
                        Any Dentist (No Preference)
                      </p>
                      <p className="text-xs text-slate-500 font-sans mt-1">
                        Select this for maximum date/time flexibility.
                      </p>
                    </div>
                    {selectedDoctorId === 'any' && (
                      <Check className="w-4 h-4 text-blue-600 shrink-0" />
                    )}
                  </button>

                  {DOCTORS_DATA.map((doc) => (
                    <button
                      key={doc.id}
                      onClick={() => setSelectedDoctorId(doc.id)}
                      className={`w-full p-4 rounded-xl border text-left transition-all duration-200 flex items-center gap-3 cursor-pointer ${
                        selectedDoctorId === doc.id
                          ? 'border-blue-500 bg-blue-50/50 text-slate-900 ring-2 ring-blue-500/10'
                          : 'border-slate-100 hover:border-slate-300 bg-white text-slate-700'
                      }`}
                    >
                      <img
                        src={doc.image}
                        alt={doc.name}
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 rounded-full object-cover shrink-0 border border-slate-100"
                      />
                      <div className="flex-grow">
                        <p className="font-bold font-display text-sm leading-tight text-slate-900">
                          {doc.name}
                        </p>
                        <p className="text-xs text-blue-600 font-semibold tracking-wide mt-0.5">
                          {doc.specialty}
                        </p>
                      </div>
                      {selectedDoctorId === doc.id && (
                        <Check className="w-4 h-4 text-blue-600 shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Next buttons */}
            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={goToStep2}
                disabled={!selectedServiceId}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 active:scale-95 disabled:opacity-50 text-white rounded-xl text-sm font-semibold flex items-center gap-1.5 shadow-sm hover:shadow-md cursor-pointer"
              >
                <span>Continue to Calendar</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Calendar & Select Slots */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Custom Calendar */}
              <div className="lg:col-span-7">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-slate-800 font-display">
                    Select a Appointment Date (Mon-Sat)
                  </h3>
                  
                  {/* Month Switcher */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={handlePrevMonth}
                      disabled={currentMonth === 6 && currentYear === 2026}
                      className="p-1.5 hover:bg-slate-100 disabled:opacity-30 rounded-lg text-slate-600 cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="text-xs font-bold text-slate-700 font-display min-w-[90px] text-center">
                      {monthNames[currentMonth]} {currentYear}
                    </span>
                    <button
                      onClick={handleNextMonth}
                      className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600 cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Calendar Grid */}
                <div className="border border-slate-100 rounded-2xl p-4 bg-slate-50/50">
                  {/* Days of week header */}
                  <div className="grid grid-cols-7 gap-1 text-center mb-2">
                    {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d, index) => (
                      <span
                        key={d}
                        className={`text-[11px] font-bold uppercase tracking-wider ${
                          index === 0 ? 'text-rose-500' : 'text-slate-400'
                        }`}
                      >
                        {d}
                      </span>
                    ))}
                  </div>

                  {/* Days block */}
                  <div className="grid grid-cols-7 gap-1.5 text-center">
                    {daysGrid.map((day, idx) => {
                      if (day === null) {
                        return <div key={`empty-${idx}`} className="aspect-square"></div>;
                      }

                      const dateStr = formatDateString(day);
                      const isSelected = selectedDate === dateStr;
                      const disabled = isPastDate(day) || isSunday(day) || !isDoctorAvailableOnDay(day);

                      return (
                        <button
                          key={`day-${day}`}
                          onClick={() => handleDateSelect(day)}
                          disabled={disabled}
                          className={`aspect-square flex flex-col items-center justify-center text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-blue-600 text-white font-bold shadow-xs'
                              : disabled
                              ? 'text-slate-300 cursor-not-allowed bg-transparent'
                              : 'text-slate-700 bg-white hover:bg-slate-100 border border-slate-100/50'
                          }`}
                        >
                          <span>{day}</span>
                          {!disabled && isSelected && (
                            <span className="w-1 h-1 rounded-full bg-white mt-0.5 animate-pulse"></span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Legend Details */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3 text-[11px] font-medium text-slate-500 px-1">
                  <div className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 bg-white border border-slate-100 rounded-sm"></span>
                    <span>Available</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 bg-slate-50 rounded-sm"></span>
                    <span>Fully Booked / Clinic Closed</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 bg-blue-600 rounded-sm"></span>
                    <span>Selected Date</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Time Slots */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-800 font-display mb-4">
                    Select Preferred Time Slot
                  </h3>

                  {selectedDate ? (
                    <div className="space-y-3">
                      <p className="text-xs text-slate-500 font-medium">
                        Showing times for <span className="font-bold text-slate-800">{selectedDate}</span>
                      </p>
                      
                      <div className="grid grid-cols-2 gap-2 max-h-72 overflow-y-auto pr-1">
                        {getTimeSlots().map((slot) => {
                          const isSelectedSlot = selectedTime === slot;
                          return (
                            <button
                              key={slot}
                              onClick={() => setSelectedTime(slot)}
                              className={`p-3.5 rounded-xl border text-xs font-bold font-display text-center transition-all cursor-pointer ${
                                isSelectedSlot
                                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                                  : 'bg-white text-slate-700 border-slate-100 hover:border-slate-300'
                              }`}
                            >
                              {slot}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-16 border border-dashed border-slate-200 rounded-2xl bg-slate-50/30 p-6 text-center">
                      <CalendarIcon className="w-10 h-10 text-slate-300 mb-3" />
                      <p className="text-sm font-semibold text-slate-700 font-display">
                        Please Select a Date First
                      </p>
                      <p className="text-xs text-slate-400 mt-1 max-w-[200px]">
                        Choose an available date on the calendar grid to unlock slots.
                      </p>
                    </div>
                  )}
                </div>

                {/* Back / Next buttons */}
                <div className="pt-6 border-t border-slate-100 mt-8 flex justify-between gap-3">
                  <button
                    onClick={() => setStep(1)}
                    className="px-5 py-2.5 border border-slate-200 text-slate-600 rounded-xl text-xs font-semibold flex items-center gap-1 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>

                  <button
                    onClick={goToStep3}
                    disabled={!selectedDate || !selectedTime}
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-95 disabled:opacity-50 text-white rounded-xl text-xs font-semibold flex items-center gap-1 shadow-xs hover:shadow-md cursor-pointer"
                  >
                    <span>Enter Details</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* STEP 3: Details Form */}
        {step === 3 && (
          <form onSubmit={handleSubmit(goToStep4)} className="space-y-6">
            <h3 className="text-sm font-bold text-slate-800 font-display border-b border-slate-50 pb-2 flex items-center gap-2">
              <User className="w-4 h-4 text-blue-500" />
              <span>Patient Contact & Details</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Name Field */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your first and last name"
                  {...register('name')}
                  className={`w-full px-4 py-3 rounded-xl border text-sm transition-all outline-hidden ${
                    errors.name
                      ? 'border-rose-400 focus:ring-2 focus:ring-rose-500/10'
                      : 'border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10'
                  }`}
                />
                {errors.name && (
                  <p className="text-xs text-rose-500 font-semibold mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.name.message}</span>
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  {...register('email')}
                  className={`w-full px-4 py-3 rounded-xl border text-sm transition-all outline-hidden ${
                    errors.email
                      ? 'border-rose-400 focus:ring-2 focus:ring-rose-500/10'
                      : 'border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10'
                  }`}
                />
                {errors.email && (
                  <p className="text-xs text-rose-500 font-semibold mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.email.message}</span>
                  </p>
                )}
              </div>

              {/* Phone Field */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Phone Number <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="e.g., (123) 456-7890"
                  {...register('phone')}
                  className={`w-full px-4 py-3 rounded-xl border text-sm transition-all outline-hidden ${
                    errors.phone
                      ? 'border-rose-400 focus:ring-2 focus:ring-rose-500/10'
                      : 'border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10'
                  }`}
                />
                {errors.phone && (
                  <p className="text-xs text-rose-500 font-semibold mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.phone.message}</span>
                  </p>
                )}
              </div>

              {/* Preselected details */}
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex flex-col justify-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Appointment Selection
                </span>
                <p className="text-xs text-slate-700 font-medium mt-1">
                  <span className="font-bold">Dentist:</span> {getDoctorName(selectedDoctorId)}
                </p>
                <p className="text-xs text-slate-700 font-medium mt-0.5">
                  <span className="font-bold">Date:</span> {selectedDate} | <span className="font-bold">Time:</span> {selectedTime}
                </p>
              </div>
            </div>

            {/* Reason for visit */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Reason for Visit / Symptoms <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows={3}
                placeholder="Briefly describe what you are seeking treatment for (e.g. checkup, toothache, alignment, etc.)"
                {...register('reasonForVisit')}
                className={`w-full px-4 py-3 rounded-xl border text-sm transition-all outline-hidden resize-none ${
                  errors.reasonForVisit
                    ? 'border-rose-400 focus:ring-2 focus:ring-rose-500/10'
                    : 'border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10'
                }`}
              />
              {errors.reasonForVisit && (
                <p className="text-xs text-rose-500 font-semibold mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.reasonForVisit.message}</span>
                </p>
              )}
            </div>

            {/* Back / Next buttons */}
            <div className="pt-6 border-t border-slate-100 flex justify-between gap-3">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-5 py-2.5 border border-slate-200 text-slate-600 rounded-xl text-xs font-semibold flex items-center gap-1 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>

              <button
                type="submit"
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white rounded-xl text-xs font-semibold flex items-center gap-1 shadow-xs hover:shadow-md cursor-pointer"
              >
                <span>Review Appointment</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}

        {/* STEP 4: Review Summary & Submit */}
        {step === 4 && (
          <div className="space-y-6">
            <h3 className="text-sm font-bold text-slate-800 font-display border-b border-slate-50 pb-2 flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-500" />
              <span>Review Details Before Submission</span>
            </h3>

            {isSubmitting ? (
              <div className="py-12">
                <LoadingSpinner label="Securing appointment slot in BrightSmile network..." />
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50/50 border border-slate-100 rounded-2xl p-6">
                  {/* Left Column: Appointment Slot Details */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      Appointment Details
                    </h4>
                    
                    <div className="space-y-3">
                      <div>
                        <span className="text-xs font-semibold text-slate-500">Selected Service:</span>
                        <p className="text-sm font-bold text-slate-800 font-display">{selectedService.name}</p>
                      </div>

                      <div>
                        <span className="text-xs font-semibold text-slate-500">Selected Dentist:</span>
                        <p className="text-sm font-bold text-slate-800 font-display">{getDoctorName(selectedDoctorId)}</p>
                      </div>

                      <div className="flex gap-4">
                        <div>
                          <span className="text-xs font-semibold text-slate-500">Date:</span>
                          <p className="text-sm font-bold text-blue-600 font-display">{selectedDate}</p>
                        </div>
                        <div>
                          <span className="text-xs font-semibold text-slate-500">Time Slot:</span>
                          <p className="text-sm font-bold text-blue-600 font-display">{selectedTime}</p>
                        </div>
                      </div>

                      <div className="flex gap-4 pt-2">
                        <div>
                          <span className="text-xs font-semibold text-slate-500">Est. Price Range:</span>
                          <p className="text-xs font-semibold text-slate-700 bg-white border border-slate-100 px-2.5 py-1 rounded-md mt-1">{selectedService.estimatedPrice}</p>
                        </div>
                        <div>
                          <span className="text-xs font-semibold text-slate-500">Treatment Duration:</span>
                          <p className="text-xs font-semibold text-slate-700 bg-white border border-slate-100 px-2.5 py-1 rounded-md mt-1">{selectedService.duration}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Patient Contact Details */}
                  <div className="space-y-4 md:border-l md:border-slate-100 md:pl-6">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      Patient Details
                    </h4>
                    
                    <div className="space-y-3">
                      <div>
                        <span className="text-xs font-semibold text-slate-500">Full Name:</span>
                        <p className="text-sm font-bold text-slate-800 font-display">{formValues.name}</p>
                      </div>

                      <div className="flex flex-wrap gap-x-6 gap-y-2">
                        <div>
                          <span className="text-xs font-semibold text-slate-500">Email:</span>
                          <p className="text-xs font-semibold text-slate-700">{formValues.email}</p>
                        </div>
                        <div>
                          <span className="text-xs font-semibold text-slate-500">Phone:</span>
                          <p className="text-xs font-semibold text-slate-700">{formValues.phone}</p>
                        </div>
                      </div>

                      <div>
                        <span className="text-xs font-semibold text-slate-500">Reason for Visit:</span>
                        <p className="text-xs font-medium text-slate-600 bg-white border border-slate-100 rounded-lg p-2.5 mt-1 leading-relaxed">
                          {formValues.reasonForVisit}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl flex gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-800 leading-relaxed font-sans">
                    <span className="font-bold">Note:</span> Submitting this form lodges a formal appointment request. Our administrative staff will review slots and contact you within 12–24 hours to secure and confirm the booking.
                  </p>
                </div>

                {/* Back / Submit buttons */}
                <div className="pt-6 border-t border-slate-100 flex justify-between gap-3">
                  <button
                    onClick={() => setStep(3)}
                    className="px-5 py-2.5 border border-slate-200 text-slate-600 rounded-xl text-xs font-semibold flex items-center gap-1 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>

                  <button
                    onClick={handleSubmit(handleFormSubmit)}
                    className="px-7 py-3 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white rounded-xl text-sm font-semibold flex items-center gap-1.5 shadow-md hover:shadow-lg cursor-pointer"
                  >
                    <span>Request Appointment</span>
                    <Check className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* STEP 5: Appointment Submitted Successfully Card */}
        {step === 5 && submittedAppointment && (
          <div className="text-center py-6 space-y-8 animate-fade-in">
            {/* Visual Header Success Badge */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-emerald-50 border border-emerald-100 text-emerald-500 rounded-full flex items-center justify-center shadow-xs mb-4">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold font-display text-slate-950 tracking-tight">
                Appointment Submitted Successfully!
              </h3>
              <p className="text-sm font-semibold text-emerald-600 font-sans tracking-wide mt-1">
                Request Ref: {submittedAppointment.id}
              </p>
            </div>

            {/* Summarized Card */}
            <div className="max-w-md mx-auto bg-slate-50/50 border border-slate-100 rounded-2xl p-6 text-left space-y-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2 flex items-center justify-between">
                <span>Appointment Summary</span>
                <span className="text-[10px] bg-amber-100/60 border border-amber-200 text-amber-700 font-bold px-2 py-0.5 rounded">PENDING REVIEWS</span>
              </h4>

              <div className="grid grid-cols-2 gap-4 text-xs font-sans">
                <div>
                  <span className="text-slate-400 block mb-0.5">Patient Name:</span>
                  <span className="font-bold text-slate-800">{submittedAppointment.name}</span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">Dental Treatment:</span>
                  <span className="font-bold text-slate-800">{selectedService.name}</span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">Date Requested:</span>
                  <span className="font-bold text-blue-600 font-display">{submittedAppointment.preferredDate}</span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">Time Slot Requested:</span>
                  <span className="font-bold text-blue-600 font-display">{submittedAppointment.preferredTime}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-slate-400 block mb-0.5">Preferred Doctor:</span>
                  <span className="font-bold text-slate-800">{getDoctorName(submittedAppointment.preferredDoctor)}</span>
                </div>
                <div className="col-span-2 border-t border-slate-100/50 pt-3">
                  <span className="text-slate-400 block mb-0.5">Reason for Visit:</span>
                  <span className="font-semibold text-slate-600 block bg-white border border-slate-100/60 p-2.5 rounded-lg leading-relaxed">
                    {submittedAppointment.reasonForVisit}
                  </span>
                </div>
              </div>
            </div>

            {/* Structured user notifications */}
            <div className="max-w-lg mx-auto bg-blue-50/50 border border-blue-100/40 p-5 rounded-xl space-y-3">
              <p className="text-sm font-semibold text-blue-900 font-sans">
                We have received your appointment request.
              </p>
              <p className="text-xs text-blue-700/90 leading-relaxed font-sans">
                Our clinic staff will contact you via email or phone within <span className="font-bold text-blue-900">12–24 hours</span> to confirm and officially schedule your appointment. A confirmation email has been sent to <span className="font-bold text-blue-900">{submittedAppointment.email}</span>.
              </p>
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <button
                onClick={() => {
                  setStep(1);
                  setSelectedDate('');
                  setSelectedTime('');
                  setSelectedDoctorId(initialDoctorId || 'any');
                  setSelectedServiceId(initialServiceId || 'srv-1');
                  setValue('name', '');
                  setValue('email', '');
                  setValue('phone', '');
                  setValue('reasonForVisit', '');
                }}
                className="px-6 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl text-xs font-semibold transition-all cursor-pointer"
              >
                Book Another Appointment
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
