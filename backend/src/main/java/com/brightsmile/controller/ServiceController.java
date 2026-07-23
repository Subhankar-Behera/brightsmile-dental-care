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
@RequestMapping("/api/v1/services")
@Tag(name = "Services", description = "Endpoints for retrieving information about dental services offered")
public class ServiceController {

    private static final List<Map<String, String>> SERVICES = List.of(
            Map.of("id", "1", "name", "Comprehensive Checkup & Cleaning", "duration", "45 mins", "cost", "$120", "description", "Thorough examination with scaling, polishing, and oral wellness assessment."),
            Map.of("id", "2", "name", "Professional Teeth Whitening", "duration", "60 mins", "cost", "$299", "description", "In-office laser dental whitening for immediate brightening of your smile."),
            Map.of("id", "3", "name", "Clear Orthodontic Aligners", "duration", "30 mins consultation", "cost", "Varies", "description", "Discreet clear aligner treatment plans to correct teeth alignment."),
            Map.of("id", "4", "name", "Root Canal Treatment & Crown", "duration", "90 mins", "cost", "$850", "description", "Painless endodontic therapy to restore damaged tooth structures."),
            Map.of("id", "5", "name", "Advanced Dental Implant Placement", "duration", "120 mins", "cost", "$1500+", "description", "Permanent dental screw implant to replace missing tooth with natural looking crown."),
            Map.of("id", "6", "name", "Tooth Filling & Dental Restoration", "duration", "30 mins", "cost", "$150", "description", "Composite composite bonding fillings matching natural teeth aesthetics.")
    );

    @GetMapping
    @Operation(summary = "Get list of services offered by the clinic", description = "Retrieves active clinical treatments, durations, average pricing, and brief descriptions.")
    public ResponseEntity<ApiResponse<List<Map<String, String>>>> getAllServices() {
        ApiResponse<List<Map<String, String>>> response = new ApiResponse<>(
                true,
                "Services retrieved successfully.",
                SERVICES
        );
        return ResponseEntity.ok(response);
    }
}
