package com.university.smartcampus.service;

import org.springframework.security.core.Authentication;

public interface CurrentUserService {

    String getRequiredEmail(Authentication authentication);
}
