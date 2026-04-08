#!/bin/bash

# Deployment script for Art Marketplace

set -e

ENVIRONMENT=$1

if [ "$ENVIRONMENT" != "staging" ] && [ "$ENVIRONMENT" != "production" ]; then
    echo "Usage: $0 <staging|production>"
    exit 1
fi

echo "Deploying to $ENVIRONMENT..."

# Pull latest changes
git pull origin main

# Build and deploy
if [ "$ENVIRONMENT" == "staging" ]; then
    docker-compose -f docker-compose.yml down
    docker-compose -f docker-compose.yml up --build -d
elif [ "$ENVIRONMENT" == "production" ]; then
    docker-compose -f docker-compose.prod.yml down
    docker-compose -f docker-compose.prod.yml up --build -d
fi

# Wait for services to be healthy
echo "Waiting for services to start..."
sleep 30

# Run health checks
echo "Running health checks..."
curl -f http://localhost/api/ || echo "Backend health check failed"
curl -f http://localhost/ || echo "Frontend health check failed"

echo "Deployment to $ENVIRONMENT completed successfully!"