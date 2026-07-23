import axios from 'axios';
import { AppointmentInput, Appointment } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

export const appointmentService = {
  /**
   * Submits a new appointment booking request.
   * Ready to connect to a Spring Boot REST endpoint (e.g., POST /api/appointments).
   */
  bookAppointment: async (appointmentData: AppointmentInput): Promise<Appointment> => {
    // TODO: Connect to Spring Boot backend API
    // To connect, uncomment the Axios code below
    /*
    try {
      const response = await axios.post<Appointment>(`${API_BASE_URL}/appointments`, appointmentData);
      return response.data;
    } catch (error) {
      console.error('Error booking appointment in Spring Boot API:', error);
      throw error;
    }
    */

    // Simulate network delay and return a mock successful database entry
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockResponse: Appointment = {
          ...appointmentData,
          id: `apt-${Math.random().toString(36).substr(2, 9)}`,
          status: 'PENDING',
          createdAt: new Date().toISOString()
        };
        resolve(mockResponse);
      }, 1000); // 1s simulation to display elegant submit buttons with loading spinners
    });
  }
};
