package com.university.smartcampus.repository;

import com.university.smartcampus.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

    List<Notification> findByRecipientEmailOrderByCreatedAtDesc(String recipientEmail);

    List<Notification> findByRecipientEmailAndIsReadOrderByCreatedAtDesc(String recipientEmail, boolean isRead);
}
