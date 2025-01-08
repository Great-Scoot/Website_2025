#!/bin/bash

# Set default values
BRANCH="master"
COMMIT_HASH=""

# Parse command line arguments
while [[ $# -gt 0 ]]; do
  case "$1" in
    --branch-name)
      BRANCH="$2"
      shift 2
      ;;
    --commit-hash)
      COMMIT_HASH="$2"
      shift 2
      ;;
    *)
      echo "Unknown option: $1" >&2
      exit 1
      ;;
  esac
done

# Determine which option to use for git checkout
if [[ -n "$COMMIT_HASH" ]]; then
    echo "Checking out commit: $COMMIT_HASH"
    git checkout "$COMMIT_HASH"
elif [[ -n "$BRANCH" ]]; then
    echo "Checking out branch: $BRANCH"
    git checkout origin "$BRANCH"
else
  echo "Error: Please provide either --branch-name or --commit-hash" >&2
  exit 1
fi