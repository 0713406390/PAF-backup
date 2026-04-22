package com.university.smartcampus.service;

import com.university.smartcampus.dto.BookingResponse;

import java.util.List;

public interface BookingService {

    List<BookingResponse> getBookings();

    BookingResponse updateBookingStatus(Long bookingId, String status, String recipientEmail);
}
