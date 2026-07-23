package com.brightsmile.controller;

import com.brightsmile.dto.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/doctors")
@Tag(name = "Doctors", description = "Endpoints for retrieving information about dental specialists")
public class DoctorController {

    private static final List<Map<String, String>> DOCTORS = List.of(
            Map.of("id", "1", "name", "Dr. Sophia Carter", "specialty", "General Dentistry", "experience", "12 years", "availability", "Mon - Thu"),
            Map.of("id", "2", "name", "Dr. Marcus Vance", "specialty", "Orthodontics", "experience", "15 years", "availability", "Tue - Fri"),
            Map.of("id", "3", "name", "Dr. Emily Chen", "specialty", "Pediatric Dentistry", "experience", "8 years", "availability", "Mon, Wed, Fri"),
            Map.of("id", "4", "name", "Dr. David Kim", "specialty", "Periodontics & Implants", "experience", "10 years", "availability", "Thu - Sat")
    );

    @GetMapping
    @Operation(summary = "Get list of available dental doctors", description = "Retrieves active dentist profiles, specialties, and schedules for patient reference.")
    public ResponseEntity<ApiResponse<List<Map<String, String>>>> getAllDoctors() {
        ApiResponse<List<Map<String, String>>> response = new ApiResponse<>(
                true,
                "Doctors retrieved successfully.",
                DOCTORS
        );
        return ResponseEntity.ok(response);
    }
}
