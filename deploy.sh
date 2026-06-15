#!/bin/bash
set -e

# Configuration
SERVER_USER="root"
SERVER_IP="your-server-ip"
SERVER_PATH="/var/www/biyesheji"
BACKEND_PATH="/opt/biyesheji-backend"

echo "=== Building frontend ==="
cd "$(dirname "$0")"
npm run build

echo "=== Building backend ==="
cd backend
npx tsc
cd ..

echo "=== Deploying frontend ==="
rsync -avz --delete dist/ $SERVER_USER@$SERVER_IP:$SERVER_PATH/

echo "=== Deploying backend ==="
rsync -avz --delete --exclude 'node_modules' backend/dist/ $SERVER_USER@$SERVER_IP:$BACKEND_PATH/dist/
rsync -avz backend/package.json $SERVER_USER@$SERVER_IP:$BACKEND_PATH/
rsync -avz backend/.env.production $SERVER_USER@$SERVER_IP:$BACKEND_PATH/.env

echo "=== Installing backend dependencies ==="
ssh $SERVER_USER@$SERVER_IP "cd $BACKEND_PATH && npm install --production"

echo "=== Restarting backend ==="
ssh $SERVER_USER@$SERVER_IP "pm2 restart ecosystem.config.js --env production"

echo "=== Deployment complete ==="
