package com.brightsmile.mapper;

import com.brightsmile.dto.ContactRequestDTO;
import com.brightsmile.dto.ContactResponseDTO;
import com.brightsmile.entity.ContactMessage;
import org.springframework.stereotype.Component;

@Component
public class ContactMapper {

    public ContactMessage toEntity(ContactRequestDTO dto) {
        if (dto == null) {
            return null;
        }

        ContactMessage entity = new ContactMessage();
        entity.setName(dto.getName());
        entity.setEmail(dto.getEmail());
        entity.setPhone(dto.getPhone());
        entity.setMessage(dto.getMessage());
        return entity;
    }

    public ContactResponseDTO toResponseDto(ContactMessage entity) {
        if (entity == null) {
            return null;
        }

        ContactResponseDTO dto = new ContactResponseDTO();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setEmail(entity.getEmail());
        dto.setPhone(entity.getPhone());
        dto.setMessage(entity.getMessage());
        dto.setCreatedAt(entity.getCreatedAt());
        return dto;
    }
}
