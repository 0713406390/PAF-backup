# Member 4 - Frontend Route Protection and UI

## Route Protection Strategy
- Auth state is centralized in `AuthContext`.
- On app startup and OAuth callback, frontend requests `/api/auth/me`.
- `ProtectedRoute` blocks unauthenticated users and redirects to login.
- Role checks are applied per route and unauthorized users are redirected to `/unauthorized`.

## Role-aware Views
- USER: Home, Bookings, Incidents
- TECHNICIAN: Home, Incidents, Technician panel
- MANAGER: Home, Bookings, Incidents, Manager and Technician panels
- ADMIN: Full access including Admin panel

## UI Direction
- Campus operations visual style with gradient atmospheric background.
- Dashboard cards for operational metrics.
- Animated transitions and loading pulse indicators.
- Responsive layout for desktop and mobile.
