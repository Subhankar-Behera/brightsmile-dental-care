import axios from 'axios';
import { Service } from '../types';
import { SERVICES_DATA } from '../data/dummyData';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

export const serviceService = {
  /**
   * Fetches all dental services.
   * Ready to connect to a Spring Boot REST endpoint (e.g., GET /api/services).
   */
  getServices: async (): Promise<Service[]> => {
    // TODO: Connect to Spring Boot backend API
    // To connect, uncomment the Axios code below
    /*
    try {
      const response = await axios.get<Service[]>(`${API_BASE_URL}/services`);
      return response.data;
    } catch (error) {
      console.error('Error fetching services from Spring Boot API, falling back to dummy data:', error);
      throw error;
    }
    */

    // Simulate network delay to trigger beautiful loading skeletons in the UI
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(SERVICES_DATA);
      }, 500);
    });
  }
};
