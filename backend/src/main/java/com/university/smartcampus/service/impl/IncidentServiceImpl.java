package com.university.smartcampus.service.impl;

import com.university.smartcampus.dto.IncidentResponse;
import com.university.smartcampus.exception.ResourceNotFoundException;
import com.university.smartcampus.service.IncidentService;
import com.university.smartcampus.service.NotificationService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

@Service
public class IncidentServiceImpl implements IncidentService {

    private final NotificationService notificationService;

    private final ConcurrentMap<Long, IncidentData> incidents = new ConcurrentHashMap<>();

    public IncidentServiceImpl(NotificationService notificationService) {
        this.notificationService = notificationService;
        incidents.put(101L, new IncidentData(101L, "Projector not working", "IN_PROGRESS", "tech1@campus.edu", "reporter1@campus.edu"));
        incidents.put(102L, new IncidentData(102L, "AC fault - Lab 2", "OPEN", null, "reporter2@campus.edu"));
    }

    @Override
    public List<IncidentResponse> getIncidents() {
        List<IncidentResponse> rows = new ArrayList<>();
        for (IncidentData incident : incidents.values()) {
            rows.add(toResponse(incident));
        }
        return rows.stream()
                .sorted((a, b) -> Long.compare(a.id(), b.id()))
                .toList();
    }

    @Override
    public IncidentResponse updateIncidentStatus(Long incidentId, String status, String recipientEmail) {
        IncidentData current = getById(incidentId);

        String normalizedStatus = status == null ? "" : status.trim().toUpperCase(Locale.ROOT);
        if (normalizedStatus.isBlank()) {
            throw new IllegalArgumentException("Incident status is required");
        }

        IncidentData updated = new IncidentData(
                current.id(),
                current.title(),
                normalizedStatus,
                current.assignedTechnicianEmail(),
                current.reportedByEmail()
        );
        incidents.put(incidentId, updated);

        String targetRecipient = recipientEmail != null && !recipientEmail.isBlank()
                ? recipientEmail
                : current.reportedByEmail();

        notificationService.notifyTicketStatusChanged(updated.id(), updated.title(), normalizedStatus, targetRecipient);
        return toResponse(updated);
    }

    @Override
    public IncidentResponse resolveIncident(Long incidentId) {
        return updateIncidentStatus(incidentId, "RESOLVED", null);
    }

    @Override
    public IncidentResponse assignTechnician(Long incidentId, String technicianEmail, String assignedBy) {
        IncidentData current = getById(incidentId);

        IncidentData updated = new IncidentData(
                current.id(),
                current.title(),
                "ASSIGNED",
                technicianEmail,
                current.reportedByEmail()
        );
        incidents.put(incidentId, updated);

        notificationService.notifyTechnicianAssigned(updated.id(), updated.title(), technicianEmail, assignedBy);
        return toResponse(updated);
    }

    private IncidentData getById(Long incidentId) {
        IncidentData incident = incidents.get(incidentId);
        if (incident == null) {
            throw new ResourceNotFoundException("Incident " + incidentId + " was not found");
        }
        return incident;
    }

    private IncidentResponse toResponse(IncidentData source) {
        return new IncidentResponse(
                source.id(),
                source.title(),
                source.status(),
                source.assignedTechnicianEmail()
        );
    }

    private record IncidentData(
            Long id,
            String title,
            String status,
            String assignedTechnicianEmail,
            String reportedByEmail
    ) {
    }
}
