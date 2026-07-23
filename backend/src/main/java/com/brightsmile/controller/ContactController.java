package com.brightsmile.controller;

import com.brightsmile.dto.ApiResponse;
import com.brightsmile.dto.ContactRequestDTO;
import com.brightsmile.dto.ContactResponseDTO;
import com.brightsmile.service.ContactService;
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
@RequestMapping("/api/v1/contact")
@Tag(name = "Contact Messages", description = "Endpoints for handling patient contact form queries")
public class ContactController {

    private final ContactService contactService;

    // Constructor Injection
    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @PostMapping
    @Operation(summary = "Submit a contact form message", description = "Stores user question or query, saves contact details, and notifies staff via email alert.")
    @ApiResponses(value = {
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Inquiry message received successfully",
            content = @Content(schema = @Schema(implementation = ApiResponse.class))),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "400", description = "Validation on form fields failed")
    })
    public ResponseEntity<ApiResponse<ContactResponseDTO>> submitContactInquiry(@Valid @RequestBody ContactRequestDTO requestDto) {
        ContactResponseDTO responseData = contactService.saveContactMessage(requestDto);
        ApiResponse<ContactResponseDTO> response = new ApiResponse<>(
                true,
                "Your inquiry has been submitted successfully. Our team will contact you shortly.",
                responseData
        );
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
