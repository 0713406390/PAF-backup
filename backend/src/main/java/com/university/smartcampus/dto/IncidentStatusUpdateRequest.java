package com.university.smartcampus.dto;

import jakarta.validation.constraints.NotBlank;

public record IncidentStatusUpdateRequest(
        @NotBlank String status,
        String recipientEmail
) {
}
