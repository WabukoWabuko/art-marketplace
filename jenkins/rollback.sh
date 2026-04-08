#!/bin/bash

# Rollback script for Art Marketplace

set -e

ENVIRONMENT=$1

if [ "$ENVIRONMENT" != "staging" ] && [ "$ENVIRONMENT" != "production" ]; then
    echo "Usage: $0 <staging|production>"
    exit 1
fi

echo "Rolling back $ENVIRONMENT deployment..."

# Get previous successful build
PREVIOUS_TAG=$(docker images art-marketplace-backend --format "{{.Repository}}:{{.Tag}}" | grep -v latest | head -n 1)

if [ -z "$PREVIOUS_TAG" ]; then
    echo "No previous build found for rollback"
    exit 1
fi

echo "Rolling back to $PREVIOUS_TAG"

# Update docker-compose files with previous tag
# This would need to be implemented based on your tagging strategy

# Restart services
if [ "$ENVIRONMENT" == "staging" ]; then
    docker-compose -f docker-compose.yml down
    docker-compose -f docker-compose.yml up -d
elif [ "$ENVIRONMENT" == "production" ]; then
    docker-compose -f docker-compose.prod.yml down
    docker-compose -f docker-compose.prod.yml up -d
fi

echo "Rollback completed successfully!"