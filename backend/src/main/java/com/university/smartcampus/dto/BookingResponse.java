package com.university.smartcampus.dto;

public record BookingResponse(
        Long id,
        String asset,
        String status,
        String requestedByEmail
) {
}
