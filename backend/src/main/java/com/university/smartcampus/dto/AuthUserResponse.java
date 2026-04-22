package com.university.smartcampus.dto;

public record AuthUserResponse(
        Long id,
        String email,
        String fullName,
        String role,
        boolean authenticated
) {
}
