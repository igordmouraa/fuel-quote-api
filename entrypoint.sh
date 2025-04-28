#!/bin/bash

wait_for_postgres() {
  echo "Waiting for PostgreSQL to be ready..."
  while ! nc -z postgres 5432; do
    sleep 1
  done
  echo "PostgreSQL is ready!"
}

if [ "$RUN_TESTS" = "true" ]; then
  echo "Running tests..."
  npm run test:e2e
  TEST_EXIT_CODE=$?
  if [ $TEST_EXIT_CODE -ne 0 ]; then
    echo "Tests failed with exit code $TEST_EXIT_CODE"
    exit $TEST_EXIT_CODE
  fi
  echo "Tests completed successfully!"
  exit 0
else
  wait_for_postgres

  echo "Starting application..."
  exec npm run start:prod
fi