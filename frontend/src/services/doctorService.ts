import axios from 'axios';
import { Doctor } from '../types';
import { DOCTORS_DATA } from '../data/dummyData';

// Placeholder API Base URL which can be loaded from environment variables in the future
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

export const doctorService = {
  /**
   * Fetches all dental doctors.
   * Ready to be connected to a Spring Boot REST endpoint (e.g., GET /api/doctors).
   */
  getDoctors: async (): Promise<Doctor[]> => {
    // TODO: Connect to Spring Boot backend API
    // To connect, uncomment the Axios code below and configure your backend endpoint
    /*
    try {
      const response = await axios.get<Doctor[]>(`${API_BASE_URL}/doctors`);
      return response.data;
    } catch (error) {
      console.error('Error fetching doctors from Spring Boot API, falling back to dummy data:', error);
      throw error;
    }
    */

    // Simulate network delay to trigger beautiful loading skeletons in the UI
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(DOCTORS_DATA);
      }, 600);
    });
  }
};
