package com.university.smartcampus.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record TechnicianAssignmentRequest(
        @NotBlank @Email String technicianEmail
) {
}
