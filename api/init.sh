#!/bin/bash

set -e

echo ""
echo "Updating node dependencies (npm install)"
npm --no-fund install

echo ""
echo "Running Database setup"
npx ts-node src/db/initDb.ts

echo ""
echo "Starting server..."
npm run dev