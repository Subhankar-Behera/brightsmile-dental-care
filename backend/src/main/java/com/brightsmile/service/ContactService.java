package com.brightsmile.service;

import com.brightsmile.dto.ContactRequestDTO;
import com.brightsmile.dto.ContactResponseDTO;

public interface ContactService {
    ContactResponseDTO saveContactMessage(ContactRequestDTO contactRequest);
}
