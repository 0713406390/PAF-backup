# Member 4 - OAuth2 and RBAC Design

## Implemented Scope
- Google OAuth 2.0 login integrated in Spring Security.
- Role model implemented with USER, ADMIN, MANAGER, TECHNICIAN.
- Backend role-based endpoint protection using URL rules and method-level authorization.
- Frontend route protection based on authenticated session and user role.

## Backend Flow
1. User clicks Google sign-in from frontend.
2. Browser is redirected to `/oauth2/authorization/google`.
3. Spring Security handles OAuth flow.
4. Custom OAuth2 user service persists/updates user in `app_users` table.
5. User receives role-based authority `ROLE_<ROLE>`.
6. Successful login redirects to `/auth/callback` in frontend.

## Role Assignment
- Role assignment is controlled through environment variables by user email list:
  - `ROLE_ADMIN_EMAILS`
  - `ROLE_MANAGER_EMAILS`
  - `ROLE_TECHNICIAN_EMAILS`
- Any unmatched email defaults to USER role.

## Protected Endpoints
- `/api/ops/admin` -> ADMIN
- `/api/ops/manager` -> MANAGER or ADMIN
- `/api/ops/technician` -> TECHNICIAN or MANAGER or ADMIN
- `/api/bookings` -> USER or MANAGER or ADMIN
- `/api/incidents` -> USER or TECHNICIAN or MANAGER or ADMIN
