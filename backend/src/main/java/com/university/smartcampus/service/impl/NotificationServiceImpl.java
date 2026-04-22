package com.university.smartcampus.service.impl;

import com.university.smartcampus.dto.NotificationResponse;
import com.university.smartcampus.model.Notification;
import com.university.smartcampus.model.NotificationType;
import com.university.smartcampus.repository.NotificationRepository;
import com.university.smartcampus.service.NotificationService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;

    public NotificationServiceImpl(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    @Override
    public void notifyBookingDecision(Long bookingId, String bookingAsset, String decision, String recipientEmail) {
        String message = "Booking for " + bookingAsset + " was " + decision + ".";
        create(recipientEmail, NotificationType.BOOKING_DECISION, message, "BOOKING", bookingId);
    }

    @Override
    public void notifyTicketStatusChanged(Long ticketId, String title, String status, String recipientEmail) {
        String message = "Ticket \"" + title + "\" changed status to " + status + ".";
        create(recipientEmail, NotificationType.TICKET_STATUS_CHANGED, message, "INCIDENT", ticketId);
    }

    @Override
    public void notifyTechnicianAssigned(Long ticketId, String title, String technicianEmail, String assignedBy) {
        String message = "You were assigned to ticket \"" + title + "\" by " + assignedBy + ".";
        create(technicianEmail, NotificationType.TECHNICIAN_ASSIGNED, message, "INCIDENT", ticketId);
    }

    @Override
    public List<NotificationResponse> getNotificationsForUser(String recipientEmail, boolean unreadOnly) {
        List<Notification> rows = unreadOnly
                ? notificationRepository.findByRecipientEmailAndIsReadOrderByCreatedAtDesc(recipientEmail, false)
                : notificationRepository.findByRecipientEmailOrderByCreatedAtDesc(recipientEmail);

        return rows.stream()
                .map(row -> new NotificationResponse(
                        row.getId(),
                        row.getType(),
                        row.getMessage(),
                        row.getEntityType(),
                        row.getEntityId(),
                        row.isRead(),
                        row.getCreatedAt()
                ))
                .toList();
    }

    private void create(String recipientEmail, NotificationType type, String message, String entityType, Long entityId) {
        Notification notification = new Notification();
        notification.setRecipientEmail(recipientEmail);
        notification.setType(type);
        notification.setMessage(message);
        notification.setEntityType(entityType);
        notification.setEntityId(entityId);
        notification.setRead(false);
        notificationRepository.save(notification);
    }
}
