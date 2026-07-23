package com.brightsmile.controller;

import com.brightsmile.dto.ApiResponse;
import com.brightsmile.dto.AppointmentRequestDTO;
import com.brightsmile.dto.AppointmentResponseDTO;
import com.brightsmile.service.AppointmentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/appointments")
@Tag(name = "Appointments", description = "Endpoints for scheduling patient appointments")
public class AppointmentController {

    private final AppointmentService appointmentService;

    // Constructor Injection
    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @PostMapping
    @Operation(summary = "Submit a new appointment request", description = "Submits and validates an appointment slot booking, saves it to database, and triggers confirmation emails.")
    @ApiResponses(value = {
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "201", description = "Appointment request successfully submitted",
            content = @Content(schema = @Schema(implementation = ApiResponse.class))),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "400", description = "Invalid request details provided"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "500", description = "Server error occurred during processing")
    })
    public ResponseEntity<ApiResponse<AppointmentResponseDTO>> submitAppointment(@Valid @RequestBody AppointmentRequestDTO requestDto) {
        AppointmentResponseDTO responseData = appointmentService.createAppointment(requestDto);
        ApiResponse<AppointmentResponseDTO> response = new ApiResponse<>(
                true,
                "Appointment request submitted successfully.",
                responseData
        );
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
}
