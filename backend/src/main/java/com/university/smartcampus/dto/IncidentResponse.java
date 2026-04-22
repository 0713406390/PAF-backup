package com.university.smartcampus.dto;

public record IncidentResponse(
        Long id,
        String title,
        String status,
        String assignedTechnicianEmail
) {
}
