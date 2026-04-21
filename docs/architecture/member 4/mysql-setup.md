# Member 4 - MySQL Configuration

## Backend Defaults
- JDBC URL: `jdbc:mysql://localhost:3306/smart_campus?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC`
- Username: `root`
- Password: `root`

## Required Environment Values
- `DB_URL`
- `DB_USERNAME`
- `DB_PASSWORD`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `FRONTEND_BASE_URL`

## Notes
- `ddl-auto: update` is enabled for development convenience.
- For production, use migrations and secure secret management.
