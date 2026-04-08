#!/bin/bash

# Database backup script

BACKUP_DIR="./backups"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_DIR/backup_$DATE.sql"

mkdir -p $BACKUP_DIR

echo "Creating database backup..."

# For PostgreSQL
docker exec art-marketplace_db_1 pg_dump -U postgres art_marketplace > $BACKUP_FILE

echo "Backup created: $BACKUP_FILE"

# Keep only last 7 backups
cd $BACKUP_DIR
ls -t *.sql | tail -n +8 | xargs -r rm --

echo "Backup completed successfully!"