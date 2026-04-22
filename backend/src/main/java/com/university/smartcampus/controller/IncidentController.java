package com.university.smartcampus.controller;

import com.university.smartcampus.dto.IncidentResponse;
import com.university.smartcampus.dto.IncidentStatusUpdateRequest;
import com.university.smartcampus.dto.TechnicianAssignmentRequest;
import com.university.smartcampus.service.CurrentUserService;
import com.university.smartcampus.service.IncidentService;
import jakarta.validation.Valid;
import org.springframework.security.core.Authentication;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/incidents")
public class IncidentController {

    private final IncidentService incidentService;
    private final CurrentUserService currentUserService;

    public IncidentController(IncidentService incidentService, CurrentUserService currentUserService) {
        this.incidentService = incidentService;
        this.currentUserService = currentUserService;
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('USER','TECHNICIAN','MANAGER','ADMIN')")
    public List<IncidentResponse> getIncidents() {
        return incidentService.getIncidents();
    }

    @PatchMapping("/{incidentId}/resolve")
    @PreAuthorize("hasAnyRole('TECHNICIAN','MANAGER','ADMIN')")
    public IncidentResponse resolveIncident(@PathVariable Long incidentId) {
        return incidentService.resolveIncident(incidentId);
    }

    @PatchMapping("/{incidentId}/status")
    @PreAuthorize("hasAnyRole('TECHNICIAN','MANAGER','ADMIN')")
    public IncidentResponse updateIncidentStatus(@PathVariable Long incidentId, @Valid @RequestBody IncidentStatusUpdateRequest request) {
        return incidentService.updateIncidentStatus(incidentId, request.status(), request.recipientEmail());
    }

    @PatchMapping("/{incidentId}/assign")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public IncidentResponse assignTechnician(
            @PathVariable Long incidentId,
            @Valid @RequestBody TechnicianAssignmentRequest request,
            Authentication authentication
    ) {
        String assignedBy = currentUserService.getRequiredEmail(authentication);
        return incidentService.assignTechnician(incidentId, request.technicianEmail(), assignedBy);
    }
}
