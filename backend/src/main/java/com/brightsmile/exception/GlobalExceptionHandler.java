package com.brightsmile.exception;

import com.brightsmile.dto.ErrorResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    // 1. Handle Validation Errors (Jakarta Bean Validation)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationExceptions(MethodArgumentNotValidException ex) {
        log.warn("Validation failed for incoming request: {}", ex.getMessage());
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });

        ErrorResponse response = new ErrorResponse("Validation failed.", errors);
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    // 2. Handle Custom Resource Not Found Errors
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleResourceNotFound(ResourceNotFoundException ex) {
        log.warn("Resource not found: {}", ex.getMessage());
        ErrorResponse response = new ErrorResponse(ex.getMessage());
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    // 3. Handle Database / JPA Persistence Errors
    @ExceptionHandler(DataAccessException.class)
    public ResponseEntity<ErrorResponse> handleDatabaseException(DataAccessException ex) {
        log.error("Database connection or query failure: ", ex);
        ErrorResponse response = new ErrorResponse("A database error occurred. Please check database connection and try again.");
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // 4. Handle Email Transport Exceptions
    @ExceptionHandler(EmailException.class)
    public ResponseEntity<ErrorResponse> handleEmailException(EmailException ex) {
        log.error("Email processing failed: ", ex);
        ErrorResponse response = new ErrorResponse("Appointment saved, but failed to send confirmation emails: " + ex.getMessage());
        return new ResponseEntity<>(response, HttpStatus.MULTI_STATUS); // Return MULTI_STATUS because database transaction succeeded but side-effect failed
    }

    // 5. Handle All Other Unknown Exceptions
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGeneralException(Exception ex) {
        log.error("An unexpected error occurred: ", ex);
        ErrorResponse response = new ErrorResponse("An unexpected server error occurred. Please contact administrator.");
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
