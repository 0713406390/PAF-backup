package com.university.smartcampus.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @GetMapping
    @PreAuthorize("hasAnyRole('USER','MANAGER','ADMIN')")
    public List<Map<String, Object>> getBookings() {
        return List.of(
                Map.of("id", 1, "asset", "Lab A - 3D Printer", "status", "APPROVED"),
                Map.of("id", 2, "asset", "Room B-204", "status", "PENDING")
        );
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('USER','MANAGER','ADMIN')")
    public Map<String, Object> createBooking(@RequestBody Map<String, Object> payload) {
        return Map.of(
                "message", "Booking request created",
                "request", payload
        );
    }
}
