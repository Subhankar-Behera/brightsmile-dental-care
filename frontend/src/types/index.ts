/**
 * TypeScript Interfaces for BrightSmile Dental Care
 */

export interface TimeSlot {
  id: string;
  time: string; // e.g., "09:00 AM"
  isAvailable: boolean;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  qualification: string;
  experience: string; // e.g., "12 Years"
  image: string;
  rating: number;
  reviewsCount: number;
  bio: string;
  availableDays: number[]; // 0 for Sunday, 1 for Monday, etc.
  availableTimes: string[]; // e.g., ["09:00 AM", "10:00 AM", ...]
}

export interface Service {
  id: string;
  name: string;
  iconName: string; // Lucide icon name
  image: string;
  description: string;
  detailedDescription: string;
  duration: string; // e.g., "30-45 mins"
  estimatedPrice: string; // e.g., "$99 - $150"
  benefits: string[];
}

export interface AppointmentInput {
  name: string;
  email: string;
  phone: string;
  preferredDoctor: string; // doctor ID
  preferredDate: string; // YYYY-MM-DD
  preferredTime: string; // e.g., "09:00 AM"
  reasonForVisit: string;
}

export interface Appointment extends AppointmentInput {
  id: string;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
  createdAt: string;
}

export interface ContactInput {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface Contact extends ContactInput {
  id: string;
  createdAt: string;
}
