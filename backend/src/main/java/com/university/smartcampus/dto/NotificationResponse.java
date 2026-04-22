package com.university.smartcampus.dto;

import com.university.smartcampus.model.NotificationType;

import java.time.OffsetDateTime;

public record NotificationResponse(
        Long id,
        NotificationType type,
        String message,
        String entityType,
        Long entityId,
        boolean read,
        OffsetDateTime createdAt
) {
}
