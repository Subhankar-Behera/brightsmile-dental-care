package com.brightsmile.service;

import com.brightsmile.dto.AppointmentRequestDTO;
import com.brightsmile.dto.AppointmentResponseDTO;

public interface AppointmentService {
    AppointmentResponseDTO createAppointment(AppointmentRequestDTO appointmentRequest);
}
