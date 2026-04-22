package com.university.smartcampus.service;

import com.university.smartcampus.dto.IncidentResponse;

import java.util.List;

public interface IncidentService {

    List<IncidentResponse> getIncidents();

    IncidentResponse updateIncidentStatus(Long incidentId, String status, String recipientEmail);

    IncidentResponse resolveIncident(Long incidentId);

    IncidentResponse assignTechnician(Long incidentId, String technicianEmail, String assignedBy);
}
