# Important

Don't push to main.
```bash
git switch dev
```

# How to setup development environment

```bash
# Build development environment
docker compose -f docker/docker-compose.dev.yml build --no-cache
# Run containers
docker compose -f docker/docker-compose.dev.yml up
```

# TODO

## ~~Environment~~

~~Separate Development and Production environments~~
- ~~Create Dockerfiles~~
- ~~Create Docker-compose~~
- ~~Create .env files~~

## Backend

### Eugene's

~~HTTPS ready~~

~~Security Headers~~

~~Proper CORS~~

LocalStorage JWT tokens

HttpOnly JWT tokens
- ~~Expiring~~
- ~~Short-lived~~
- ~~Authorization check on every endpoint~~
- CSRF protection

### Loanne's

Rate limiting

Non-parameterized SQL insertion

Parameterized SQL Insertion

Server-side Input Validation

Password Hashing

## Frontend

### Harry's

~~Proper Input Validation~~

~~Add Transaction Action~~

~~Pagination of large lists~~

JWT
- ~~Logout support~~
- ~~HttpOnly version~~
- Local Storage

~~Security Headers~~
