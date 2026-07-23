import axios from 'axios';
import { ContactInput, Contact } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

export const contactService = {
  /**
   * Submits a contact form request.
   * Ready to connect to a Spring Boot REST endpoint (e.g., POST /api/contacts).
   */
  submitContact: async (contactData: ContactInput): Promise<Contact> => {
    // TODO: Connect to Spring Boot backend API
    // To connect, uncomment the Axios code below
    /*
    try {
      const response = await axios.post<Contact>(`${API_BASE_URL}/contacts`, contactData);
      return response.data;
    } catch (error) {
      console.error('Error submitting contact form to Spring Boot API:', error);
      throw error;
    }
    */

    // Simulate network delay and return mock response
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockResponse: Contact = {
          ...contactData,
          id: `con-${Math.random().toString(36).substr(2, 9)}`,
          createdAt: new Date().toISOString()
        };
        resolve(mockResponse);
      }, 800); // 800ms simulation
    });
  }
};
