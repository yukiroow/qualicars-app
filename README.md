# How to setup development environment

```bash
# Build development environment
docker compose -f docker/docker-compose.dev.yml build --no-cache
# Run containers
docker compose -f docker/docker-compose.dev.yml up
```

# TODO

~~## Environment~~

~~Separate Development and Production environments~~
~~- Create Dockerfiles~~
~~- Create Docker-compose~~
~~- Create .env files~~

## Backend

Rate limiting

HTTPS ready

HttpOnly JWT tokens
- Expiring
- Short-lived
- Authorization check on every endpoint
- CSRF protection

Security Headers
Proper CORS

Parameterized SQL Insertion

Server-side Input Validation

Password Hashing


## Frontend

Proper Input Validation

Add Transaction Action

Search, Filtering, Sorting

JWT
- Logout support

Security Headers
