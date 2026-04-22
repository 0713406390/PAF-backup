package com.university.smartcampus.service;

import com.university.smartcampus.dto.NotificationResponse;

import java.util.List;

public interface NotificationService {

    void notifyBookingDecision(Long bookingId, String bookingAsset, String decision, String recipientEmail);

    void notifyTicketStatusChanged(Long ticketId, String title, String status, String recipientEmail);

    void notifyTechnicianAssigned(Long ticketId, String title, String technicianEmail, String assignedBy);

    List<NotificationResponse> getNotificationsForUser(String recipientEmail, boolean unreadOnly);
}
