package com.university.smartcampus.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/incidents")
public class IncidentController {

    @GetMapping
    @PreAuthorize("hasAnyRole('USER','TECHNICIAN','MANAGER','ADMIN')")
    public List<Map<String, Object>> getIncidents() {
        return List.of(
                Map.of("id", 101, "title", "Projector not working", "status", "IN_PROGRESS"),
                Map.of("id", 102, "title", "AC fault - Lab 2", "status", "OPEN")
        );
    }

    @PatchMapping("/{incidentId}/resolve")
    @PreAuthorize("hasAnyRole('TECHNICIAN','MANAGER','ADMIN')")
    public Map<String, Object> resolveIncident(@PathVariable Long incidentId) {
        return Map.of("message", "Incident marked as resolved", "incidentId", incidentId);
    }
}
