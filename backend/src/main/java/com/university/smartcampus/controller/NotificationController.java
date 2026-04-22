package com.university.smartcampus.controller;

import com.university.smartcampus.dto.NotificationResponse;
import com.university.smartcampus.service.CurrentUserService;
import com.university.smartcampus.service.NotificationService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationService notificationService;
    private final CurrentUserService currentUserService;

    public NotificationController(NotificationService notificationService, CurrentUserService currentUserService) {
        this.notificationService = notificationService;
        this.currentUserService = currentUserService;
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('USER','TECHNICIAN','MANAGER','ADMIN')")
    public List<NotificationResponse> getNotifications(
            Authentication authentication,
            @RequestParam(defaultValue = "true") boolean unreadOnly
    ) {
        String email = currentUserService.getRequiredEmail(authentication);
        return notificationService.getNotificationsForUser(email, unreadOnly);
    }
}
