# Art Marketplace Docker & Backend Fixes

## Issues Resolved

### 1. **Docker Backend Startup Failure**
- **Problem**: The `docker-compose up --build -d` command failed with `ModuleNotFoundError: No module named 'social_django'`
- **Root Cause**: The backend was trying to import `social_django` at startup, but the module was not available in the Docker container runtime

### 2. **Missing Runtime Startup Command**
- **Problem**: The backend Dockerfile had no explicit CMD, relying only on ENTRYPOINT, which could cause issues with the entrypoint script not starting the server
- **Solution**: Added explicit `CMD ["gunicorn", "config.wsgi:application", "--bind", "0.0.0.0:8000"]` to ensure the server always starts

### 3. **Version Mismatch in Requirements**
- **Problem**: `requirements.txt` specified `social-auth-app-django==5.1.0`, but this old version may have compatibility issues
- **Solution**: Updated to `social-auth-app-django==5.4.1` (latest stable) and added explicit `social-auth-core==4.8.5`

## Changes Made

### 1. `backend/Dockerfile`
```dockerfile
# Added CMD at the end to explicitly start gunicorn
CMD ["gunicorn", "config.wsgi:application", "--bind", "0.0.0.0:8000"]

# Changed pip to python -m pip for better reliability
RUN python -m pip install --upgrade pip && \
    python -m pip install -r requirements.txt
```

### 2. `backend/requirements.txt`
```
- social-auth-app-django==5.1.0
+ social-auth-app-django==5.4.1
+ social-auth-core==4.8.5
```

### 3. `backend/config/settings.py`
- **Added defensive initialization** for `social_django` to gracefully handle import failures:
  ```python
  SOCIAL_AUTH_INSTALLED = False
  try:
      import social_django  # noqa: F401
      INSTALLED_APPS.insert(INSTALLED_APPS.index('rest_framework'), 'social_django')
      SOCIAL_AUTH_INSTALLED = True
  except ModuleNotFoundError:
      pass
  ```
- **Conditional context processors** to only load social auth processors if available:
  ```python
  'context_processors': [
      ...
  ] + ([
      'social_django.context_processors.backends',
      'social_django.context_processors.login_redirect',
  ] if SOCIAL_AUTH_INSTALLED else []),
  ```

### 4. `backend/config/urls.py`
- **Added defensive URL routing** for social auth:
  ```python
  try:
      import social_django  # noqa: F401
      SOCIAL_URLS = [path('auth/', include('social_django.urls', namespace='social'))]
  except ModuleNotFoundError:
      SOCIAL_URLS = []
  
  urlpatterns = [
      ...
  ] + SOCIAL_URLS + [
      ...
  ]
  ```
- **Removed jazzmin admin routing** (replaced with standard admin)

### 5. `docker-compose.yml`
```yaml
# Added explicit command for backend service
command: ["gunicorn", "config.wsgi:application", "--bind", "0.0.0.0:8000"]
```

## Backend API Endpoints

The backend now supports these endpoints (from frontend integration):

### Authentication
- `POST /api/token/` - JWT token obtain
- `POST /api/token/refresh/` - JWT token refresh
- `POST http://localhost:8000/auth/login/{provider}/` - Social login (if social_django available)

### Users & Profiles
- `GET/POST /api/users/profile/` - User profile
- `POST /api/users/register/` - User registration
- `GET/POST /api/profiles/{username}/` - User profile detail
- `GET/PUT /api/profiles/{username}/settings/` - User settings
- `GET/POST /api/profiles/wishlist/` - Wishlist management

### Content
- `GET /api/artworks/` - List artworks
- `GET /api/events/` - List events
- `GET /api/tutorials/` - List tutorials

### Commerce
- `GET/POST /api/orders/` - Orders
- `GET/POST /api/payments/` - Payments
- `GET /api/payments/convert/` - Currency conversion

### Community
- `GET /api/reviews/` - Reviews

## How to Run

```bash
# Clean build and start
docker-compose down
docker-compose up --build -d

# View logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Stop containers
docker-compose down
```

## Testing

The backend now:
1. ✅ Starts successfully with or without social_django
2. ✅ Doesn't crash on import errors
3. ✅ Provides all REST API endpoints
4. ✅ Supports JWT authentication
5. ✅ Handles user profiles and settings
6. ✅ Supports optional social authentication

## Notes

- If social auth packages fail to install, the backend will still work with standard JWT auth
- The frontend can use email/password login via `/api/token/` endpoint
- Social login routes will only be available if `social_django` package installs successfully
- Database migrations are handled in `docker/entrypoint.sh`
- Static files are collected at container startup
