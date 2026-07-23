package com.brightsmile.service.impl;

import com.brightsmile.dto.ContactRequestDTO;
import com.brightsmile.dto.ContactResponseDTO;
import com.brightsmile.entity.ContactMessage;
import com.brightsmile.mapper.ContactMapper;
import com.brightsmile.repository.ContactMessageRepository;
import com.brightsmile.service.ContactService;
import com.brightsmile.service.EmailService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ContactServiceImpl implements ContactService {

    private static final Logger log = LoggerFactory.getLogger(ContactServiceImpl.class);

    private final ContactMessageRepository contactRepository;
    private final ContactMapper contactMapper;
    private final EmailService emailService;

    // Constructor Injection
    public ContactServiceImpl(ContactMessageRepository contactRepository,
                              ContactMapper contactMapper,
                              EmailService emailService) {
        this.contactRepository = contactRepository;
        this.contactMapper = contactMapper;
        this.emailService = emailService;
    }

    @Override
    @Transactional
    public ContactResponseDTO saveContactMessage(ContactRequestDTO dto) {
        log.info("Processing new contact message from sender: {}", dto.getName());

        // 1. Map DTO to Entity
        ContactMessage entity = contactMapper.toEntity(dto);

        // 2. Save message to database
        ContactMessage savedEntity = contactRepository.save(entity);
        log.info("Contact Created: Saved contact message with ID: {}", savedEntity.getId());

        // 3. Notify clinic staff
        try {
            emailService.sendContactFormEmailToStaff(savedEntity);
        } catch (Exception e) {
            log.error("Email processing failed after contact form save: {}", e.getMessage());
        }

        // 4. Return serialized DTO response
        return contactMapper.toResponseDto(savedEntity);
    }
}
