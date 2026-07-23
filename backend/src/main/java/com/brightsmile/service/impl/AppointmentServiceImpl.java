package com.brightsmile.service.impl;

import com.brightsmile.dto.AppointmentRequestDTO;
import com.brightsmile.dto.AppointmentResponseDTO;
import com.brightsmile.entity.Appointment;
import com.brightsmile.enums.AppointmentStatus;
import com.brightsmile.mapper.AppointmentMapper;
import com.brightsmile.repository.AppointmentRepository;
import com.brightsmile.service.AppointmentService;
import com.brightsmile.service.EmailService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AppointmentServiceImpl implements AppointmentService {

    private static final Logger log = LoggerFactory.getLogger(AppointmentServiceImpl.class);

    private final AppointmentRepository appointmentRepository;
    private final AppointmentMapper appointmentMapper;
    private final EmailService emailService;

    // Constructor Injection
    public AppointmentServiceImpl(AppointmentRepository appointmentRepository,
                                  AppointmentMapper appointmentMapper,
                                  EmailService emailService) {
        this.appointmentRepository = appointmentRepository;
        this.appointmentMapper = appointmentMapper;
        this.emailService = emailService;
    }

    @Override
    @Transactional
    public AppointmentResponseDTO createAppointment(AppointmentRequestDTO dto) {
        log.info("Processing new appointment request for patient: {} with doctor: {}", dto.getPatientName(), dto.getDoctor());

        // 1. Map DTO to Entity
        Appointment entity = appointmentMapper.toEntity(dto);
        
        // 2. Set default status to PENDING
        entity.setStatus(AppointmentStatus.PENDING);

        // 3. Save to database
        Appointment savedEntity = appointmentRepository.save(entity);
        log.info("Appointment Created: Saved appointment to database with ID: {}", savedEntity.getId());

        // 4. Send Confirmation Emails asynchronously or inline (inline for simplicity or handled gracefully in case of SMTP failures)
        try {
            // Send patient email
            emailService.sendAppointmentEmailToPatient(savedEntity);
            
            // Send staff email
            emailService.sendAppointmentEmailToStaff(savedEntity);
        } catch (Exception e) {
            log.error("Email processing failed after appointment save: {}", e.getMessage());
            // In a production app, we may choose to log and proceed, or fail the transaction.
            // As per requirements, we log 'Email Failed' and can let the exception handler handle it.
            // We'll proceed so the patient sees success since booking was saved, or bubble up. Let's let it bubble or handle gracefully.
        }

        // 5. Convert saved Entity back to Response DTO
        return appointmentMapper.toResponseDto(savedEntity);
    }
}
