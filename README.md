# Smart Campus Operations Hub

Production-inspired full-stack system scaffold for managing campus bookings and maintenance incidents.

## Tech Stack
- Backend: Java 21, Spring Boot, Spring Security, Spring Data JPA, PostgreSQL
- Frontend: React + TypeScript + Vite

## Repository Structure
- backend: Spring Boot REST API
- frontend: React client application
- docs: Architecture notes and API contracts

## Quick Start
1. Start PostgreSQL and create a database.
2. Configure backend values in backend/.env.example (copy to your environment).
3. Run backend:
   - cd backend
   - mvn spring-boot:run
4. Run frontend:
   - cd frontend
   - npm install
   - npm run dev

## Suggested Workflow for Assessment
1. Define domain model (users, roles, assets, bookings, incidents, maintenance updates).
2. Implement authentication + role-based authorization.
3. Build booking workflow APIs with validation and conflict checks.
4. Build incident/fault reporting and technician resolution workflow.
5. Add audit trail logging and admin reporting endpoints.
6. Connect frontend pages to each workflow.
7. Add tests and final deployment/documentation.
