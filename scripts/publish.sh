#!/bin/bash

# Get the current branch name
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

# Set the npm dist-tag based on the branch name
if [ "$CURRENT_BRANCH" != "main" ]; then
  DIST_TAG="experimental"
else
  DIST_TAG="latest"
fi

# Publish the package with the appropriate dist-tag
npm publish --access public --provenance --tag "$DIST_TAG"