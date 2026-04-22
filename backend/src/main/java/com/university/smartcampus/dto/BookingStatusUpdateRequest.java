package com.university.smartcampus.dto;

import jakarta.validation.constraints.NotBlank;

public record BookingStatusUpdateRequest(
        @NotBlank String status,
        String recipientEmail
) {
}
