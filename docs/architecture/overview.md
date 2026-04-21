# Architecture Overview

## System Style
- SPA client (React) + stateless REST API (Spring Boot)
- Role-based access control for Admin, Staff, Technician
- Relational persistence with PostgreSQL

## Core Domains
- User and role management
- Asset and facility catalog
- Booking requests and approvals
- Incident reporting and maintenance lifecycle
- Audit logging for accountability

## Non-Functional Targets
- Validation and predictable API error responses
- Layered architecture with clear separation of concerns
- Security by default with authenticated endpoints
- Traceable changes and status history for incidents/bookings
