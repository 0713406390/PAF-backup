package com.university.smartcampus.service.impl;

import com.university.smartcampus.dto.BookingResponse;
import com.university.smartcampus.exception.ResourceNotFoundException;
import com.university.smartcampus.service.BookingService;
import com.university.smartcampus.service.NotificationService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

@Service
public class BookingServiceImpl implements BookingService {

    private final NotificationService notificationService;

    private final ConcurrentMap<Long, BookingData> bookings = new ConcurrentHashMap<>();

    public BookingServiceImpl(NotificationService notificationService) {
        this.notificationService = notificationService;
        bookings.put(1L, new BookingData(1L, "Lab A - 3D Printer", "APPROVED", "student1@campus.edu"));
        bookings.put(2L, new BookingData(2L, "Room B-204", "PENDING", "student2@campus.edu"));
    }

    @Override
    public List<BookingResponse> getBookings() {
        List<BookingResponse> rows = new ArrayList<>();
        for (BookingData booking : bookings.values()) {
            rows.add(new BookingResponse(booking.id(), booking.asset(), booking.status(), booking.requestedByEmail()));
        }
        return rows.stream()
                .sorted((a, b) -> Long.compare(a.id(), b.id()))
                .map(row -> new BookingResponse(row.id(), row.asset(), row.status(), row.requestedByEmail()))
                .toList();
    }

    @Override
    public BookingResponse updateBookingStatus(Long bookingId, String status, String recipientEmail) {
        BookingData current = bookings.get(bookingId);
        if (current == null) {
            throw new ResourceNotFoundException("Booking " + bookingId + " was not found");
        }

        String normalizedStatus = status == null ? "" : status.trim().toUpperCase(Locale.ROOT);
        if (!"APPROVED".equals(normalizedStatus) && !"REJECTED".equals(normalizedStatus)) {
            throw new IllegalArgumentException("Booking status must be APPROVED or REJECTED");
        }

        String targetRecipient = recipientEmail != null && !recipientEmail.isBlank()
                ? recipientEmail
                : current.requestedByEmail();

        BookingData updated = new BookingData(current.id(), current.asset(), normalizedStatus, current.requestedByEmail());
        bookings.put(bookingId, updated);

        notificationService.notifyBookingDecision(updated.id(), updated.asset(), normalizedStatus, targetRecipient);

        return new BookingResponse(updated.id(), updated.asset(), updated.status(), updated.requestedByEmail());
    }

    private record BookingData(Long id, String asset, String status, String requestedByEmail) {
    }
}
