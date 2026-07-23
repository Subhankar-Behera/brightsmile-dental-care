package com.brightsmile.mapper;

import com.brightsmile.dto.AppointmentRequestDTO;
import com.brightsmile.dto.AppointmentResponseDTO;
import com.brightsmile.entity.Appointment;
import org.springframework.stereotype.Component;

@Component
public class AppointmentMapper {

    public Appointment toEntity(AppointmentRequestDTO dto) {
        if (dto == null) {
            return null;
        }

        Appointment entity = new Appointment();
        entity.setPatientName(dto.getPatientName());
        entity.setEmail(dto.getEmail());
        entity.setPhone(dto.getPhone());
        entity.setDoctor(dto.getDoctor());
        entity.setAppointmentDate(dto.getAppointmentDate());
        entity.setAppointmentTime(dto.getAppointmentTime());
        entity.setReason(dto.getReason());
        return entity;
    }

    public AppointmentResponseDTO toResponseDto(Appointment entity) {
        if (entity == null) {
            return null;
        }

        AppointmentResponseDTO dto = new AppointmentResponseDTO();
        dto.setId(entity.getId());
        dto.setPatientName(entity.getPatientName());
        dto.setEmail(entity.getEmail());
        dto.setPhone(entity.getPhone());
        dto.setDoctor(entity.getDoctor());
        dto.setAppointmentDate(entity.getAppointmentDate());
        dto.setAppointmentTime(entity.getAppointmentTime());
        dto.setReason(entity.getReason());
        dto.setStatus(entity.getStatus());
        dto.setCreatedAt(entity.getCreatedAt());
        dto.setUpdatedAt(entity.getUpdatedAt());
        return dto;
    }
}
