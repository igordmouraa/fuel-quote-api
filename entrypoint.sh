#!/bin/bash

wait_for_postgres() {
  echo "⌛ Waiting for PostgreSQL..."
  until PGPASSWORD=$DB_PASSWORD psql -h "postgres" -U "$DB_USERNAME" -d "$DB_DATABASE" -c '\q'; do
    echo "⏳ PostgreSQL isn't ready, trying again in 3 seconds..."
    sleep 3
  done
  echo "✅ PostgreSQL ready!"
}

if [ "$RUN_TESTS" = "true" ]; then
  echo "🔧 Running tests..."
  npm run test:e2e
  TEST_EXIT_CODE=$?
  if [ $TEST_EXIT_CODE -ne 0 ]; then
    echo "❌ Tests failed with exit code $TEST_EXIT_CODE"
    exit $TEST_EXIT_CODE
  fi
  echo "🎉 Tests completed sucessfully!"
  exit 0
else
  wait_for_postgres
  echo "🚀 Starting application..."
  exec npm run start:prod
fi