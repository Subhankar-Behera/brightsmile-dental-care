import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  Send, 
  Check, 
  AlertCircle, 
  Mail, 
  Phone as PhoneIcon, 
  User, 
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { contactService } from '../services/contactService';
import LoadingSpinner from './LoadingSpinner';

const contactSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please provide a valid email address.' }),
  phone: z.string().min(10, { message: 'Phone number must be at least 10 digits.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters long.' }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    }
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      await contactService.submitContact({
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message
      });
      setIsSuccess(true);
      reset();
    } catch (err) {
      console.error('Contact submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-emerald-50/50 border border-emerald-100 rounded-3xl p-8 text-center space-y-6">
        <div className="mx-auto w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
          <Check className="w-6 h-6" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-bold font-display text-slate-900">
            Message Sent Successfully!
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
            Thank you for reaching out to BrightSmile Dental Care. Our clinical administration team has received your message and will respond within 12–24 business hours.
          </p>
        </div>
        <button
          onClick={() => setIsSuccess(false)}
          className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold cursor-pointer transition-colors"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 shadow-xl">
      <h3 className="text-lg font-bold font-display text-slate-900 mb-6 flex items-center gap-2">
        <MessageSquare className="w-5 h-5 text-blue-500" />
        <span>Send Us a Direct Message</span>
      </h3>

      {isSubmitting ? (
        <div className="py-12">
          <LoadingSpinner label="Transmitting inquiry securely to clinical servers..." />
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Your Full Name <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                <User className="w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder="Eleanor Vance"
                {...register('name')}
                className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm outline-hidden transition-all ${
                  errors.name
                    ? 'border-rose-400 focus:ring-2 focus:ring-rose-500/10'
                    : 'border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10'
                }`}
              />
            </div>
            {errors.name && (
              <p className="text-xs text-rose-500 font-semibold mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.name.message}</span>
              </p>
            )}
          </div>

          {/* Contact Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Email Address <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  type="email"
                  placeholder="eleanor@example.com"
                  {...register('email')}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm outline-hidden transition-all ${
                    errors.email
                      ? 'border-rose-400 focus:ring-2 focus:ring-rose-500/10'
                      : 'border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10'
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-rose-500 font-semibold mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.email.message}</span>
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Phone Number <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                  <PhoneIcon className="w-4 h-4" />
                </span>
                <input
                  type="tel"
                  placeholder="(555) 000-0000"
                  {...register('phone')}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm outline-hidden transition-all ${
                    errors.phone
                      ? 'border-rose-400 focus:ring-2 focus:ring-rose-500/10'
                      : 'border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10'
                  }`}
                />
              </div>
              {errors.phone && (
                <p className="text-xs text-rose-500 font-semibold mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.phone.message}</span>
                </p>
              )}
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Your Message <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={4}
              placeholder="Tell us about your dental needs, questions, or scheduling inquiries..."
              {...register('message')}
              className={`w-full px-4 py-3 rounded-xl border text-sm outline-hidden transition-all resize-none ${
                errors.message
                  ? 'border-rose-400 focus:ring-2 focus:ring-rose-500/10'
                  : 'border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10'
              }`}
            />
            {errors.message && (
              <p className="text-xs text-rose-500 font-semibold mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.message.message}</span>
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 active:scale-98 text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <span>Send Message</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
      )}
    </div>
  );
}
