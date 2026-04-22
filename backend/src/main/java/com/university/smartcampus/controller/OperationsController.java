package com.university.smartcampus.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/ops")
public class OperationsController {

    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public Map<String, Object> adminPanel() {
        return Map.of("panel", "admin", "message", "Admin operations dashboard data");
    }

    @GetMapping("/manager")
    @PreAuthorize("hasAnyRole('MANAGER','ADMIN')")
    public Map<String, Object> managerPanel() {
        return Map.of("panel", "manager", "message", "Manager reports and approvals");
    }

    @GetMapping("/technician")
    @PreAuthorize("hasAnyRole('TECHNICIAN','MANAGER','ADMIN')")
    public Map<String, Object> technicianPanel() {
        return Map.of("panel", "technician", "message", "Technician assignments and updates");
    }
}
