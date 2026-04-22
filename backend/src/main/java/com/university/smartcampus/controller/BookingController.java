package com.university.smartcampus.controller;

import com.university.smartcampus.dto.BookingResponse;
import com.university.smartcampus.dto.BookingStatusUpdateRequest;
import com.university.smartcampus.service.BookingService;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('USER','MANAGER','ADMIN')")
    public List<BookingResponse> getBookings() {
        return bookingService.getBookings();
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('USER','MANAGER','ADMIN')")
    public Map<String, Object> createBooking(@RequestBody Map<String, Object> payload) {
        return Map.of(
                "message", "Booking request created",
                "request", payload
        );
    }

    @PatchMapping("/{bookingId}/status")
    @PreAuthorize("hasAnyRole('MANAGER','ADMIN')")
    public BookingResponse updateBookingStatus(@PathVariable Long bookingId, @Valid @RequestBody BookingStatusUpdateRequest request) {
        return bookingService.updateBookingStatus(bookingId, request.status(), request.recipientEmail());
    }
}
