package com.brightsmile.dto;

import jakarta.validation.constraints.*;
import java.time.LocalDate;
import java.time.LocalTime;

public class AppointmentRequestDTO {

    @NotBlank(message = "Patient Name is required")
    @Size(min = 2, max = 100, message = "Patient Name must be between 2 and 100 characters")
    private String patientName;

    @NotBlank(message = "Email is required")
    @Email(message = "Please provide a valid email address")
    private String email;

    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^\\+?[0-9\\s\\-\\)]{7,15}$", message = "Please provide a valid phone number (7 to 15 digits)")
    private String phone;

    @NotBlank(message = "Doctor is required")
    private String doctor;

    @NotNull(message = "Appointment date is required")
    @Future(message = "Appointment date must be in the future")
    private LocalDate appointmentDate;

    @NotNull(message = "Appointment time is required")
    private LocalTime appointmentTime;

    @NotBlank(message = "Reason for appointment is required")
    @Size(min = 5, max = 1000, message = "Reason must be between 5 and 1000 characters")
    private String reason;

    // Getters and setters
    public String getPatientName() {
        return patientName;
    }

    public void setPatientName(String patientName) {
        this.patientName = patientName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getDoctor() {
        return doctor;
    }

    public void setDoctor(String doctor) {
        this.doctor = doctor;
    }

    public LocalDate getAppointmentDate() {
        return appointmentDate;
    }

    public void setAppointmentDate(LocalDate appointmentDate) {
        this.appointmentDate = appointmentDate;
    }

    public LocalTime getAppointmentTime() {
        return appointmentTime;
    }

    public void setAppointmentTime(LocalTime appointmentTime) {
        this.appointmentTime = appointmentTime;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }
}
