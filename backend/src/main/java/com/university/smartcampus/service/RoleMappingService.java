package com.university.smartcampus.service;

import com.university.smartcampus.entity.Role;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Locale;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class RoleMappingService {

    private final Set<String> adminEmails;
    private final Set<String> managerEmails;
    private final Set<String> technicianEmails;

    public RoleMappingService(
            @Value("${app.security.role-mapping.admin-emails:}") String adminEmails,
            @Value("${app.security.role-mapping.manager-emails:}") String managerEmails,
            @Value("${app.security.role-mapping.technician-emails:}") String technicianEmails
    ) {
        this.adminEmails = toLowerSet(adminEmails);
        this.managerEmails = toLowerSet(managerEmails);
        this.technicianEmails = toLowerSet(technicianEmails);
    }

    public Role resolveRole(String email) {
        String normalized = email == null ? "" : email.toLowerCase(Locale.ROOT).trim();

        if (adminEmails.contains(normalized)) {
            return Role.ADMIN;
        }
        if (managerEmails.contains(normalized)) {
            return Role.MANAGER;
        }
        if (technicianEmails.contains(normalized)) {
            return Role.TECHNICIAN;
        }
        return Role.USER;
    }

    private Set<String> toLowerSet(String csv) {
        return Arrays.stream(csv.split(","))
                .map(String::trim)
                .map(value -> value.toLowerCase(Locale.ROOT))
                .filter(value -> !value.isBlank())
                .collect(Collectors.toSet());
    }
}
