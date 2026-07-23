package com.brightsmile.service;

import com.brightsmile.entity.Appointment;
import com.brightsmile.entity.ContactMessage;

public interface EmailService {
    void sendAppointmentEmailToPatient(Appointment appointment);
    void sendAppointmentEmailToStaff(Appointment appointment);
    void sendContactFormEmailToStaff(ContactMessage message);
}
